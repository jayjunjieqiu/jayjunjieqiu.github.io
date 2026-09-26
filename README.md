# Junjie Qiu — Personal website

A Jekyll site about temporal modeling, memory, and physical AI.
The homepage brings together research interests, publications, concise work experience, and education.

## Local preview

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4173
```

On this Mac, use the Homebrew Ruby runtime and the repository-local gems:

```sh
PATH="/opt/homebrew/opt/ruby/bin:$PATH" BUNDLE_PATH=vendor/bundle bundle exec jekyll serve --host 127.0.0.1 --port 4173
```

Open <http://127.0.0.1:4173>. To check a production build, run `bundle exec jekyll build`.

## Editing content

- `_data/home.yml`: introduction, research interests, experience, projects, education, and CV path.
- `_data/profile.yml`: name, portrait, email, and social profile identifiers.
- `_publications/`: paper metadata, summaries, and individual contributions.
- `assets/files/resume.pdf`: current downloadable CV; refresh from the résumé repository when it changes.
- `_layouts/research.html`, `assets/css/research.css`, and `assets/js/research.js`: shared design and navigation.

The homepage and `/publications` share the same publication component. Personal contributions are visible beside each paper. Method and evaluation details, and the video-project workflow, use native HTML disclosure controls. All content is available without JavaScript. Typography uses local system fonts; portrait and paper figures use existing WebP assets.

Paper figures open in a native dialog with keyboard and backdrop dismissal. Without JavaScript, the image links open directly.

Logo assets reuse the existing school marks, including the horizontal HKUST(GZ) lockup. Huawei's horizontal logo comes from its [official website](https://www.huawei.com/en/). LuckyShort comes from [Xingchen Zou's experience page](https://xczou.top/), and ASC from the [official competition site](https://www.asc-events.net/StudentChallenge/History/2024/index.html); the added bitmap assets are resized WebP files.

Originally based on [academic-homepage](https://github.com/luost26/academic-homepage). The original license is retained in `LICENSE`.
