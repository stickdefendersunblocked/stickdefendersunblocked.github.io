import os
from datetime import datetime, timezone
from pathlib import Path

BASE_URL = "https://stickdefendersunblocked.github.io"
ROOT = Path('.')
TODAY = datetime.now(timezone.utc)

pages = []

# Home page
index_path = ROOT / 'index.html'
if index_path.exists():
    pages.append({
        'loc': BASE_URL + '/',
        'path': index_path,
        'priority': '1.0',
    })

# Category pages
for html in sorted((ROOT / 'categogy').glob('*.html')):
    pages.append({
        'loc': f"{BASE_URL}/categogy/{html.name}",
        'path': html,
        'priority': '0.7',
    })

# Game pages
for html in sorted((ROOT / 'games').glob('*.html')):
    pages.append({
        'loc': f"{BASE_URL}/games/{html.name}",
        'path': html,
        'priority': '0.6',
    })


def lastmod_for(path: Path) -> str:
    timestamp = path.stat().st_mtime
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).strftime('%Y-%m-%d')

xml_lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
text_lines = []

for page in pages:
    lastmod = lastmod_for(page['path'])
    xml_lines.extend([
        '  <url>',
        f"    <loc>{page['loc']}</loc>",
        f"    <lastmod>{lastmod}</lastmod>",
        '    <changefreq>weekly</changefreq>',
        f"    <priority>{page['priority']}</priority>",
        '  </url>',
    ])
    text_lines.append(page['loc'])

xml_lines.append('</urlset>')

(ROOT / 'sitemap.xml').write_text('\n'.join(xml_lines) + '\n', encoding='utf-8')
(ROOT / 'sitemap.txt').write_text('\n'.join(text_lines) + '\n', encoding='utf-8')
