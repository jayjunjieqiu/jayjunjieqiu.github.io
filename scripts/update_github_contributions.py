#!/usr/bin/env python3
"""Fetch and theme the cached GitHub contribution calendar."""

from __future__ import annotations

import sys
import time
from pathlib import Path
from urllib.request import Request, urlopen


PALETTE = {
    "#eeeeee": "#eef2f7",
    "#c6e48b": "#dcecff",
    "#7bc96f": "#9fc5f1",
    "#239a3b": "#5b96da",
    "#196127": "#1468b7",
    "#767676": "#6c757d",
}


def fetch_chart(request: Request) -> str:
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            with urlopen(request, timeout=30) as response:
                return response.read().decode("utf-8")
        except Exception as error:  # noqa: BLE001 - retry transient network failures
            last_error = error
            if attempt < 2:
                time.sleep(2)
    raise RuntimeError(f"Could not fetch GitHub contribution chart: {last_error}")


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: update_github_contributions.py USERNAME OUTPUT", file=sys.stderr)
        return 2

    username, output_name = sys.argv[1:]
    request = Request(
        f"https://ghchart.rshah.org/{username}",
        headers={"User-Agent": "jayjunjieqiu.github.io contribution updater"},
    )
    chart = fetch_chart(request)

    for source, target in PALETTE.items():
        chart = chart.replace(source, target)
    chart = chart.replace("<rect ", '<rect rx="2" ry="2" ')

    output = Path(output_name)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(chart, encoding="utf-8")
    print(f"Wrote themed contribution chart to {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
