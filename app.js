const subjects = [
  "moonlit harbor guardian",
  "frost oracle boxer",
  "jungle witch archivist",
  "signal knight",
  "glass oracle",
  "haunted sailor",
  "cosmic mural keeper",
  "desert lantern bearer"
];

const moods = [
  "luminous",
  "dreamlike",
  "storm-held",
  "serene",
  "mythic",
  "playful",
  "eerie",
  "triumphant"
];

const mediums = [
  "acrylic layers",
  "chalk pastel haze",
  "ink wash textures",
  "mixed media collage",
  "screenprint energy",
  "watercolor bloom"
];

const constraints = [
  "keep the composition mirrored",
  "work with only three dominant colors",
  "let negative space do the heavy lifting",
  "hide one symbolic detail",
  "use only curved movement",
  "anchor the scene to a single light source"
];

const twists = [
  "the background should tell a second story",
  "the image should feel like a memory returning",
  "a secret map should hide in the shadows",
  "the room should imply celebration after grief",
  "the piece should feel half mural, half dream",
  "something impossible should quietly appear"
];

const names = ["Nyx Solara", "Mira Voss", "Aster Vale", "Juno Frost", "Liora Kane", "Ezra Lyric"];
const classes = ["Rune Fighter", "Dream Cartographer", "Ink Warden", "Storm Scribe", "Canvas Alchemist", "Echo Bard"];
const traits = [
  "a glitched halo",
  "gold-thread gloves",
  "living ink tattoos",
  "a stormglass amulet",
  "a brush-staff of neon runes",
  "obsidian shoulder sigils"
];

const hooks = [
  "They guard a forgotten color vault.",
  "They paint rituals that keep a portal stable.",
  "They are hunting seven lost palettes.",
  "They escaped an experimental studio and never looked back.",
  "They restore murals that predict the future.",
  "They carry a map that appears only at midnight."
];

const paletteDrops = [
  "Shift the whole piece into Shadow Gold: obsidian, antique gold, and smoke gray.",
  "Move into Neon Tide: electric teal, deep navy, and coral flare.",
  "Use therapy tones: sage, cream, and muted rose.",
  "Let Desert Signal take over: clay, sand, and lit copper."
];

const twistDrops = [
  "Hide a quiet symbol where the eye lands last.",
  "Make the calmest corner the emotional center.",
  "Break the image with one reflective fracture.",
  "Let the wall behind the subject remember another scene."
];

const wildDrops = [
  "Reframe it as stained glass glowing at dusk.",
  "Treat it like a tarot card from a lost atelier.",
  "Make it read like an arcade cover painted by hand.",
  "Turn the idea into a public mural invitation."
];

const legendaryDrops = [
  "Expand it into a three-part series: arrival, rupture, renewal.",
  "Turn it into a guided group painting ritual.",
  "Create twin versions: one for healing, one for celebration.",
  "Merge the chamber reading into a full story universe seed."
];

const COPY_BTN_HTML = '<button class="copy-btn echo-copy-btn" type="button" aria-label="Copy to clipboard"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M10 1.5a.5.5 0 0 1 .5-.5h1A2.5 2.5 0 0 1 14 3.5v9a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-9A2.5 2.5 0 0 1 4.5 1h1a.5.5 0 0 1 0 1h-1A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7A1.5 1.5 0 0 0 13 12.5v-9A1.5 1.5 0 0 0 11.5 2h-1a.5.5 0 0 1-.5-.5zm-4 0A.5.5 0 0 1 6.5 1h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1z"/></svg></button>';

const questResult = document.getElementById("quest-result");
const forgeResult = document.getElementById("forge-result");
const lootResult = document.getElementById("loot-result");
const chamberInstruction = document.getElementById("chamber-instruction");
const roomWhisper = document.getElementById("room-whisper");

const generateQuestButton = document.getElementById("generate-quest");
const mutateQuestButton = document.getElementById("mutate-quest");
const forgeCharacterButton = document.getElementById("forge-character");
const claimLootButton = document.getElementById("claim-loot");

let lastSpark = null;
let lastCharacter = null;

const pick = (items) => items[Math.floor(Math.random() * items.length)];

function escapeHtml(text) {
  const replacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(text).replace(/[&<>"']/g, (char) => replacements[char]);
}

function awakenChamber() {
  forgeCharacterButton.disabled = false;
  claimLootButton.disabled = false;
  mutateQuestButton.hidden = false;
  document.getElementById("copy-spark").hidden = false;
  chamberInstruction.textContent = "the chamber brightens";
  roomWhisper.textContent = "something else has awakened";
  document.body.classList.add("spark-awake");
}

function clearSecondaryRevelations() {
  forgeResult.hidden = true;
  lootResult.hidden = true;
  forgeResult.className = "echo-card echo-character";
  lootResult.className = "echo-card echo-vault";
  lastCharacter = null;
}

function buildSpark(override = {}) {
  const spark = {
    mood: override.mood || pick(moods),
    subject: override.subject || pick(subjects),
    medium: override.medium || pick(mediums),
    constraint: override.constraint || pick(constraints),
    twist: override.twist || pick(twists)
  };

  const text = [
    `A ${spark.mood} ${spark.subject} arrives in ${spark.medium}.`,
    `${spark.constraint}.`,
    `${spark.twist}.`
  ].join(" ");

  questResult.textContent = text;
  lastSpark = spark;
  clearSecondaryRevelations();
  awakenChamber();
}

function mutateSpark() {
  if (!lastSpark) {
    buildSpark();
    return;
  }

  buildSpark({
    ...lastSpark,
    mood: pick(moods.filter((item) => item !== lastSpark.mood)),
    twist: pick(twists.filter((item) => item !== lastSpark.twist))
  });
}

function revealCharacter() {
  if (!lastSpark) {
    return;
  }

  lastCharacter = {
    name: pick(names),
    archetype: pick(classes),
    trait: pick(traits),
    hook: pick(hooks)
  };

  forgeResult.hidden = false;
  forgeResult.innerHTML = [
    `In the mirror: ${escapeHtml(lastCharacter.name)}, ${escapeHtml(lastCharacter.archetype)}.`,
    `They carry ${escapeHtml(lastCharacter.trait)}.`,
    `${escapeHtml(lastCharacter.hook)}`
  ].join(" ") + COPY_BTN_HTML;
  roomWhisper.textContent = "a presence gathers in the glass";
  document.body.classList.add("mirror-awake");
}

function pickRarity() {
  const roll = Math.random();

  if (roll < 0.6) {
    return "Common Inspiration";
  }

  if (roll < 0.9) {
    return "Rare Inspiration";
  }

  return "Legendary Inspiration";
}

function buildVaultDrop() {
  const rarity = pickRarity();
  const focus = lastSpark ? `${lastSpark.subject}` : "current image";
  const characterNote = lastCharacter ? ` guided by ${lastCharacter.name}` : "";

  if (rarity === "Legendary Inspiration") {
    return {
      rarity,
      className: "rarity-legendary",
      text: `For the ${focus}${characterNote}, ${pick(legendaryDrops)}`
    };
  }

  const pools = rarity === "Rare Inspiration"
    ? [paletteDrops, twistDrops, wildDrops]
    : [paletteDrops, twistDrops];

  return {
    rarity,
    className: rarity === "Rare Inspiration" ? "rarity-rare" : "rarity-common",
    text: `For the ${focus}${characterNote}, ${pick(pools[Math.floor(Math.random() * pools.length)])}`
  };
}

function openVault() {
  if (!lastSpark) {
    return;
  }

  const vault = buildVaultDrop();
  lootResult.hidden = false;
  lootResult.className = `echo-card echo-vault ${vault.className}`;
  lootResult.innerHTML = `<span class="rarity-badge">${escapeHtml(vault.rarity)}</span><br />${escapeHtml(vault.text)}` + COPY_BTN_HTML;
  roomWhisper.textContent = "the room shifts around the painting";
  document.body.classList.add("vault-awake");
}

generateQuestButton.addEventListener("click", () => buildSpark());
mutateQuestButton.addEventListener("click", mutateSpark);
forgeCharacterButton.addEventListener("click", revealCharacter);
claimLootButton.addEventListener("click", openVault);

/* ── Guide overlay ───────────────────────────────────────── */

const guideToggle  = document.getElementById("guide-toggle");
const guideOverlay = document.getElementById("guide-overlay");
const guideClose   = document.getElementById("guide-close");

function openGuide() {
  guideOverlay.classList.add("guide-open");
  guideToggle.setAttribute("aria-expanded", "true");
  guideClose.focus();
}

function closeGuide() {
  guideOverlay.classList.remove("guide-open");
  guideToggle.setAttribute("aria-expanded", "false");
  guideToggle.focus();
}

guideToggle.addEventListener("click", openGuide);
guideClose.addEventListener("click", closeGuide);

guideOverlay.addEventListener("click", (e) => {
  if (e.target === guideOverlay) closeGuide();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && guideOverlay.classList.contains("guide-open")) {
    closeGuide();
  }
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".copy-btn");
  if (!btn) return;

  let text = "";
  if (btn.id === "copy-spark") {
    text = questResult.textContent;
  } else {
    const card = btn.closest(".echo-card");
    if (card) {
      const clone = card.cloneNode(true);
      clone.querySelectorAll(".copy-btn").forEach((b) => b.remove());
      clone.querySelectorAll("br").forEach((b) => b.replaceWith(" "));
      text = clone.textContent.replace(/\s+/g, " ").trim();
    }
  }

  if (!text) return;

  const clipIcon = btn.innerHTML;
  navigator.clipboard.writeText(text).then(() => {
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';
    btn.classList.add("copy-btn--done");
    setTimeout(() => {
      btn.innerHTML = clipIcon;
      btn.classList.remove("copy-btn--done");
    }, 1500);
  }).catch(() => {});
});

/* ── Hotspot drag positioning tool (Shift+D to toggle) ───── */

(function () {
  const STORAGE_KEY = "chamber-hotspot-positions";
  let dragActive   = false;
  let dragging     = null;
  let resizing     = null;
  let resizeCorner = "";
  let startMX = 0, startMY = 0;
  let startLeft = 0, startTop = 0, startW = 0, startH = 0;
  let dragOffX = 0, dragOffY = 0;

  const hotspots = [
    { el: document.getElementById("generate-quest"),  label: "rug"     },
    { el: document.getElementById("forge-character"), label: "mirror"  },
    { el: document.getElementById("claim-loot"),      label: "vault"   },
    { el: document.getElementById("lantern-ambient"), label: "lantern" }
  ];

  // ── HUD ────────────────────────────────────────────────────
  const hud = document.createElement("div");
  hud.id = "drag-hud";
  hud.style.cssText = [
    "position:fixed", "bottom:4rem", "left:50%", "transform:translateX(-50%)",
    "z-index:9999", "background:rgba(6,2,16,0.92)", "border:1px solid rgba(255,220,160,0.25)",
    "border-radius:10px", "padding:0.7rem 1rem", "color:rgba(255,220,152,0.9)",
    "font:700 0.72rem/1.7 monospace", "pointer-events:none", "display:none",
    "white-space:pre", "text-align:left", "min-width:260px"
  ].join(";");
  document.body.appendChild(hud);

  // ── Helpers ────────────────────────────────────────────────
  function getScene() { return document.querySelector(".chamber-scene"); }

  function readPos(el) {
    const scene = getScene();
    const sw = scene.offsetWidth, sh = scene.offsetHeight;
    const rect = el.getBoundingClientRect();
    const sr   = scene.getBoundingClientRect();
    return {
      top:    ((rect.top    - sr.top)  / sh * 100).toFixed(1),
      left:   ((rect.left   - sr.left) / sw * 100).toFixed(1),
      right:  (100 - (rect.right  - sr.left) / sw * 100).toFixed(1),
      bottom: (100 - (rect.bottom - sr.top)  / sh * 100).toFixed(1),
      width:  (rect.width   / sw * 100).toFixed(1),
      height: (rect.height  / sh * 100).toFixed(1)
    };
  }

  function showHud(label, pos) {
    hud.style.display = "block";
    hud.textContent =
      `[ ${label} ]\n` +
      `top: ${pos.top}%   bottom: ${pos.bottom}%\n` +
      `left: ${pos.left}%  right: ${pos.right}%\n` +
      `width: ${pos.width}%  height: ${pos.height}%\n\n` +
      `Drag corner handles to resize\n` +
      `Scroll = width  Shift+Scroll = height\n` +
      `Shift+D = exit & save  Shift+R = reset`;
  }

  function applyInlinePos(el) {
    const scene = getScene();
    const sw = scene.offsetWidth, sh = scene.offsetHeight;
    const rect = el.getBoundingClientRect();
    const sr   = scene.getBoundingClientRect();
    el.style.right  = "auto";
    el.style.bottom = "auto";
    el.style.left   = ((rect.left - sr.left) / sw * 100) + "%";
    el.style.top    = ((rect.top  - sr.top)  / sh * 100) + "%";
    el.style.width  = (rect.width  / sw * 100) + "%";
    el.style.height = (rect.height / sh * 100) + "%";
  }

  // ── Resize corner handles ──────────────────────────────────
  const CORNERS = ["nw", "ne", "sw", "se"];

  function addHandles(el) {
    CORNERS.forEach((c) => {
      const h = document.createElement("span");
      h.className = "drag-handle";
      h.dataset.corner = c;
      const isN = c.includes("n"), isW = c.includes("w");
      h.style.cssText = [
        "position:absolute", "width:12px", "height:12px",
        "background:rgba(255,200,80,0.9)", "border-radius:3px",
        "z-index:10001", "cursor:" + c + "-resize", "pointer-events:auto",
        isN ? "top:-6px"  : "bottom:-6px",
        isW ? "left:-6px" : "right:-6px"
      ].join(";");
      el.appendChild(h);
    });
  }

  function removeHandles(el) {
    el.querySelectorAll(".drag-handle").forEach((h) => h.remove());
  }

  // ── Save / Load ────────────────────────────────────────────
  function savePositions() {
    const data = {};
    hotspots.forEach(({ el, label }) => {
      const p = readPos(el);
      data[label] = {
        left: p.left + "%", top: p.top + "%",
        width: p.width + "%", height: p.height + "%"
      };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function loadSaved() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      hotspots.forEach(({ el, label }) => {
        const p = saved[label];
        if (!p) return;
        el.style.right  = "auto";
        el.style.bottom = "auto";
        el.style.left   = p.left;
        el.style.top    = p.top;
        if (p.width)  el.style.width  = p.width;
        if (p.height) el.style.height = p.height;
      });
    } catch (e) {}
  }

  loadSaved();

  // ── Enable / Disable ───────────────────────────────────────
  function enableDrag() {
    dragActive = true;
    hud.style.display = "block";
    hud.textContent = "DRAG MODE ON\nDrag to move · Corner handles to resize\nScroll = width  Shift+Scroll = height\nShift+D = exit & save  Shift+R = reset";
    hotspots.forEach(({ el, label }) => {
      applyInlinePos(el);
      el.style.outline       = "2px dashed rgba(255,200,80,0.7)";
      el.style.opacity       = "1";
      el.style.cursor        = "grab";
      el.style.pointerEvents = "auto";
      el.setAttribute("data-drag-label", label);
      addHandles(el);
    });
  }

  function disableDrag() {
    dragActive = false;
    dragging = null;
    resizing = null;
    savePositions();
    hud.style.display = "block";
    hud.textContent = "Positions saved to browser.\nShift+R to reset to CSS defaults.";
    setTimeout(() => { hud.style.display = "none"; }, 2200);
    hotspots.forEach(({ el }) => {
      el.style.outline       = "";
      el.style.opacity       = "";
      el.style.cursor        = "";
      el.style.pointerEvents = "";
      removeHandles(el);
    });
  }

  function resetSaved() {
    localStorage.removeItem(STORAGE_KEY);
    hotspots.forEach(({ el }) => {
      el.style.right  = "";
      el.style.bottom = "";
      el.style.left   = "";
      el.style.top    = "";
      el.style.width  = "";
      el.style.height = "";
    });
    hud.style.display = "block";
    hud.textContent = "Positions reset to CSS defaults.";
    setTimeout(() => { if (!dragActive) hud.style.display = "none"; }, 2000);
  }

  // ── Keyboard ───────────────────────────────────────────────
  document.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key === "D") { dragActive ? disableDrag() : enableDrag(); }
    if (e.shiftKey && e.key === "R" && !dragActive) { resetSaved(); }
  });

  // ── Mouse down ─────────────────────────────────────────────
  document.addEventListener("mousedown", (e) => {
    if (!dragActive) return;

    const handle = e.target.closest(".drag-handle");
    if (handle) {
      e.preventDefault();
      e.stopPropagation();
      resizing     = handle.closest("[data-drag-label]");
      resizeCorner = handle.dataset.corner;
      const rect  = resizing.getBoundingClientRect();
      const scene = getScene();
      const sr    = scene.getBoundingClientRect();
      const sw    = scene.offsetWidth, sh = scene.offsetHeight;
      startMX   = e.clientX;
      startMY   = e.clientY;
      startLeft = (rect.left - sr.left) / sw * 100;
      startTop  = (rect.top  - sr.top)  / sh * 100;
      startW    = rect.width  / sw * 100;
      startH    = rect.height / sh * 100;
      return;
    }

    const el = e.target.closest("[data-drag-label]");
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    dragging = el;
    const scene = getScene();
    const sr    = scene.getBoundingClientRect();
    const rect  = el.getBoundingClientRect();
    const sw = scene.offsetWidth, sh = scene.offsetHeight;
    el.style.right  = "auto";
    el.style.bottom = "auto";
    el.style.left   = ((rect.left - sr.left) / sw * 100) + "%";
    el.style.top    = ((rect.top  - sr.top)  / sh * 100) + "%";
    dragOffX = e.clientX - rect.left;
    dragOffY = e.clientY - rect.top;
    el.style.cursor = "grabbing";
  });

  // ── Mouse move ─────────────────────────────────────────────
  document.addEventListener("mousemove", (e) => {
    if (!dragActive) return;
    const scene = getScene();
    const sr = scene.getBoundingClientRect();
    const sw = scene.offsetWidth, sh = scene.offsetHeight;

    if (resizing) {
      const dx = (e.clientX - startMX) / sw * 100;
      const dy = (e.clientY - startMY) / sh * 100;
      let nL = startLeft, nT = startTop, nW = startW, nH = startH;
      if (resizeCorner.includes("e")) { nW = Math.max(3, startW + dx); }
      if (resizeCorner.includes("s")) { nH = Math.max(3, startH + dy); }
      if (resizeCorner.includes("w")) { nL = startLeft + dx; nW = Math.max(3, startW - dx); }
      if (resizeCorner.includes("n")) { nT = startTop  + dy; nH = Math.max(3, startH - dy); }
      resizing.style.left   = nL + "%";
      resizing.style.top    = nT + "%";
      resizing.style.width  = nW + "%";
      resizing.style.height = nH + "%";
      showHud(resizing.getAttribute("data-drag-label"), readPos(resizing));
      return;
    }

    if (dragging) {
      dragging.style.left = ((e.clientX - dragOffX - sr.left) / sw * 100) + "%";
      dragging.style.top  = ((e.clientY - dragOffY - sr.top)  / sh * 100) + "%";
      showHud(dragging.getAttribute("data-drag-label"), readPos(dragging));
    }
  });

  // ── Mouse up ───────────────────────────────────────────────
  document.addEventListener("mouseup", () => {
    if (dragging) { dragging.style.cursor = "grab"; dragging = null; }
    resizing = null;
  });

  // ── Scroll to resize ───────────────────────────────────────
  document.addEventListener("wheel", (e) => {
    if (!dragActive) return;
    const el = e.target.closest("[data-drag-label]");
    if (!el) return;
    e.preventDefault();
    const scene = getScene();
    const sw = scene.offsetWidth, sh = scene.offsetHeight;
    const sr   = scene.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const delta = e.deltaY > 0 ? -0.5 : 0.5;
    if (e.shiftKey) {
      const newH = Math.max(3, (rect.height / sh * 100) + delta);
      el.style.height = newH + "%";
    } else {
      const curW = rect.width / sw * 100;
      const newW = Math.max(3, curW + delta);
      const curCenter = (rect.left - sr.left) / sw * 100 + curW / 2;
      el.style.width = newW + "%";
      el.style.left  = (curCenter - newW / 2) + "%";
    }
    showHud(el.getAttribute("data-drag-label"), readPos(el));
  }, { passive: false });

}());
