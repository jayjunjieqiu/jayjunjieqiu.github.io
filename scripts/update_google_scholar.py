#!/usr/bin/env python3
"""Cache public Google Scholar profile metrics for the Jekyll site."""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen


class ScholarBlocked(RuntimeError):
    """Google Scholar rejected the automated request."""


def text_from_html(fragment: str) -> str:
    without_tags = re.sub(r"<[^>]+>", " ", fragment)
    return " ".join(html.unescape(without_tags).split())


def fetch_profile(request: Request) -> str:
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            with urlopen(request, timeout=30) as response:
                return response.read().decode("utf-8")
        except Exception as error:  # noqa: BLE001 - retry transient network failures
            last_error = error
            if attempt < 2:
                time.sleep(2)
    if isinstance(last_error, HTTPError) and last_error.code == 403:
        raise ScholarBlocked(
            "Google Scholar returned HTTP 403; keeping the previous cached metrics"
        )
    raise RuntimeError(f"Could not fetch Google Scholar profile: {last_error}")


def parse_profile(profile_html: str, user_id: str) -> dict[str, object]:
    metric_values = [
        text_from_html(value)
        for value in re.findall(
            r'<td[^>]*class="gsc_rsb_std"[^>]*>(.*?)</td>',
            profile_html,
            flags=re.DOTALL,
        )
    ]
    if len(metric_values) < 6:
        raise RuntimeError("Google Scholar metrics were not found")

    article_titles = re.findall(
        r'<a[^>]*class="gsc_a_at"[^>]*>(.*?)</a>',
        profile_html,
        flags=re.DOTALL,
    )
    name_matches = re.findall(
        r'<div[^>]*id="gsc_prf_in"[^>]*>(.*?)</div>',
        profile_html,
        flags=re.DOTALL,
    )
    affiliation_matches = re.findall(
        r'<div[^>]*class="gsc_prf_il"[^>]*>(.*?)</div>',
        profile_html,
        flags=re.DOTALL,
    )

    return {
        "profile_url": f"https://scholar.google.com/citations?hl=en&user={user_id}",
        "name": text_from_html(name_matches[0]) if name_matches else "",
        "affiliation": text_from_html(affiliation_matches[0]) if affiliation_matches else "",
        "citations": int(metric_values[0]),
        "citations_since": int(metric_values[1]),
        "h_index": int(metric_values[2]),
        "h_index_since": int(metric_values[3]),
        "i10_index": int(metric_values[4]),
        "i10_index_since": int(metric_values[5]),
        "articles": len(article_titles),
        "fetched_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--user", required=True, help="Google Scholar profile ID")
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    request = Request(
        f"https://scholar.google.com/citations?hl=en&user={args.user}",
        headers={"User-Agent": "jayjunjieqiu.github.io Scholar updater"},
    )
    try:
        profile_html = fetch_profile(request)
        payload = parse_profile(profile_html, args.user)
    except ScholarBlocked as error:
        print(f"::warning::{error}", file=sys.stderr)
        return 0

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(
        f"Cached {payload['articles']} articles, {payload['citations']} citations, "
        f"h-index {payload['h_index']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
