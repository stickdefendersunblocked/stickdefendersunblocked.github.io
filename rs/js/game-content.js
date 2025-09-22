(function () {
  const container = document.getElementById('content-container');
  if (!container) {
    return;
  }

  const metaKeywords = document.querySelector('meta[name="keywords"]');
  const rawName = metaKeywords ? metaKeywords.content.split(',')[0].trim() : document.title;

  const formatName = (value) => {
    return value
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
      .trim();
  };

  const gameName = formatName(rawName.replace(/[-_]+/g, ' '));
  const slug = (window.location.pathname.split('/').pop() || '').replace(/\.html$/, '').toLowerCase();
  const signals = `${gameName} ${slug}`.toLowerCase();

  const detectCategory = () => {
    if (/(shoot|sniper|gun|bullet|defend|zombie|assault|war|battle)/.test(signals)) {
      return 'shooter';
    }
    if (/(race|car|drive|stunt|rally|kart|moto|bike|drift|parking)/.test(signals)) {
      return 'racing';
    }
    if (/(soccer|football|basket|golf|sport|ball|pool|tennis|goal|hoop)/.test(signals)) {
      return 'sports';
    }
    if (/(puzzle|math|logic|2048|merge|brain|chess|strategy|tactics)/.test(signals)) {
      return 'puzzle';
    }
    if (/(run|dash|escape|adventure|platform|quest|dungeon|parkour|survival|explore)/.test(signals)) {
      return 'adventure';
    }
    if (/(clicker|idle|sim|tycoon|builder|farm|mart|store|manager|business)/.test(signals)) {
      return 'simulation';
    }
    return 'arcade';
  };

  const category = detectCategory();

  const blueprints = {
    shooter: {
      overview: `${gameName} unblocked drops you into a wave-based firefight where quick aim and sharper upgrades decide whether your squad survives the next assault.`,
      howTo: [
        `Swap between weapons and abilities to keep hostile waves under control in ${gameName}.`,
        `Collect resources between rounds so you can invest in stronger firepower and tougher defenses.`,
        `Watch each lane closely—enemy patterns change quickly and can overwhelm the wall if you hesitate.`,
      ],
      tips: `Trigger special abilities the moment elite enemies spawn and focus your heaviest firepower on whichever lane is closest to breaching your stronghold.`,
    },
    racing: {
      overview: `${gameName} unblocked challenges you to master every turn, jump, and boost while you chase the fastest time on each course.`,
      howTo: [
        `Use acceleration wisely and feather the brakes so your vehicle keeps momentum through corners.`,
        `Collect upgrades or cash to unlock better rides that help dominate tougher events in ${gameName}.`,
        `Experiment with camera angles and control options until the handling feels natural.`,
      ],
      tips: `Memorise track layouts and line up drifts early so you can exit corners at top speed without crashing into hazards.`,
    },
    sports: {
      overview: `${gameName} unblocked delivers a competitive sports showdown you can enjoy straight from the browser—no blocked networks, no installs.`,
      howTo: [
        `Study your opponent’s movement patterns so you can react instantly when possession changes.`,
        `Practice special shots or power moves to rack up points quickly in ${gameName}.`,
        `Use multiplayer or AI scrimmages to perfect timing before heading into tougher matches.`,
      ],
      tips: `Keep an eye on the game clock and manage stamina—steady, well-timed plays beat button-mashing rushes.`,
    },
    puzzle: {
      overview: `${gameName} unblocked is all about smart decisions—each move, merge, or calculation pushes you closer to a new personal best.`,
      howTo: [
        `Plan several steps ahead so every action in ${gameName} supports your long-term goal.`,
        `Use undo, shuffle, or hint systems carefully—they can rescue a round but usually come with limits.`,
        `Stay patient; a calm approach helps you spot hidden patterns or optimal merges.`,
      ],
      tips: `When you feel stuck, look for small cleanup moves that restore board space and set up bigger combos later.`,
    },
    adventure: {
      overview: `${gameName} unblocked sends you exploring new stages packed with secrets, hazards, and boss encounters.`,
      howTo: [
        `Learn enemy tells so you can dodge, block, or counter before they land a hit.`,
        `Collect keys, coins, or power-ups tucked throughout ${gameName} to unlock shortcuts and upgrades.`,
        `Revisit earlier levels after powering up—you may uncover bonus routes or hidden collectibles.`,
      ],
      tips: `Pace yourself through tricky sections and observe the environment; platforms and traps usually telegraph their rhythm.`,
    },
    simulation: {
      overview: `${gameName} unblocked turns strategy into progress as you manage resources, upgrades, and automation to build the perfect operation.`,
      howTo: [
        `Set clear priorities so the most profitable stations in ${gameName} stay upgraded first.`,
        `Balance spending between instant boosts and long-term investments that compound over time.`,
        `Check in regularly to collect rewards and queue fresh research before the next session.`,
      ],
      tips: `Track which upgrades offer the biggest multipliers and funnel earnings there—you’ll snowball faster with a focused build.`,
    },
    arcade: {
      overview: `${gameName} unblocked captures classic arcade energy with snappy controls and quick-fire rounds ideal for short breaks.`,
      howTo: [
        `Warm up in early stages so you can adapt once the pace escalates.`,
        `Chase multipliers, combos, or bonus objectives to keep your score climbing in ${gameName}.`,
        `Use practice runs to learn how hazards behave, then react instinctively during real attempts.`,
      ],
      tips: `Reset the moment a run goes sideways—staying fresh and focused makes it easier to break personal records.`,
    },
  };

  const copy = blueprints[category];

  container.innerHTML = `
    <h1>${gameName} Unblocked</h1>
    <p class="lead">${copy.overview}</p>
    <h2>How to Play ${gameName}</h2>
    <ul>
      ${copy.howTo.map((item) => `<li>${item}</li>`).join('')}
    </ul>
    <h2>${gameName} Tips &amp; Tricks</h2>
    <p>${copy.tips}</p>
    <h2>Play ${gameName} Unblocked Anywhere</h2>
    <p>StickDefendersUnblocked hosts ${gameName} in an HTML5 player, so you can jump in from school networks or work devices without extra downloads—just load the page and start playing.</p>
  `;
})();
