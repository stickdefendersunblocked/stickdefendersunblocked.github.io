import json
import os
import re
from datetime import UTC, datetime
from pathlib import Path

BASE_URL = "https://stickdefendersunblocked.github.io"
OG_IMAGE = "https://placehold.co/1200x630/0f172a/FFFFFF.png?text=Stick%20Defenders%20Unblocked"
TODAY = datetime.now(UTC).strftime("%Y-%m-%d")

CATEGORY_KEYWORDS = {
    "shooter": ("shooting", "Shooting Game"),
    "racing": ("racing", "Racing Game"),
    "sports": ("sports", "Sports Game"),
    "puzzle": ("puzzle", "Puzzle Game"),
    "adventure": ("adventure", "Adventure Game"),
    "simulation": ("simulation", "Simulation Game"),
    "arcade": ("arcade", "Arcade Game"),
}

description_templates = {
    "shooter": "{game} unblocked lets you practise precision shots, wave defense, and quick decision making without downloads or firewall hassles.",
    "racing": "Slide behind the wheel in {game} unblocked and master each turn, jump, and boost right in your browser, no installs required.",
    "sports": "Bring the arena with you by loading {game} unblocked in the browser and competing in quick matches wherever you are.",
    "puzzle": "Sharpen your mind with {game} unblocked—plan moves, chase high scores, and enjoy brain-teasing sessions instantly online.",
    "adventure": "Explore every stage of {game} unblocked from school, work, or home thanks to a lightweight browser build that runs anywhere.",
    "simulation": "Build momentum in {game} unblocked by managing upgrades and idle progress directly from a classroom-friendly browser tab.",
    "arcade": "Jump into {game} unblocked for fast, pick-up-and-play arcade action that streams smoothly through restricted networks.",
}

faq_templates = {
    "default": [
        (
            "How do I play {game} unblocked at school?",
            "Launch this page and the HTML5 version of {game} loads in an iframe, so there are no executables to trigger school filters."
        ),
        (
            "Do I need to create an account to enjoy {game}?",
            "No account is required—click play, adjust your settings, and your progress is stored locally in the browser."
        ),
    ],
    "shooter": [
        (
            "What are the best upgrades in {game}?",
            "Prioritise damage boosts and cooldown reductions so you can clear waves faster before enemies reach your defenses."
        ),
        (
            "Can I change controls in {game}?",
            "Most unblocked shooters keep default WASD and mouse aiming, but you can open the in-game settings to tweak sensitivity."
        ),
    ],
    "racing": [
        (
            "How can I get faster lap times in {game}?",
            "Enter corners early, tap the brakes to line up drifts, and spend earnings on handling upgrades first for cleaner exits."
        ),
        (
            "Does {game} support gamepads?",
            "Many browser racers accept plug-and-play controllers—connect yours before launching and check the options screen."
        ),
    ],
    "sports": [
        (
            "Is there multiplayer in {game}?",
            "Several matches support local or online multiplayer—look for versus or co-op icons on the mode select screen."
        ),
        (
            "Any tips to improve in {game}?",
            "Practice drills in quick matches, study opponent tells, and focus on timing rather than button mashing."
        ),
    ],
    "puzzle": [
        (
            "How do I beat tough levels in {game}?",
            "Slow down and map out a few moves ahead—keeping the board tidy opens up new combos and multipliers."
        ),
        (
            "Does {game} save my progress?",
            "Your browser caches save data locally, so returning on the same device restores your latest puzzle attempt."
        ),
    ],
    "adventure": [
        (
            "What should I upgrade first in {game}?",
            "Boost health or defense early so you can explore longer, then invest in damage to clear late-game encounters."
        ),
        (
            "Can I replay stages in {game}?",
            "Yes, revisit earlier areas for hidden collectibles and to master tricky platforming sections."
        ),
    ],
    "simulation": [
        (
            "How do I progress faster in {game}?",
            "Keep automation active, reinvest profits into multipliers, and log in frequently to trigger offline earnings."
        ),
        (
            "Will my {game} save carry between devices?",
            "Saves are stored locally, so export or note your progress if you plan to switch computers."
        ),
    ],
    "arcade": [
        (
            "What makes {game} unblocked ideal for quick breaks?",
            "Rounds load instantly, letting you chase high scores in a few minutes without waiting through downloads or updates."
        ),
        (
            "Are there hidden modes in {game}?",
            "Keep experimenting—many arcade titles unlock bonus challenges once you hit milestone scores."
        ),
    ],
}

special_tokens = {
    "lol": "LOL",
    "io": "IO",
    "fps": "FPS",
    "fnaf": "FNAF",
    "fnf": "FNF",
    "x3m": "X3M",
    "3d": "3D",
    "ii": "II",
    "iii": "III",
    "iv": "IV",
    "v": "V",
}

shoot_re = re.compile(r"(shoot|sniper|gun|bullet|defend|zombie|assault|war|battle|shooter)")
race_re = re.compile(r"(race|car|drive|stunt|rally|kart|moto|bike|drift|parking)")
sport_re = re.compile(r"(soccer|football|basket|golf|sport|ball|pool|tennis|goal|hoop)")
puzzle_re = re.compile(r"(puzzle|math|logic|2048|merge|brain|chess|strategy|tactic|quiz)")
adventure_re = re.compile(r"(run|dash|escape|adventure|platform|quest|dungeon|parkour|survival|explore|shooter-)")
sim_re = re.compile(r"(clicker|idle|sim|tycoon|builder|farm|mart|store|manager|business|factory)")


def smart_title(value: str) -> str:
    cleaned = re.sub(r"unblocked", "", value, flags=re.IGNORECASE)
    cleaned = re.sub(r"[^0-9A-Za-z\s-]", " ", cleaned)
    tokens = [t for t in re.split(r"[\s-]+", cleaned) if t]
    words = []
    for token in tokens:
        lower = token.lower()
        if lower in special_tokens:
            words.append(special_tokens[lower])
        elif token.isupper() and len(token) > 1:
            words.append(token)
        elif any(ch.isdigit() for ch in token) and token.upper() == token:
            words.append(token)
        elif token.isdigit():
            words.append(token)
        else:
            words.append(token.capitalize())
    return " ".join(words) if words else value.strip().title()


def detect_category(name: str, slug: str) -> str:
    signals = f"{name} {slug}".lower()
    if shoot_re.search(signals):
        return "shooter"
    if race_re.search(signals):
        return "racing"
    if sport_re.search(signals):
        return "sports"
    if puzzle_re.search(signals):
        return "puzzle"
    if adventure_re.search(signals):
        return "adventure"
    if sim_re.search(signals):
        return "simulation"
    return "arcade"


def build_meta(game_name: str, slug: str):
    category = detect_category(game_name, slug)
    keyword_core, genre_label = CATEGORY_KEYWORDS[category]
    description = description_templates[category].format(game=game_name)
    keywords = f"{game_name} unblocked, play {game_name} online, {keyword_core} games"
    faq_pairs = faq_templates.get(category, faq_templates["default"])

    video_game = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": f"{game_name} Unblocked",
        "url": f"{BASE_URL}/games/{slug}.html",
        "description": description,
        "image": OG_IMAGE,
        "operatingSystem": "Browser",
        "applicationCategory": "Game",
        "genre": genre_label,
        "inLanguage": "en",
        "publisher": {
            "@type": "Organization",
            "name": "StickDefendersUnblocked",
            "url": BASE_URL,
        },
        "dateModified": TODAY,
    }

    faq_json = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q.format(game=game_name),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": a.format(game=game_name),
                },
            }
            for q, a in faq_pairs
        ],
    }

    page_title = f"Play {game_name} Unblocked Online | Stick Defenders Games"

    head = [
        "<!DOCTYPE html>",
        "<html lang=\"en-GB\">",
        "  <head>",
        "    <meta charset=\"utf-8\" />",
        "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />",
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, shrink-to-fit=no\" />",
        "    <meta http-equiv=\"content-language\" content=\"en\" />",
        "    <meta name=\"robots\" content=\"index, follow\" />",
        "    <meta name=\"distribution\" content=\"Global\" />",
        "    <meta http-equiv=\"audience\" content=\"General\" />",
        f"    <link rel=\"icon\" href=\"{BASE_URL}/favicon.png\" />",
        f"    <title>{page_title}</title>",
        f"    <meta name=\"description\" content=\"{description}\" />",
        f"    <meta name=\"keywords\" content=\"{keywords}\" />",
        f"    <meta name=\"news_keywords\" content=\"{keywords}\" />",
        f"    <link rel=\"canonical\" href=\"{BASE_URL}/games/{slug}.html\" />",
        "    <meta property=\"og:type\" content=\"website\" />",
        "    <meta property=\"og:site_name\" content=\"StickDefendersUnblocked\" />",
        f"    <meta property=\"og:title\" content=\"{page_title}\" />",
        f"    <meta property=\"og:description\" content=\"{description}\" />",
        f"    <meta property=\"og:url\" content=\"{BASE_URL}/games/{slug}.html\" />",
        f"    <meta property=\"og:image\" content=\"{OG_IMAGE}\" />",
        "    <meta property=\"og:image:width\" content=\"1200\" />",
        "    <meta property=\"og:image:height\" content=\"630\" />",
        "    <meta property=\"og:locale\" content=\"en_GB\" />",
        "    <meta name=\"twitter:card\" content=\"summary_large_image\" />",
        f"    <meta name=\"twitter:title\" content=\"{page_title}\" />",
        f"    <meta name=\"twitter:description\" content=\"{description}\" />",
        f"    <meta name=\"twitter:image\" content=\"{OG_IMAGE}\" />",
        f"    <meta name=\"twitter:url\" content=\"{BASE_URL}/games/{slug}.html\" />",
        "    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />",
        "    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />",
        "    <link href=\"https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@500;600;700&display=swap\" rel=\"stylesheet\" />",
        "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/rs/css/all.css\" />",
        "    <script async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5130254389782226\" crossorigin=\"anonymous\"></script>",
    ]

    vg_json = json.dumps(video_game, indent=2)
    faq_json_str = json.dumps(faq_json, indent=2)
    head.append("    <script type=\"application/ld+json\">")
    head.extend(["    " + line for line in vg_json.splitlines()])
    head.append("    </script>")
    head.append("    <script type=\"application/ld+json\">")
    head.extend(["    " + line for line in faq_json_str.splitlines()])
    head.append("    </script>")
    head.append("")
    head.append("  </head>")
    head.append("")

    return "\n".join(head), page_title, description


def update_game_file(path: Path):
    raw = path.read_text(encoding="utf-8")
    slug = path.stem
    keywords_match = re.search(r'<meta name=\"keywords\" content=\"([^\"]+)', raw)
    if keywords_match:
        base = keywords_match.group(1).split(',')[0]
    else:
        h1_match = re.search(r'<h1>([^<]+)</h1>', raw)
        base = h1_match.group(1) if h1_match else slug.replace('-', ' ')
    game_name = smart_title(base)
    head_html, page_title, description = build_meta(game_name, slug)

    body_index = raw.find("\n  <body>")
    if body_index == -1:
        raise ValueError(f"Cannot locate <body> in {path}")
    tail = raw[body_index:]

    # update iframe title
    iframe_match = re.search(r'(<iframe[^>]*title=")([^"]*)(")', tail)
    if iframe_match:
        old = iframe_match.group(2)
        tail = tail.replace(f'title="{old}"', f'title="{game_name} Unblocked"', 1)

    # update H1 text (first occurrence)
    tail = re.sub(r'<h1>[^<]*</h1>', f'<h1>{game_name} Unblocked</h1>', tail, count=1)

    # ensure breadcrumb brand uses correct name? Already ok.

    new_content = head_html + tail
    path.write_text(new_content, encoding="utf-8")


def main():
    for file in sorted(Path("games").glob("*.html")):
        update_game_file(file)


if __name__ == "__main__":
    main()
