import json
from datetime import UTC, datetime
from pathlib import Path

BASE_URL = "https://stickdefendersunblocked.github.io"
OG_IMAGE = "https://placehold.co/1200x630/0f172a/FFFFFF.png?text=Stick%20Defenders%20Unblocked"
TODAY = datetime.now(UTC).strftime('%Y-%m-%d')

CATEGORY_INFO = {
    'Car': {
        'title': 'Racing Games',
        'description': 'Drift, boost, and chase leaderboard times in our racing games hub—each title is playable right in your browser with no installs.',
        'keywords': 'racing games unblocked, car games online, play racing games at school',
        'faq': [
            ('Do your racing games work on Chromebooks?', 'Yes. Every racing game on this list runs through HTML5, so school Chromebooks and office laptops can launch them without extra plugins.'),
            ('Can I use a controller with these racing games?', 'Many titles support plug-and-play controllers—connect your pad before launching and check the in-game settings for button mapping.'),
        ],
    },
    'New': {
        'title': 'New Unblocked Games',
        'description': 'Discover the newest unblocked games hand-reviewed for classroom and office play. Fresh titles are added the moment we verify they work behind filters.',
        'keywords': 'new unblocked games, latest browser games, fresh school-safe games',
        'faq': [
            ('How often do you add new unblocked games?', 'We review new releases weekly and update this page as soon as a game loads reliably through school-friendly mirrors.'),
            ('Can I request a specific game to be added?', 'Absolutely—open an issue on our GitHub repo or use the footer link to request the game you want to see next.'),
        ],
    },
    'Other': {
        'title': 'All Unblocked Games',
        'description': 'Browse every unblocked browser game hosted on StickDefendersUnblocked, from action shooters to cozy sims—all curated for fast loading and safe play.',
        'keywords': 'all unblocked games, browser games directory, play games online free',
        'faq': [
            ('What genres do you cover?', 'We feature shooters, racing, sports, puzzles, adventures, sims, and more—use the filters above or the footer for quick navigation.'),
            ('How can I find multiplayer-friendly games?', 'Look for multiplayer tags inside each game description or search the page for “multiplayer” to jump straight to co-op-friendly titles.'),
        ],
    },
    'Running': {
        'title': 'Adventure & Platform Games',
        'description': 'Leap through obstacle courses, explore dungeons, and survive challenging quests with our adventure game collection built for blocked networks.',
        'keywords': 'adventure games unblocked, platform games online, running games browser',
        'faq': [
            ('Do these adventure games save progress?', 'Most titles store progress locally in your browser—revisit on the same device to continue your run.'),
            ('Which adventure game should I start with?', 'Begin with a shorter platformer like Drive Mad or Hill Climb adventures, then move into longer quests once you learn the controls.'),
        ],
    },
    'Shotting': {
        'title': 'Shooting Games',
        'description': 'Lock and load wave-defense missions, sniper challenges, and arcade shooters that stay playable on restricted school and work networks.',
        'keywords': 'shooting games unblocked, online shooter games, play gun games at school',
        'faq': [
            ('Are these shooting games safe for school networks?', 'Yes—we host iframe-friendly builds that avoid downloads and run entirely in the browser.'),
            ('Can I practice aim drills with these shooters?', 'Many games include training arenas or endless waves, perfect for sharpening your aim before multiplayer sessions.'),
        ],
    },
    'Sport': {
        'title': 'Sports Games',
        'description': 'Kick off quick matches and seasonal tournaments with unblocked sports games covering soccer, basketball, golf, and more.',
        'keywords': 'sports games unblocked, play soccer games online, basketball browser games',
        'faq': [
            ('Do any sports games support two players?', 'Yes—look for the two-player tag in titles like Soccer Heads or Basketball Legends to challenge a friend on the same keyboard.'),
            ('Can I play these sports games on a tablet?', 'Most titles respond to touch controls, but for the best experience we recommend a keyboard or gamepad on desktop browsers.'),
        ],
    },
}


def build_head(slug: str, content: str) -> str:
    info = CATEGORY_INFO[slug]
    page_url = f"{BASE_URL}/categogy/{slug}.html"
    page_title = f"{info['title']} - StickDefendersUnblocked"
    faq_json = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": a,
                },
            }
            for q, a in info['faq']
        ],
    }

    collection_schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": page_title,
        "url": page_url,
        "description": info['description'],
        "inLanguage": "en",
        "isPartOf": {
            "@type": "WebSite",
            "name": "StickDefendersUnblocked",
            "url": BASE_URL,
        },
        "publisher": {
            "@type": "Organization",
            "name": "StickDefendersUnblocked",
            "url": BASE_URL,
        },
        "dateModified": TODAY,
    }

    head_lines = [
        "<!DOCTYPE html>",
        "<html lang=\"en-GB\">",
        "  <head>",
        "    <meta charset=\"utf-8\" />",
        "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />",
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, shrink-to-fit-no\" />".replace('shrink-to-fit-no', 'shrink-to-fit-no'),
    ]
    # fix shrink attribute
    head_lines[-1] = "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, shrink-to-fit=no\" />"
    head_lines.extend([
        "    <meta http-equiv=\"content-language\" content=\"en\" />",
        "    <meta name=\"robots\" content=\"index, follow\" />",
        "    <meta name=\"distribution\" content=\"Global\" />",
        "    <meta http-equiv=\"audience\" content=\"General\" />",
        f"    <link rel=\"icon\" href=\"{BASE_URL}/favicon.png\" />",
        f"    <title>{page_title}</title>",
        f"    <meta name=\"description\" content=\"{info['description']}\" />",
        f"    <meta name=\"keywords\" content=\"{info['keywords']}\" />",
        f"    <meta name=\"news_keywords\" content=\"{info['keywords']}\" />",
        f"    <link rel=\"canonical\" href=\"{page_url}\" />",
        "    <meta property=\"og:type\" content=\"website\" />",
        "    <meta property=\"og:site_name\" content=\"StickDefendersUnblocked\" />",
        f"    <meta property=\"og:title\" content=\"{page_title}\" />",
        f"    <meta property=\"og:description\" content=\"{info['description']}\" />",
        f"    <meta property=\"og:url\" content=\"{page_url}\" />",
        f"    <meta property=\"og:image\" content=\"{OG_IMAGE}\" />",
        "    <meta property=\"og:image:width\" content=\"1200\" />",
        "    <meta property=\"og:image:height\" content=\"630\" />",
        "    <meta property=\"og:locale\" content=\"en_GB\" />",
        "    <meta name=\"twitter:card\" content=\"summary_large_image\" />",
        f"    <meta name=\"twitter:title\" content=\"{page_title}\" />",
        f"    <meta name=\"twitter:description\" content=\"{info['description']}\" />",
        f"    <meta name=\"twitter:image\" content=\"{OG_IMAGE}\" />",
        f"    <meta name=\"twitter:url\" content=\"{page_url}\" />",
        "    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />",
        "    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />",
        "    <link href=\"https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@500;600;700&display=swap\" rel=\"stylesheet\" />",
        "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/rs/css/all.css\" />",
        "    <script async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5130254389782226\" crossorigin=\"anonymous\"></script>",
        "    <script type=\"application/ld+json\">",
        "    " + json.dumps(collection_schema, indent=2).replace('\n', '\n    '),
        "    </script>",
        "    <script type=\"application/ld+json\">",
        "    " + json.dumps(faq_json, indent=2).replace('\n', '\n    '),
        "    </script>",
        "",
        "  </head>",
    ])

    body_index = content.find("\n  <body>")
    if body_index == -1:
        raise ValueError(f"Cannot find <body> in {slug}")
    return "\n".join(head_lines) + content[body_index:]


def main():
    for path in (Path('categogy')).glob('*.html'):
        slug = path.stem
        if slug not in CATEGORY_INFO:
            continue
        content = path.read_text(encoding='utf-8')
        updated = build_head(slug, content)
        path.write_text(updated, encoding='utf-8')


if __name__ == '__main__':
    main()
