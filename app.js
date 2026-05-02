const subjects = [
  "neon trance runner",
  "ghost-channel diviner",
  "chrome shrine archivist",
  "signal-drum herald",
  "back-alley oracle mechanic",
  "mask-coded grid keeper",
  "circuit-robed mural witch",
  "lantern-hacker of the dead network"
];

const moods = [
  "neon-lit",
  "ritual-charged",
  "stormwired",
  "dissociative",
  "mythic",
  "feral",
  "hushed",
  "ultraviolet"
];

const mediums = [
  "glitched ink washes",
  "spraypaint haze",
  "holographic collage motifs",
  "circuit-burn textures",
  "screenprint static",
  "acid watercolor glow"
];

const constraints = [
  "keep the composition ritually balanced",
  "work with only three dominant colors",
  "let open space carry the signal",
  "hide one coded sigil in plain sight",
  "use only curved movement",
  "anchor the scene to a single neon or moonlit source"
];

const twists = [
  "the background should carry a second transmission",
  "the image should feel like a memory leak from another timeline",
  "a ghost-map should hide in the shadows",
  "the room should imply bass after the blackout",
  "the piece should feel half ritual, half nightclub apparition",
  "something impossible should boot up with quiet authority"
];

const classes = ["Signal Diviner", "Ghost Cartographer", "Chrome Warden", "Storm Coder", "Neon Alchemist", "Echo Runner"];
const traits = [
  "optic charms braided into their cuffs",
  "conductive gloves stitched with silver thread",
  "signal-marked fabric wrapped at the shoulder",
  "a stormglass implant at the throat",
  "a wire-strung staff painted with glyphs",
  "chrome sigils at the collarbone"
];

const hooks = [
  "They guard a relic cache of forbidden colors.",
  "They paint rites that keep the ghost network open.",
  "They are searching for seven lost sigils buried in the grid.",
  "They left a luxury arcology studio and never came back.",
  "They restore murals said to answer tomorrow's glitches.",
  "They carry a map that only appears under ultraviolet rain."
];

const paletteDrops = [
  "Shift the whole piece into Chrome Gold: brass, oil black, and aged neon.",
  "Move into Afterglow Night: ultraviolet, deep navy, and ember coral.",
  "Use recovery tones: toxic jade, signal cream, and muted rust rose.",
  "Let Gridlight take over: concrete sand, hazard orange, and lit copper."
];

const twistDrops = [
  "Hide a quiet sigil where the eye lands last.",
  "Make the stillest corner the psychic center.",
  "Break the image with one reflective omen.",
  "Let the wall behind the subject remember an older upload."
];

const wildDrops = [
  "Reframe it as a street relic glowing after curfew.",
  "Treat it like a stolen scroll from a dead server cult.",
  "Make it read like a hand-painted rave poster from the undercity.",
  "Turn the idea into a public mural for a flooded transit wall."
];

const legendaryDrops = [
  "Expand it into a three-part series: signal, breach, return.",
  "Turn it into a guided communal paint ritual.",
  "Create twin versions: one for shielding, one for overload.",
  "Grow the grid reading into a full mythic story cycle."
];

const COPY_BTN_HTML = '<button class="copy-btn echo-copy-btn" type="button" aria-label="Copy to clipboard"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M10 1.5a.5.5 0 0 1 .5-.5h1A2.5 2.5 0 0 1 14 3.5v9a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-9A2.5 2.5 0 0 1 4.5 1h1a.5.5 0 0 1 0 1h-1A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7A1.5 1.5 0 0 0 13 12.5v-9A1.5 1.5 0 0 0 11.5 2h-1a.5.5 0 0 1-.5-.5zm-4 0A.5.5 0 0 1 6.5 1h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1z"/></svg></button>';

const questResult = document.getElementById("quest-result");
const forgeResult = document.getElementById("forge-result");
const lootResult = document.getElementById("loot-result");
const chamberInstruction = document.getElementById("chamber-instruction");
const roomWhisper = document.getElementById("room-whisper");
const roomWhisperNote = document.getElementById("room-whisper-note");
const sparkActions = document.getElementById("spark-actions");

const generateQuestButton = document.getElementById("generate-quest");
const mutateQuestButton = document.getElementById("mutate-quest");
const bringToLifeButton = document.getElementById("bring-to-life");
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

function setWhisper(text, note) {
  roomWhisper.textContent = text;
  roomWhisperNote.textContent = note;
}

function awakenChamber() {
  forgeCharacterButton.dataset.dragUnlocked = "true";
  claimLootButton.dataset.dragUnlocked = "true";
  forgeCharacterButton.disabled = false;
  claimLootButton.disabled = false;
  sparkActions.hidden = false;
  chamberInstruction.textContent = "the grid hums awake";
  setWhisper("you have a spark", "keep it or reroute");
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

  setWhisper("you have a spark", "keep it or reroute");
}

function revealCharacter() {
  if (!lastSpark) {
    return;
  }

  lastCharacter = {
    archetype: pick(classes),
    trait: pick(traits),
    hook: pick(hooks)
  };

  forgeResult.hidden = false;
  forgeResult.innerHTML = [
    `In the ghost mirror: a ${escapeHtml(lastCharacter.archetype)}.`,
    `They carry ${escapeHtml(lastCharacter.trait)}.`,
    `${escapeHtml(lastCharacter.hook)}`
  ].join(" ") + COPY_BTN_HTML;
  setWhisper("the mirror is awake", "something waits");
  document.body.classList.add("mirror-awake");
}

function pickRarity() {
  const roll = Math.random();

  if (roll < 0.6) {
    return "Common Drop";
  }

  if (roll < 0.9) {
    return "Rare Drop";
  }

  return "Mythic Drop";
}

function buildVaultDrop() {
  const rarity = pickRarity();
  const focus = lastSpark ? `${lastSpark.subject}` : "current image";
  const characterNote = lastCharacter ? ` guided by a ${lastCharacter.archetype}` : "";

  if (rarity === "Mythic Drop") {
    return {
      rarity,
      className: "rarity-legendary",
      text: `For the ${focus}${characterNote}, ${pick(legendaryDrops)}`
    };
  }

  const pools = rarity === "Rare Drop"
    ? [paletteDrops, twistDrops, wildDrops]
    : [paletteDrops, twistDrops];

  return {
    rarity,
    className: rarity === "Rare Drop" ? "rarity-rare" : "rarity-common",
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
  setWhisper("something waits", "bring it to life");
  document.body.classList.add("vault-awake");
}

function bringSparkToLife() {
  if (!lastSpark) {
    return;
  }

  setWhisper("bring it to life", "just start");
}

generateQuestButton.addEventListener("click", () => buildSpark());
mutateQuestButton.addEventListener("click", mutateSpark);
bringToLifeButton.addEventListener("click", bringSparkToLife);
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
  const card = btn.closest(".echo-card");
  if (card) {
    const clone = card.cloneNode(true);
    clone.querySelectorAll(".copy-btn").forEach((b) => b.remove());
    clone.querySelectorAll("br").forEach((b) => b.replaceWith(" "));
    text = clone.textContent.replace(/\s+/g, " ").trim();
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
  const STORAGE_KEY = "chamber-hotspot-admin-v2";
  const ADMIN_KEY = "dream-chamber-admin-v1";
  const adminParam = new URLSearchParams(window.location.search).get("admin");
  let adminEnabled = adminParam === "1" || window.localStorage.getItem(ADMIN_KEY) === "true";
  let dragActive   = false;
  let dragging     = null;
  let resizing     = null;
  let resizeCorner = "";
  let startMX = 0, startMY = 0;
  let startLeft = 0, startTop = 0, startW = 0, startH = 0;
  let dragOffX = 0, dragOffY = 0;
  let directListeners = new Map();

  const hotspots = [
    { el: document.getElementById("generate-quest"),  label: "rug"     },
    { el: document.getElementById("forge-character"), label: "mirror"  },
    { el: document.getElementById("claim-loot"),      label: "vault"   },
    { el: document.getElementById("lantern-ambient"), label: "lantern" }
  ];
  const HOTSPOT_SELECTORS = {
    rug: ".hotspot-rug",
    mirror: ".hotspot-mirror",
    vault: ".hotspot-vault",
    lantern: ".lantern-ambient"
  };

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

  function makeAdminButton(label) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.style.cssText = [
      "appearance:none", "border:1px solid rgba(255,220,160,0.16)",
      "border-radius:999px", "background:rgba(18,10,30,0.86)",
      "color:rgba(255,228,180,0.82)", "padding:0.32rem 0.72rem",
      "font:700 0.68rem/1 Manrope, sans-serif", "letter-spacing:0.12em",
      "text-transform:lowercase", "cursor:pointer"
    ].join(";");
    return button;
  }

  const adminTray = document.createElement("div");
  adminTray.id = "admin-tray";
  adminTray.style.cssText = [
    "position:fixed", "left:1.2rem", "bottom:1.2rem", "z-index:10020",
    "display:none", "align-items:center", "gap:0.45rem", "flex-wrap:wrap",
    "padding:0.55rem 0.65rem", "border-radius:16px",
    "background:rgba(8,4,18,0.86)", "border:1px solid rgba(255,220,160,0.14)",
    "box-shadow:0 12px 32px rgba(0,0,0,0.34)", "backdrop-filter:blur(10px)"
  ].join(";");
  const adminLabel = document.createElement("span");
  adminLabel.textContent = "admin";
  adminLabel.style.cssText = "color:rgba(255,220,160,0.46);font:800 0.62rem/1 Manrope, sans-serif;letter-spacing:0.16em;text-transform:uppercase;padding:0 0.12rem;";
  const dragBtn = makeAdminButton("⊹ position");
  const copyCssBtn = makeAdminButton("copy css");
  const copyJsonBtn = makeAdminButton("copy json");
  const resetBtn = makeAdminButton("reset");
  adminTray.append(adminLabel, dragBtn, copyCssBtn, copyJsonBtn, resetBtn);
  document.body.appendChild(adminTray);

  function setAdminTrayState() {
    adminTray.style.display = adminEnabled ? "flex" : "none";
  }

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

  function flashAdminButton(button, text) {
    const prev = button.textContent;
    button.textContent = text;
    window.setTimeout(() => { button.textContent = prev; }, 1100);
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

  // Handles live in a scene-level overlay so overflow:hidden on the
  // hotspot (e.g. mirror) cannot clip them.
  function addHandles(el) {
    const scene = getScene();
    const sr = scene.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const sw = scene.offsetWidth, sh = scene.offsetHeight;
    const overlay = document.createElement("div");
    overlay.className = "drag-handle-overlay";
    overlay.dataset.forId = el.id;
    overlay.dataset.dragLabel = el.getAttribute("data-drag-label") || "";
    overlay.style.cssText = [
      "position:absolute", "pointer-events:auto", "z-index:10000",
      "cursor:grab", "background:transparent",
      "left:" + ((er.left - sr.left) / sw * 100) + "%",
      "top:"  + ((er.top  - sr.top)  / sh * 100) + "%",
      "width:"  + (er.width  / sw * 100) + "%",
      "height:" + (er.height / sh * 100) + "%"
    ].join(";");
    overlay.addEventListener("mousedown", (e) => {
      if (!dragActive || e.target.closest(".drag-handle")) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = overlay.getBoundingClientRect();
      const edge = 18;
      const isN = (e.clientY - rect.top) <= edge;
      const isS = (rect.bottom - e.clientY) <= edge;
      const isW = (e.clientX - rect.left) <= edge;
      const isE = (rect.right - e.clientX) <= edge;
      const corner = (isN || isS) && (isW || isE)
        ? (isN ? "n" : "s") + (isW ? "w" : "e")
        : "";
      if (corner) {
        beginResize(el, corner, e);
        overlay.style.cursor = corner + "-resize";
        return;
      }
      beginDrag(el, e, overlay);
    });
    scene.appendChild(overlay);
    syncHandlePositions(el);
  }

  function removeHandles(el) {
    const scene = getScene();
    const ov = scene.querySelector(".drag-handle-overlay[data-for-id='" + el.id + "']");
    if (ov) ov.remove();
    scene.querySelectorAll(".drag-handle[data-for-id='" + el.id + "']").forEach((h) => h.remove());
  }

  function syncOverlay(el) {
    const scene = getScene();
    const ov = scene.querySelector(".drag-handle-overlay[data-for-id='" + el.id + "']");
    if (!ov) return;
    ov.style.left   = el.style.left;
    ov.style.top    = el.style.top;
    ov.style.cursor = dragging === el ? "grabbing" : "grab";
    if (el.style.width)  ov.style.width  = el.style.width;
    if (el.style.height) ov.style.height = el.style.height;
    syncHandlePositions(el);
  }

  function syncHandlePositions(el) {
    const scene = getScene();
    const sr = scene.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    CORNERS.forEach((corner) => {
      let handle = scene.querySelector(".drag-handle[data-for-id='" + el.id + "'][data-corner='" + corner + "']");
      if (!handle) {
        handle = document.createElement("span");
        handle.className = "drag-handle";
        handle.dataset.corner = corner;
        handle.dataset.forId = el.id;
        handle.style.cssText = [
          "position:absolute", "width:16px", "height:16px",
          "background:rgba(255,200,80,0.98)", "border:1px solid rgba(32,12,0,0.65)",
          "box-shadow:0 0 0 1px rgba(255,240,200,0.28), 0 0 14px rgba(255,180,60,0.5)",
          "border-radius:4px", "pointer-events:auto", "z-index:10001", "display:block"
        ].join(";");
        scene.appendChild(handle);
      }
      const isN = corner.includes("n");
      const isW = corner.includes("w");
      handle.style.cursor = corner + "-resize";
      handle.style.left = ((er.left - sr.left) + (isW ? 2 : er.width - 18)) + "px";
      handle.style.top = ((er.top - sr.top) + (isN ? 2 : er.height - 18)) + "px";
    });
  }

  function beginResize(el, corner, event) {
    resizing     = el;
    resizeCorner = corner;
    const rect  = el.getBoundingClientRect();
    const scene = getScene();
    const sr    = scene.getBoundingClientRect();
    const sw    = scene.offsetWidth, sh = scene.offsetHeight;
    startMX   = event.clientX;
    startMY   = event.clientY;
    startLeft = (rect.left - sr.left) / sw * 100;
    startTop  = (rect.top  - sr.top)  / sh * 100;
    startW    = rect.width  / sw * 100;
    startH    = rect.height / sh * 100;
  }

  function beginDrag(el, event, overlay) {
    dragging = el;
    const scene = getScene();
    const sr    = scene.getBoundingClientRect();
    const rect  = el.getBoundingClientRect();
    const sw = scene.offsetWidth, sh = scene.offsetHeight;
    el.style.right  = "auto";
    el.style.bottom = "auto";
    el.style.left   = ((rect.left - sr.left) / sw * 100) + "%";
    el.style.top    = ((rect.top  - sr.top)  / sh * 100) + "%";
    dragOffX = event.clientX - rect.left;
    dragOffY = event.clientY - rect.top;
    if (overlay) overlay.style.cursor = "grabbing";
    el.style.cursor = "grabbing";
  }

  function buildPresetData() {
    const data = {};
    hotspots.forEach(({ el, label }) => {
      const p = readPos(el);
      data[label] = {
        left: p.left + "%",
        top: p.top + "%",
        width: p.width + "%",
        height: p.height + "%"
      };
    });
    return data;
  }

  function buildCssPreset() {
    const data = buildPresetData();
    return [
      "/* Dream Chamber hotspot preset */",
      `${HOTSPOT_SELECTORS.lantern} { top: ${data.lantern.top}; left: ${data.lantern.left}; width: ${data.lantern.width}; height: ${data.lantern.height}; }`,
      `${HOTSPOT_SELECTORS.rug} { top: ${data.rug.top}; left: ${data.rug.left}; width: ${data.rug.width}; height: ${data.rug.height}; }`,
      `${HOTSPOT_SELECTORS.mirror} { top: ${data.mirror.top}; left: ${data.mirror.left}; width: ${data.mirror.width}; height: ${data.mirror.height}; }`,
      `${HOTSPOT_SELECTORS.vault} { top: ${data.vault.top}; left: ${data.vault.left}; width: ${data.vault.width}; height: ${data.vault.height}; }`
    ].join("\n");
  }

  function copyAdminText(button, text) {
    navigator.clipboard.writeText(text).then(() => {
      flashAdminButton(button, "copied");
    }).catch(() => {
      flashAdminButton(button, "failed");
    });
  }

  // ── Save / Load ────────────────────────────────────────────
  function savePositions() {
    if (!adminEnabled) return;
    const data = buildPresetData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function loadSaved() {
    if (!adminEnabled) return;
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
  setAdminTrayState();

  let wasDisabled = new Set();

  // ── Enable / Disable ───────────────────────────────────────
  function enableDrag() {
    if (!adminEnabled) return;
    dragActive = true;
    if (dragBtn) { dragBtn.textContent = "⊹ done"; dragBtn.style.color = "rgba(255,200,80,0.8)"; dragBtn.style.borderColor = "rgba(255,200,80,0.4)"; }
    hud.style.display = "block";
    hud.textContent = "DRAG MODE ON\nDrag to move · Corner handles to resize\nScroll = width  Shift+Scroll = height\nShift+D = exit & save  Shift+R = reset";
    hotspots.forEach(({ el, label }) => {
      applyInlinePos(el);
      if (el.disabled) { wasDisabled.add(el); el.disabled = false; }
      el.style.outline       = "2px dashed rgba(255,200,80,0.7)";
      el.style.opacity       = "1";
      el.style.cursor        = "grab";
      el.style.pointerEvents = "auto";
      el.setAttribute("data-drag-label", label);
      addHandles(el);
      // Direct listener on the element — bypasses closest() delegation
      // which breaks on border-radius:50% + overflow:hidden (mirror).
      const onDown = (e) => {
        if (!dragActive || e.target.closest(".drag-handle")) return;
        e.preventDefault();
        e.stopPropagation();
        beginDrag(el, e);
      };
      el.addEventListener("mousedown", onDown);
      directListeners.set(el, onDown);
    });
  }

  function disableDrag() {
    if (!adminEnabled) return;
    dragActive = false;
    dragging = null;
    resizing = null;
    if (dragBtn) { dragBtn.textContent = "⊹ position"; dragBtn.style.color = ""; dragBtn.style.borderColor = ""; }
    savePositions();
    hud.style.display = "block";
    hud.textContent = "Positions saved to browser.\nShift+R to reset to CSS defaults.";
    setTimeout(() => { hud.style.display = "none"; }, 2200);
    hotspots.forEach(({ el }) => {
      const onDown = directListeners.get(el);
      if (onDown) { el.removeEventListener("mousedown", onDown); directListeners.delete(el); }
      if (wasDisabled.has(el) && el.dataset.dragUnlocked !== "true") { el.disabled = true; }
      wasDisabled.delete(el);
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
  function toggleDrag() { dragActive ? disableDrag() : enableDrag(); }
  dragBtn.addEventListener("click", toggleDrag);
  copyCssBtn.addEventListener("click", () => copyAdminText(copyCssBtn, buildCssPreset()));
  copyJsonBtn.addEventListener("click", () => copyAdminText(copyJsonBtn, JSON.stringify(buildPresetData(), null, 2)));
  resetBtn.addEventListener("click", resetSaved);
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.shiftKey && (e.key === "A" || e.key === "a" || e.code === "KeyA")) {
      e.preventDefault();
      const next = !(window.localStorage.getItem(ADMIN_KEY) === "true");
      if (next) {
        window.localStorage.setItem(ADMIN_KEY, "true");
      } else {
        window.localStorage.removeItem(ADMIN_KEY);
      }
      window.location.reload();
      return;
    }
    if (!adminEnabled) return;
    if (e.shiftKey && (e.key === "D" || e.key === "d" || e.code === "KeyD")) { toggleDrag(); }
    if (e.shiftKey && (e.key === "R" || e.key === "r" || e.code === "KeyR") && !dragActive) { resetSaved(); }
  });

  // ── Mouse down ─────────────────────────────────────────────
  document.addEventListener("mousedown", (e) => {
    if (!dragActive) return;

    const handle = e.target.closest(".drag-handle");
    if (handle) {
      e.preventDefault();
      e.stopPropagation();
      beginResize(document.getElementById(handle.dataset.forId), handle.dataset.corner, e);
      return;
    }

    // hotspot drag-start handled by direct listeners in enableDrag
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
      syncOverlay(resizing);
      showHud(resizing.getAttribute("data-drag-label"), readPos(resizing));
      return;
    }

    if (dragging) {
      dragging.style.left = ((e.clientX - dragOffX - sr.left) / sw * 100) + "%";
      dragging.style.top  = ((e.clientY - dragOffY - sr.top)  / sh * 100) + "%";
      syncOverlay(dragging);
      showHud(dragging.getAttribute("data-drag-label"), readPos(dragging));
    }
  });

  // ── Mouse up ───────────────────────────────────────────────
  document.addEventListener("mouseup", () => {
    if (dragging) { dragging.style.cursor = "grab"; dragging = null; }
    resizing = null;
    document.querySelectorAll(".drag-handle-overlay").forEach((ov) => { ov.style.cursor = "grab"; });
  });

  // ── Scroll to resize ───────────────────────────────────────
  document.addEventListener("wheel", (e) => {
    if (!dragActive) return;
    const overlay = e.target.closest(".drag-handle-overlay[data-for-id]");
    const el = overlay ? document.getElementById(overlay.dataset.forId) : e.target.closest("[data-drag-label]");
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
    syncOverlay(el);
    showHud(el.getAttribute("data-drag-label"), readPos(el));
  }, { passive: false });

}());
