(function () {
  const container = document.getElementById('content-container');
  if (!container) {
    return;
  }

  const metaKeywords = document.querySelector('meta[name="keywords"]');
  const rawName = metaKeywords ? metaKeywords.content.split(',')[0].trim() : document.title;

  const specialTokens = new Map([
    ['lol', 'LOL'],
    ['io', 'IO'],
    ['fps', 'FPS'],
    ['fnaf', 'FNAF'],
    ['fnf', 'FNF'],
    ['x3m', 'X3M'],
    ['3d', '3D'],
  ]);

  const formatName = (value) => {
    return value
      .replace(/[-_]+/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => {
        const lower = part.toLowerCase();
        if (specialTokens.has(lower)) {
          return specialTokens.get(lower);
        }
        if (/^[0-9]+$/.test(part)) {
          return part;
        }
        if (/[0-9]/.test(part) && part.toUpperCase() === part) {
          return part;
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(' ')
      .trim();
  };

  const slug = (window.location.pathname.split('/').pop() || '').replace(/\.html$/, '').toLowerCase();
  const isHome = slug === '' || slug === 'index';
  const gameName = isHome ? 'Stick Defenders' : formatName(rawName.replace(/unblocked/i, ''));
  const signals = `${gameName} ${slug}`.toLowerCase();

  const detectCategory = () => {
    if (isHome) {
      return 'home';
    }
    if (/(shoot|sniper|gun|bullet|defend|zombie|assault|war|battle)/.test(signals)) {
      return 'shooter';
    }
    if (/(race|car|drive|stunt|rally|kart|moto|bike|drift|parking)/.test(signals)) {
      return 'racing';
    }
    if (/(soccer|football|basket|golf|sport|ball|pool|tennis|goal|hoop)/.test(signals)) {
      return 'sports';
    }
    if (/(puzzle|math|logic|2048|merge|brain|chess|strategy|tactic)/.test(signals)) {
      return 'puzzle';
    }
    if (/(run|dash|escape|adventure|platform|quest|dungeon|parkour|survival|explore)/.test(signals)) {
      return 'adventure';
    }
    if (/(clicker|idle|sim|tycoon|builder|farm|mart|store|manager|business|factory)/.test(signals)) {
      return 'simulation';
    }
    return 'arcade';
  };

  const category = detectCategory();

  const homeCopy = {
    overview: 'Stick Defenders unblocked lets you merge squads, stack upgrades, and survive endless waves directly in the browser—no downloads, no filters.',
    howTo: [
      'Combine matching stickmen to unlock stronger units before each enemy wave arrives.',
      'Spend coins on wall upgrades and turrets so your base survives longer runs.',
      'Toggle theater mode or fullscreen on this page for a distraction-free battle view.',
    ],
    tips: 'Save premium abilities for elite bosses and keep lanes balanced—an exposed wall tile is the quickest way to lose momentum.',
    reasons: [
      'HTML5 delivery keeps the game playable on school-managed Chromebooks and office PCs.',
      'Bookmark this hub for instant access to dozens of other unblocked action, racing, and puzzle hits.',
      'Our curated guides and FAQs highlight strategies that help you climb the leaderboards faster.',
    ],
    faq: [
      {
        q: 'Is Stick Defenders Unblocked safe to play?',
        a: 'Yes. The game runs in an isolated iframe using HTTPS, and no additional downloads or permissions are required.'
      },
      {
        q: 'How often is new content added?',
        a: 'We check for fresh balance patches and seasonal events weekly, updating this page and the sitemap whenever new builds arrive.'
      },
    ],
  };

  const blueprints = {
    shooter: {
      overview: `${gameName} unblocked drops you into a wave-based firefight where quick aim and sharper upgrades decide whether your squad survives the next assault.`,
      howTo: [
        `Swap between weapons and abilities to keep hostile waves under control in ${gameName}.`,
        `Collect resources between rounds so you can invest in stronger firepower and tougher defenses.`,
        `Watch each lane closely—enemy patterns change quickly and can overwhelm the wall if you hesitate.`,
      ],
      tips: `Trigger special abilities the moment elite enemies spawn and focus your heaviest firepower on whichever lane is closest to breaching your stronghold.`,
      reasons: [
        `The unblocked iframe mirrors the full game, so you keep campaign progress without needing administrator rights.`,
        `Keyboard and mouse controls remain responsive even on low-power school laptops.`,
        `Weekly cache refreshes ensure you always load the newest balance updates.`,
      ],
      faq: [
        {
          q: `What are the best upgrades in ${gameName}?`,
          a: 'Prioritise damage boosts and cooldown reductions so you can clear waves faster before enemies reach your defenses.',
        },
        {
          q: `Can I change controls in ${gameName}?`,
          a: 'Most unblocked shooters keep default WASD and mouse aiming, but you can open the in-game settings to tweak sensitivity.',
        },
      ],
    },
    racing: {
      overview: `${gameName} unblocked challenges you to master every turn, jump, and boost while you chase the fastest time on each course.`,
      howTo: [
        `Use acceleration wisely and feather the brakes so your vehicle keeps momentum through corners.`,
        `Collect upgrades or cash to unlock better rides that help dominate tougher events in ${gameName}.`,
        `Experiment with camera angles and control options until the handling feels natural.`,
      ],
      tips: `Memorise track layouts and line up drifts early so you can exit corners at top speed without crashing into hazards.`,
      reasons: [
        `Browser delivery means you can practise time trials between classes without installing anything.`,
        `Cloud-friendly saves keep your garage intact as long as you return on the same device.`,
        `Our sitemap and tagging surface similar racing games when you need a new challenge.`,
      ],
      faq: [
        {
          q: `How can I get faster lap times in ${gameName}?`,
          a: 'Enter corners early, tap the brakes to line up drifts, and spend earnings on handling upgrades first for cleaner exits.',
        },
        {
          q: `Does ${gameName} support gamepads?`,
          a: 'Many browser racers accept plug-and-play controllers—connect yours before launching and check the options screen.',
        },
      ],
    },
    sports: {
      overview: `${gameName} unblocked delivers a competitive sports showdown you can enjoy straight from the browser—no blocked networks, no installs.`,
      howTo: [
        `Study your opponent’s movement patterns so you can react instantly when possession changes.`,
        `Practice special shots or power moves to rack up points quickly in ${gameName}.`,
        `Use multiplayer or AI scrimmages to perfect timing before heading into tougher matches.`,
      ],
      tips: `Keep an eye on the game clock and manage stamina—steady, well-timed plays beat button-mashing rushes.`,
      reasons: [
        `Lightweight HTML5 tech keeps latency low for local multiplayer sessions.`,
        `Progress is saved locally, so rematches load instantly when you revisit the page.`,
        `Category links in the footer help you discover more sports titles without leaving the site.`,
      ],
      faq: [
        {
          q: `Is there multiplayer in ${gameName}?`,
          a: 'Several matches support local or online multiplayer—look for versus or co-op icons on the mode select screen.',
        },
        {
          q: `Any tips to improve in ${gameName}?`,
          a: 'Practice drills in quick matches, study opponent tells, and focus on timing rather than button mashing.',
        },
      ],
    },
    puzzle: {
      overview: `${gameName} unblocked is all about smart decisions—each move, merge, or calculation pushes you closer to a new personal best.`,
      howTo: [
        `Plan several steps ahead so every action in ${gameName} supports your long-term goal.`,
        `Use undo, shuffle, or hint systems carefully—they can rescue a round but usually come with limits.`,
        `Stay patient; a calm approach helps you spot hidden patterns or optimal merges.`,
      ],
      tips: `When you feel stuck, look for small cleanup moves that restore board space and set up bigger combos later.`,
      reasons: [
        `Offline-safe saves mean you can pause mid-puzzle and resume later without losing progress.`,
        `Browser-based play works on Chromebooks that normally block executable puzzle downloads.`,
        `Suggested reads below the article highlight strategy guides for related brain teasers.`,
      ],
      faq: [
        {
          q: `How do I beat tough levels in ${gameName}?`,
          a: 'Slow down and map out a few moves ahead—keeping the board tidy opens up new combos and multipliers.',
        },
        {
          q: `Does ${gameName} save my progress?`,
          a: 'Your browser caches save data locally, so returning on the same device restores your latest puzzle attempt.',
        },
      ],
    },
    adventure: {
      overview: `${gameName} unblocked sends you exploring new stages packed with secrets, hazards, and boss encounters.`,
      howTo: [
        `Learn enemy tells so you can dodge, block, or counter before they land a hit.`,
        `Collect keys, coins, or power-ups tucked throughout ${gameName} to unlock shortcuts and upgrades.`,
        `Revisit earlier levels after powering up—you may uncover bonus routes or hidden collectibles.`,
      ],
      tips: `Pace yourself through tricky sections and observe the environment; platforms and traps usually telegraph their rhythm.`,
      reasons: [
        `Fullscreen toggle lets you focus during long stages without leaving your browser tab.`,
        `We verify each embed regularly to keep story-driven adventures playable behind school firewalls.`,
        `Footer navigation links surface more exploration games when you crave a new quest.`,
      ],
      faq: [
        {
          q: `What should I upgrade first in ${gameName}?`,
          a: 'Boost health or defense early so you can explore longer, then invest in damage to clear late-game encounters.',
        },
        {
          q: `Can I replay stages in ${gameName}?`,
          a: 'Yes, revisit earlier areas for hidden collectibles and to master tricky platforming sections.',
        },
      ],
    },
    simulation: {
      overview: `${gameName} unblocked turns strategy into progress as you manage resources, upgrades, and automation to build the perfect operation.`,
      howTo: [
        `Set clear priorities so the most profitable stations in ${gameName} stay upgraded first.`,
        `Balance spending between instant boosts and long-term investments that compound over time.`,
        `Check in regularly to collect rewards and queue fresh research before the next session.`,
      ],
      tips: `Track which upgrades offer the biggest multipliers and funnel earnings there—you’ll snowball faster with a focused build.`,
      reasons: [
        `Idle progress keeps accumulating even when the tab is minimised.`,
        `No-download delivery bypasses admin locks on school networks.`,
        `Our guide below explains how to export saves if you change computers.`,
      ],
      faq: [
        {
          q: `How do I progress faster in ${gameName}?`,
          a: 'Keep automation active, reinvest profits into multipliers, and log in frequently to trigger offline earnings.',
        },
        {
          q: `Will my ${gameName} save carry between devices?`,
          a: 'Saves are stored locally, so export or note your progress if you plan to switch computers.',
        },
      ],
    },
    arcade: {
      overview: `${gameName} unblocked captures classic arcade energy with snappy controls and quick-fire rounds ideal for short breaks.`,
      howTo: [
        `Warm up in early stages so you can adapt once the pace escalates.`,
        `Chase multipliers, combos, or bonus objectives to keep your score climbing in ${gameName}.`,
        `Use practice runs to learn how hazards behave, then react instinctively during real attempts.`,
      ],
      tips: `Reset the moment a run goes sideways—staying fresh and focused makes it easier to break personal records.`,
      reasons: [
        `Fast-loading HTML5 assets mean you can squeeze in a run between classes.`,
        `No plugins are required, so the experience works on modern browsers out of the box.`,
        `Suggested titles below help you queue up your next arcade fix in seconds.`,
      ],
      faq: [
        {
          q: `What makes ${gameName} unblocked ideal for quick breaks?`,
          a: 'Rounds load instantly, letting you chase high scores in a few minutes without waiting through downloads or updates.',
        },
        {
          q: `Are there hidden modes in ${gameName}?`,
          a: 'Keep experimenting—many arcade titles unlock bonus challenges once you hit milestone scores.',
        },
      ],
    },
  };

  const copy = category === 'home' ? homeCopy : blueprints[category];

  const faqHtml = copy.faq
    .map(
      (item) => `
        <details>
          <summary>${item.q}</summary>
          <p>${item.a}</p>
        </details>
      `
    )
    .join('');

  container.innerHTML = `
    <h2 class="content-title">Play ${gameName} Unblocked Online</h2>
    <p class="lead">${copy.overview}</p>
    <div class="content-grid">
      <section>
        <h3>How to Play ${gameName}</h3>
        <ol>
          ${copy.howTo.map((item) => `<li>${item}</li>`).join('')}
        </ol>
      </section>
      <section>
        <h3>${gameName} Tips &amp; Strategy</h3>
        <p>${copy.tips}</p>
        <h4>Why play on StickDefendersUnblocked?</h4>
        <ul>
          ${copy.reasons.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </section>
    </div>
    <section class="faq-block">
      <h3>${gameName} FAQ</h3>
      ${faqHtml}
    </section>
    <section>
      <h3>Play ${gameName} Anywhere</h3>
      <p>StickDefendersUnblocked hosts ${gameName} in a lightweight HTML5 player, so you can jump in from school networks or work devices without extra downloads—just load the page, toggle fullscreen if you need it, and start playing.</p>
    </section>
  `;
})();
