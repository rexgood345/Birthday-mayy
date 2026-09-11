/**
 * ═══════════════════════════════════════════════════════
 * SCRIPT INTERAKTIF — BIRTHDAY GIFT UNTUK MAY
 * ═══════════════════════════════════════════════════════
 */

document.addEventListener("DOMContentLoaded", () => {
  initDynamicConfig();
  initConfetti();
  initSpawnHearts();
  initGiftSparkles();
  initLoadingProgress();
  initScrollReveal();
  initWordReveal();
  initMouseInteractions();
  initBouquetInteractions();
  initSunflowerTablet();
  initSubPageFalling();
  initInteractiveCandle();
  initPhotoModal();
  initFallingPetalsHearts();
  initDigitalBouquet();
});

/* ═══════════════ 1. DYNAMIC CONFIG INJECTION ═══════════════ */
function initDynamicConfig() {
  if (typeof BIRTHDAY_CONFIG === "undefined") return;

  const cfg = BIRTHDAY_CONFIG;

  // Nama penerima di berbagai elemen
  document.querySelectorAll(".cfg-recipient").forEach((el) => {
    el.textContent = cfg.recipientName || "Mayy";
  });
  document.querySelectorAll(".cfg-sender").forEach((el) => {
    el.textContent = cfg.senderName || "Rex";
  });

  // Clue PIN
  const clueEl = document.getElementById("pwClue");
  if (clueEl && cfg.pinClue) clueEl.textContent = cfg.pinClue;

  // Hero elements
  const pillEl = document.getElementById("heroPill");
  if (pillEl && cfg.heroSubtitle) pillEl.textContent = cfg.heroSubtitle;

  const tagEl = document.getElementById("heroTagline");
  if (tagEl && cfg.heroTagline) tagEl.textContent = cfg.heroTagline;

  const wishEl = document.getElementById("heroWish");
  if (wishEl && cfg.heroWish) wishEl.textContent = `"${cfg.heroWish}"`;

  // Note Paragraphs
  const noteContentEl = document.getElementById("noteParagraphs");
  if (noteContentEl && cfg.noteParagraphs && cfg.noteParagraphs.length) {
    noteContentEl.innerHTML = cfg.noteParagraphs
      .map((p) => `<p>${p}</p>`)
      .join("");
  }

  // Affirmations Grid
  const affGrid = document.getElementById("affGrid");
  if (affGrid && cfg.affirmations && cfg.affirmations.length) {
    affGrid.innerHTML = cfg.affirmations
      .map(
        (item, idx) => `
      <div class="aff-card sr sr-scale sr-d${(idx % 6) + 1}">
        <span class="ai">${item.icon}</span>
        <p class="ae">"${item.en}"</p>
        <p class="aid">${item.id}</p>
      </div>
    `,
      )
      .join("");
  }

  // Photos
  if (cfg.photos) {
    const mainImg = document.getElementById("bigPolaroidImg");
    if (mainImg && cfg.photos.mainBig) mainImg.src = cfg.photos.mainBig;

    const t1 = document.getElementById("thumb1");
    if (t1 && cfg.photos.thumb1) {
      t1.src = cfg.photos.thumb1;
      t1.dataset.full = cfg.photos.thumb1;
    }

    const t2 = document.getElementById("thumb2");
    if (t2 && cfg.photos.thumb2) {
      t2.src = cfg.photos.thumb2;
      t2.dataset.full = cfg.photos.thumb2;
    }

    const t3 = document.getElementById("thumb3");
    if (t3 && cfg.photos.thumb3) {
      t3.src = cfg.photos.thumb3;
      t3.dataset.full = cfg.photos.thumb3;
    }
  }
}

/* ═══════════════ 2. LIGHTWEIGHT PURE JS CONFETTI ═══════════════ */
let confettiCanvas = null,
  confettiCtx = null;
let confettiParticles = [];
let confettiAnimId = null;

function initConfetti() {
  confettiCanvas = document.getElementById("confettiCanvas");
  if (!confettiCanvas) return;
  confettiCtx = confettiCanvas.getContext("2d");

  function resize() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();
}

function launchConfetti(count = 70) {
  if (!confettiCanvas || !confettiCtx) return;

  const colors = [
    "#e74c3c",
    "#f5a9b8",
    "#ffd700",
    "#6fad7e",
    "#ffffff",
    "#b03020",
  ];
  const W = confettiCanvas.width;
  const H = confettiCanvas.height;

  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: W * 0.5 + (Math.random() - 0.5) * 120,
      y: H * 0.55 + (Math.random() - 0.5) * 50,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 14 - 6,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      gravity: 0.35,
    });
  }

  if (!confettiAnimId) {
    updateConfetti();
  }
}

function updateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.98;
    p.rotation += p.rotSpeed;
    p.opacity -= 0.007;

    if (p.opacity <= 0 || p.y > confettiCanvas.height) {
      confettiParticles.splice(i, 1);
      continue;
    }

    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.globalAlpha = p.opacity;
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    confettiCtx.restore();
  }

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(updateConfetti);
  } else {
    confettiAnimId = null;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

/* ═══════════════ 3. WEB AUDIO API SYNTHESIZER ═══════════════ */
let audioCtx = null,
  audioPlaying = false,
  gainNode = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playCelebrationChime() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      g.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      g.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.12 + 0.02);
      g.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + idx * 0.12 + 0.8,
      );
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.8);
    });
  } catch (e) {
    console.warn("Audio unavailable:", e);
  }
}

function playBackgroundAudio() {
  const audioEl = document.getElementById("bgAudio");
  if (audioEl) {
    audioEl.volume = 0.85;
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          audioPlaying = true;
          updateMusicUI(true);
        })
        .catch((err) => {
          console.log("Auto-play blocked or audio not found:", err);
        });
    }
  }
}

function updateMusicUI(isPlaying) {
  const btn = document.getElementById("musicBtn");
  const icon = document.getElementById("musicIcon");
  const txt = document.getElementById("musicTxt");
  const vinyl = document.getElementById("vinylWrap");

  if (isPlaying) {
    if (icon) icon.textContent = "⏸️";
    if (txt) txt.textContent = "Sedang Memutar... 🎵";
    if (btn) btn.style.background = "rgba(192, 57, 43, 0.55)";
    if (vinyl) vinyl.style.display = "block";
  } else {
    if (icon) icon.textContent = "▶️";
    if (txt) txt.textContent = "Putar Lagu Happy Birthday";
    if (btn) btn.style.background = "rgba(0,0,0,0.35)";
    if (vinyl) vinyl.style.display = "none";
  }
}

function toggleMusic() {
  const audioEl = document.getElementById("bgAudio");

  if (!audioPlaying) {
    if (audioEl && !audioEl.paused) {
      // already playing
      audioPlaying = true;
      updateMusicUI(true);
      return;
    }

    if (audioEl && audioEl.readyState >= 2) {
      audioEl
        .play()
        .then(() => {
          audioPlaying = true;
          updateMusicUI(true);
        })
        .catch(() => {
          playSynthBirthdaySong();
        });
    } else {
      // try playing audio or fallback to synthesizer
      if (audioEl) {
        audioEl
          .play()
          .then(() => {
            audioPlaying = true;
            updateMusicUI(true);
          })
          .catch(() => {
            playSynthBirthdaySong();
          });
      } else {
        playSynthBirthdaySong();
      }
    }
  } else {
    if (audioEl && !audioEl.paused) {
      audioEl.pause();
    }
    if (gainNode && audioCtx) {
      try {
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
      } catch (e) {}
    }
    audioPlaying = false;
    updateMusicUI(false);
  }
}

function playSynthBirthdaySong() {
  const ctx = getAudioContext();
  gainNode = ctx.createGain();
  gainNode.gain.value = 0.35;
  gainNode.connect(ctx.destination);

  // Happy Birthday notes
  const N = {
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.0,
    A4: 440.0,
    Bb4: 466.16,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
  };
  const song = [
    [N.C4, 0.3],
    [N.C4, 0.3],
    [N.D4, 0.6],
    [N.C4, 0.6],
    [N.F4, 0.6],
    [N.E4, 1.2],
    [N.C4, 0.3],
    [N.C4, 0.3],
    [N.D4, 0.6],
    [N.C4, 0.6],
    [N.G4, 0.6],
    [N.F4, 1.2],
    [N.C4, 0.3],
    [N.C4, 0.3],
    [N.C5, 0.6],
    [N.A4, 0.6],
    [N.F4, 0.6],
    [N.E4, 0.6],
    [N.D4, 1.0],
    [N.Bb4, 0.3],
    [N.Bb4, 0.3],
    [N.A4, 0.6],
    [N.F4, 0.6],
    [N.G4, 0.6],
    [N.F4, 1.5],
  ];

  let t = ctx.currentTime + 0.05;
  song.forEach(([freq, dur]) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.28, t + 0.02);
    g.gain.linearRampToValueAtTime(0, t + dur - 0.04);
    osc.connect(g);
    g.connect(gainNode);
    osc.start(t);
    osc.stop(t + dur);
    t += dur;
  });

  audioPlaying = true;
  updateMusicUI(true);

  setTimeout(() => {
    if (audioPlaying) {
      audioPlaying = false;
      updateMusicUI(false);
    }
  }, 12500);
}

/* ═══════════════ 4. HEARTS & SPARKLES ═══════════════ */
function initSpawnHearts() {
  const containers = ["hbg-qr", "hbg-pass", "hbg-main", "haHbg"];
  const icons = ["❤️", "🌹", "💕", "💗", "🌸", "✨", "💝"];

  containers.forEach((id) => {
    const w = document.getElementById(id);
    if (!w) return;
    for (let i = 0; i < 18; i++) {
      const e = document.createElement("span");
      e.className = "hb";
      e.textContent = icons[i % icons.length];
      e.style.left = Math.random() * 100 + "vw";
      e.style.animationDuration = 7 + Math.random() * 10 + "s";
      e.style.animationDelay = -(Math.random() * 14) + "s";
      w.appendChild(e);
    }
  });
}

function initGiftSparkles() {
  const sw = document.getElementById("spWrap");
  if (!sw) return;
  const sp = ["✨", "💕", "🌹", "❤️", "🌸"];
  for (let i = 0; i < 12; i++) {
    const e = document.createElement("span");
    e.className = "sp";
    e.textContent = sp[i % sp.length];
    e.style.cssText = `position:absolute;left:${4 + Math.random() * 90}vw;top:${4 + Math.random() * 90}vh;font-size:${14 + Math.random() * 8}px;opacity:.16;animation-delay:${-(Math.random() * 4)}s;animation-duration:${3 + Math.random() * 3}s`;
    sw.appendChild(e);
  }
}

/* ═══════════════ 5. INITIAL LOADING PROGRESS ═══════════════ */
function initLoadingProgress() {
  let w = 0;
  const bar = document.getElementById("ldBar");
  if (!bar) return;
  const iv = setInterval(() => {
    w += 3;
    bar.style.width = Math.min(w, 100) + "%";
    if (w >= 100) {
      clearInterval(iv);
      setTimeout(() => goTo("pg-qr", false), 350);
    }
  }, 45);
}

/* ═══════════════ 6. PAGE NAVIGATION ═══════════════ */
let currentPage = "pg-loading";

function goTo(id, loader = true) {
  if (!loader) {
    switchPage(id);
    return;
  }
  const ld = document.getElementById("pg-loading");
  const bar = document.getElementById("ldBar");
  if (bar) {
    bar.style.transition = "none";
    bar.style.width = "0%";
  }
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  if (ld) ld.classList.add("active");

  let w = 0;
  const iv = setInterval(() => {
    w += 4;
    if (bar) bar.style.width = Math.min(w, 100) + "%";
    if (w >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        if (ld) ld.classList.remove("active");
        switchPage(id);
      }, 200);
    }
  }, 35);
}

function switchPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  if (id === "pg-main") {
    const m = document.getElementById("pg-main");
    if (m) {
      m.classList.add("active");
      m.scrollTop = 0;
      setTimeout(triggerHeroCharsReveal, 350);
    }
  } else {
    const el = document.getElementById(id);
    if (el) el.classList.add("active");
  }
  currentPage = id;
}

/* ═══════════════ 7. PASSWORD / KEYPAD ═══════════════ */
let pin = "";

function kp(v) {
  const err = document.getElementById("pwErr");
  if (err) err.textContent = "";

  if (v === "del") {
    pin = pin.slice(0, -1);
  } else if (v === "ok") {
    chk();
    return;
  } else {
    if (pin.length < 6) pin += v;
    if (pin.length === 6) {
      updD();
      setTimeout(chk, 180);
      return;
    }
  }
  updD();
}

function updD() {
  for (let i = 0; i < 6; i++) {
    const d = document.getElementById("d" + i);
    if (d) d.classList.toggle("on", i < pin.length);
  }
}

function chk() {
  const targetCode =
    (typeof BIRTHDAY_CONFIG !== "undefined" && BIRTHDAY_CONFIG.secretCode) ||
    "050907";
  if (pin === targetCode) {
    playCelebrationChime();
    goTo("pg-gift");
  } else {
    const err = document.getElementById("pwErr");
    if (err) {
      err.textContent = "Kode rahasia belum tepat, coba lagi 💕";
      err.classList.remove("shake");
      void err.offsetWidth;
      err.classList.add("shake");
    }
    pin = "";
    updD();
  }
}

/* ═══════════════ 8. GIFT & FLOWER BURST REVEAL ═══════════════ */
let giftDone = false;

function openGift() {
  if (giftDone) return;
  giftDone = true;

  playCelebrationChime();
  playBackgroundAudio();
  launchConfetti(80);

  const giftPg = document.getElementById("pg-gift");
  if (giftPg) giftPg.classList.remove("active");

  const cover = document.getElementById("flower-cover");
  if (!cover) return;
  cover.innerHTML = "";
  cover.style.opacity = "1";
  cover.style.display = "flex";
  cover.classList.add("show");

  const em = ["🌸", "🌺", "🌹", "🌷", "🌼", "💐", "💕", "✨"];
  const W = window.innerWidth,
    H = window.innerHeight;
  const cols = 5,
    rows = 5;
  const cellW = W / cols,
    cellH = H / rows;

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const el = document.createElement("span");
      el.className = "fc-petal";
      el.textContent = em[Math.floor(Math.random() * em.length)];
      const sz = Math.min(38, Math.max(18, (W * 4) / 100)) + Math.random() * 8;
      el.style.fontSize = sz + "px";

      const finalX =
        cellW * c + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.6 - W * 0.5;
      const finalY =
        cellH * r + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.6 - H * 0.5;
      el.style.left = W * 0.5 + finalX + "px";
      el.style.top = H * 0.5 + finalY + "px";

      el.style.setProperty("--fx", -finalX * 1.8 + "px");
      el.style.setProperty("--fy", -finalY * 1.8 + "px");
      el.style.setProperty("--fd", 0.4 + Math.random() * 0.5 + "s");
      el.style.setProperty("--fl", Math.random() * 0.4 + "s");
      el.style.setProperty("--fr", Math.random() * 50 - 25 + "deg");
      el.style.setProperty("--fs", 2.8 + Math.random() * 1.8 + "s");
      el.style.setProperty("--fsl", Math.random() * 0.8 + "s");
      cover.appendChild(el);
    }
  }

  const bloom = document.createElement("div");
  bloom.className = "fc-bloom";
  bloom.textContent = "🌸";
  cover.appendChild(bloom);

  setTimeout(() => {
    cover.style.transition = "opacity 0.9s ease";
    cover.style.opacity = "0";
    setTimeout(() => {
      cover.style.display = "none";
      cover.classList.remove("show");
      cover.style.opacity = "1";
      showHeroAnim();
    }, 900);
  }, 2200);
}

function showHeroAnim() {
  const pg = document.getElementById("pg-hero-anim");
  if (!pg) return;
  pg.style.opacity = "0";
  pg.style.display = "flex";
  pg.classList.add("show");
  pg.style.transition = "opacity .6s ease";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      pg.style.opacity = "1";
    });
  });

  document.querySelectorAll(".ha-item").forEach((el) => {
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  });

  setTimeout(() => {
    pg.style.transition = "opacity .8s ease";
    pg.style.opacity = "0";
    setTimeout(() => {
      pg.style.display = "none";
      pg.classList.remove("show");
      switchPage("pg-main");
      launchConfetti(90);
    }, 800);
  }, 3400);
}

/* ═══════════════ 9. SUB-PAGES NAVIGATION ═══════════════ */
function openSub(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("open");
  document.body.style.overflow = "hidden";
  const scrollable = el.querySelector('[style*="overflow-y: auto"]') || el;
  if (scrollable) scrollable.scrollTop = 0;

  // Trigger char-by-char reveals for letter cards
  if (id === "sp-msg") {
    setTimeout(() => {
      const card = document.getElementById("msgLetterCard");
      if (card) {
        // Title fade-in
        const title = card.querySelector("span:first-child");
        if (title && !title.classList.contains("letter-title-reveal")) {
          title.classList.add("letter-title-reveal");
          setTimeout(() => title.classList.add("revealed"), 80);
        }
        // Paragraphs — char-by-char, staggered
        let cumulativeDelay = 300;
        card.querySelectorAll("p").forEach((p) => {
          if (!p.dataset.charDone) wrapChars(p);
          const charCount = p.querySelectorAll(".char-unit").length;
          const delay = cumulativeDelay;
          setTimeout(() => revealChars(p, 22), delay);
          cumulativeDelay += charCount * 22 + 300;
        });
        // Signature
        const sig = card.querySelector("span:last-child");
        if (sig && !sig.dataset.charDone) {
          wrapChars(sig);
          setTimeout(() => revealChars(sig, 35), cumulativeDelay);
        }
      }
    }, 460);
  }

  if (id === "sp-cake") {
    setTimeout(() => {
      const card = document.getElementById("cakeLetterCard");
      if (card) {
        const title = card.querySelector("span:first-child");
        if (title && !title.classList.contains("letter-title-reveal")) {
          title.classList.add("letter-title-reveal");
          setTimeout(() => title.classList.add("revealed"), 80);
        }
        let cumulativeDelay = 300;
        card.querySelectorAll("p").forEach((p) => {
          if (!p.dataset.charDone) wrapChars(p);
          const charCount = p.querySelectorAll(".char-unit").length;
          const delay = cumulativeDelay;
          setTimeout(() => revealChars(p, 22), delay);
          cumulativeDelay += charCount * 22 + 300;
        });
        const sig = card.querySelector("span:last-child");
        if (sig && !sig.dataset.charDone) {
          wrapChars(sig);
          setTimeout(() => revealChars(sig, 35), cumulativeDelay);
        }
      }
    }, 460);
  }
}

function closeSub(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("open");
  document.body.style.overflow = "";
}

/* ═══════════════ 10. SUNFLOWER TABLET & BOUQUET INTERACTIONS ═══════════════ */
function initSunflowerTablet() {
  if (
    typeof BIRTHDAY_CONFIG !== "undefined" &&
    BIRTHDAY_CONFIG.sunflowerPills
  ) {
    const pills = BIRTHDAY_CONFIG.sunflowerPills;
    const l1 = document.getElementById("sfPillL1");
    if (l1 && pills.left1) l1.textContent = pills.left1;
    const l2 = document.getElementById("sfPillL2");
    if (l2 && pills.left2) l2.textContent = pills.left2;
    const l3 = document.getElementById("sfPillL3");
    if (l3 && pills.left3) l3.textContent = pills.left3;
    const r1 = document.getElementById("sfPillR1");
    if (r1 && pills.right1) r1.textContent = pills.right1;
    const r2 = document.getElementById("sfPillR2");
    if (r2 && pills.right2) r2.textContent = pills.right2;
    const r3 = document.getElementById("sfPillR3");
    if (r3 && pills.right3) r3.textContent = pills.right3;
  }

  // Click on pill bubbles for interactive sound & sparkle
  document.querySelectorAll(".sf-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      playFairyChime();
      spawnFlowerSparkles(pill);
      pill.style.transform = "scale(1.08) translateY(-4px)";
      setTimeout(() => {
        pill.style.transform = "";
      }, 300);
    });
  });
}

function triggerSunflowerSurprise() {
  playCelebrationChime();
  launchConfetti(90);

  const btn = document.getElementById("sfClickBtn");
  if (btn) {
    btn.innerHTML = "✨ Going to Digital Bouquet 🌻";
    btn.style.background = "linear-gradient(135deg, #ffe066, #ffb703)";
    btn.disabled = true;
  }

  // Close flower sub-page then scroll to digital bouquet in pg-main
  setTimeout(() => {
    closeSub("sp-flower");

    // Reset button after close
    setTimeout(() => {
      if (btn) {
        btn.innerHTML = "Click here";
        btn.style.background = "";
        btn.disabled = false;
      }
    }, 600);

    // Scroll to digital bouquet section in pg-main
    setTimeout(() => {
      const pgMain = document.getElementById("pg-main");
      const bouquetSection = document.getElementById("digitalBouquetSection");
      if (pgMain && bouquetSection) {
        // Smooth scroll to the digital bouquet section
        bouquetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        // Also set pgMain scrollTop as fallback for fixed container
        const rect = bouquetSection.getBoundingClientRect();
        const pgRect = pgMain.getBoundingClientRect();
        pgMain.scrollTo({
          top: pgMain.scrollTop + rect.top - pgRect.top - 40,
          behavior: "smooth",
        });
      }
    }, 500);
  }, 700);
}

function showSunflowerToast() {
  const existingToast = document.getElementById("sfToast");
  if (existingToast) existingToast.remove();

  const recipient =
    (typeof BIRTHDAY_CONFIG !== "undefined" && BIRTHDAY_CONFIG.recipientName) ||
    "Mayy";
  const toast = document.createElement("div");
  toast.id = "sfToast";
  toast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    background: rgba(25, 5, 10, 0.95);
    border: 2px solid #ffb703;
    border-radius: 24px;
    padding: 24px 28px;
    color: #fff;
    text-align: center;
    max-width: 380px;
    width: 90vw;
    box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(255, 183, 3, 0.4);
    z-index: 99999;
    opacity: 0;
    backdrop-filter: blur(14px);
    transition: all 0.35s cubic-bezier(0.22, 0.8, 0.3, 1);
  `;

  toast.innerHTML = `
    <div style="font-size: 40px; margin-bottom: 8px; animation: breathe 1.5s infinite;">🌻✨</div>
    <h4 style="font-family: 'Playfair Display', serif; font-size: 22px; color: #ffb703; margin-bottom: 8px;">For ${recipient}</h4>
    <p style="font-size: 13.5px; line-height: 1.7; color: rgba(255,255,255,0.92); margin-bottom: 16px;">
      "Semoga kamu selalu tumbuh mekar menghadap cahaya, dipenuhi kebahagiaan, dan senyumanmu selalu menghangatkan dunia di sekitarmu 🤍🌻"
    </p>
    <button onclick="document.getElementById('sfToast').remove()" style="
      background: linear-gradient(135deg, #ffb703, #fb8500);
      border: none;
      color: #301000;
      font-weight: 700;
      padding: 8px 24px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 13px;
      box-shadow: 0 4px 15px rgba(251, 133, 0, 0.4);
    ">Tutup 💕</button>
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, -50%) scale(1)";
  });
}

function initBouquetInteractions() {
  document.querySelectorAll(".bfl").forEach((fl) => {
    fl.addEventListener("click", () => {
      const type = fl.dataset.flower;
      let msg = fl.dataset.msg;

      if (
        typeof BIRTHDAY_CONFIG !== "undefined" &&
        BIRTHDAY_CONFIG.flowerMessages &&
        BIRTHDAY_CONFIG.flowerMessages[type]
      ) {
        msg = BIRTHDAY_CONFIG.flowerMessages[type];
      }

      const bar = document.getElementById("bqMsg");
      if (!bar) return;

      document.querySelectorAll(".bfl").forEach((f) => (f.style.filter = ""));
      fl.style.filter =
        "drop-shadow(0 0 16px rgba(255, 200, 200, 0.95)) brightness(1.35)";

      bar.classList.remove("empty");
      bar.style.opacity = "0";
      bar.style.transform = "translateY(8px)";
      bar.style.transition = "opacity .3s ease, transform .3s ease";

      requestAnimationFrame(() => {
        bar.textContent = `"${msg || "Semoga harimu selalu dipenuhi kebahagiaan 🌸"}"`;
        requestAnimationFrame(() => {
          bar.style.opacity = "1";
          bar.style.transform = "translateY(0)";
        });
      });
    });
  });
}

/* ═══════════════ 11. INTERACTIVE CAKE & CANDLE BLOW ═══════════════ */
let candleBlown = false;

function initInteractiveCandle() {
  const candleFlame = document.getElementById("candleFlame");
  const blowBtn = document.getElementById("blowCandleBtn");
  const wishBanner = document.getElementById("cakeWishBanner");

  if (!candleFlame) return;

  function toggleCandle() {
    if (!candleBlown) {
      // Tiup lilin
      candleFlame.classList.add("blown-out");
      candleBlown = true;
      playCelebrationChime();
      launchConfetti(120);

      if (wishBanner) {
        const name =
          (typeof BIRTHDAY_CONFIG !== "undefined" &&
            BIRTHDAY_CONFIG.recipientName) ||
          "Mayy";
        wishBanner.textContent = `✨ Lilin berhasil ditiup! Semoga semua harapan & doa ${name} terkabul! 🤍🎂`;
        wishBanner.style.opacity = "1";
      }

      if (blowBtn) {
        blowBtn.innerHTML = "🔥 Nyalakan Lilin Lagi";
      }
    } else {
      // Nyalakan kembali
      candleFlame.classList.remove("blown-out");
      candleBlown = false;

      if (wishBanner) {
        wishBanner.textContent =
          "Tutup mata, ucapkan permohonan dalam hati, lalu tiup lilinnya! 🕯️✨";
      }

      if (blowBtn) {
        blowBtn.innerHTML = "💨 Tiup Lilin Ulang Tahun";
      }
    }
  }

  if (blowBtn) {
    blowBtn.addEventListener("click", toggleCandle);
  }
  candleFlame.addEventListener("click", toggleCandle);
}

/* ═══════════════ 12. PHOTO MODAL & POLAROID SWAP ═══════════════ */
function initPhotoModal() {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImg");
  const big = document.getElementById("bigPolaroid");

  if (big) {
    big.addEventListener("click", () => {
      const img = big.querySelector("img");
      if (img && modal && modalImg) {
        modalImg.src = img.src;
        modal.classList.add("open");
      }
    });
  }

  document.querySelectorAll(".smallThumb").forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetSrc = thumb.dataset.full || thumb.src;
      const mainImg = document.getElementById("bigPolaroidImg");

      if (mainImg) {
        // Efek swap halus
        mainImg.style.opacity = "0";
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = "1";
        }, 150);
      }
    });
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("pm-overlay") ||
        e.target.classList.contains("pm-close")
      ) {
        modal.classList.remove("open");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        modal.classList.remove("open");
      }
    });
  }
}

/* ═══════════════ 13. SCROLL REVEAL & MOUSE PARALLAX ═══════════════ */
function initScrollReveal() {
  const pgMain = document.getElementById("pg-main");
  if (!pgMain) return;

  // Ensure all headings, paragraphs, and cards in scrollable main page have smooth staggered entrance
  pgMain
    .querySelectorAll(
      ".m-msg p, .m-close h2, .m-close p, .m-close .cl-note, .hashtag, .cl-hearts",
    )
    .forEach((el, i) => {
      if (!el.classList.contains("sr")) {
        el.classList.add("sr");
        el.classList.add(`sr-d${(i % 5) + 1}`);
      }
    });

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { root: pgMain, threshold: 0.08 },
  );

  document.querySelectorAll(".sr, .sr-scale").forEach((el) => obs.observe(el));
}

function initMouseInteractions() {
  const pgMain = document.getElementById("pg-main");
  if (!pgMain) return;

  // 3D Tilt on Gift Cards
  pgMain.querySelectorAll(".g-card").forEach((card) => {
    const icon = card.querySelector(".g-icon");
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${cy * -16}deg) rotateY(${cx * 20}deg) translateY(-10px) scale(1.06)`;
      if (icon)
        icon.style.transform = `translate(${cx * 8}px, ${cy * 6}px) scale(1.04)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      if (icon) icon.style.transform = "";
    });
  });
}

/* ═══════════════ 14. FALLING PETALS & HEARTS RAIN ═══════════════ */
function initFallingPetalsHearts() {
  const container = document.getElementById("fallingPetalsHearts");
  if (!container) return;

  const items = [
    "🌸",
    "💕",
    "🌹",
    "💖",
    "🌷",
    "✨",
    "🌺",
    "🤍",
    "🌸",
    "💕",
    "🌷",
  ];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "falling-item";
    el.textContent = items[Math.floor(Math.random() * items.length)];

    const left = Math.random() * 100;
    const dur = 7 + Math.random() * 8; // 7s to 15s
    const delay = -(Math.random() * 14); // random start in cycle
    const size = 16 + Math.random() * 14; // 16px to 30px
    const op = 0.5 + Math.random() * 0.45;
    const sway = (Math.random() - 0.5) * 80;
    const drift = (Math.random() - 0.5) * 60;
    const rot = 180 + Math.random() * 360;

    el.style.left = `${left}vw`;
    el.style.setProperty("--f-dur", `${dur}s`);
    el.style.setProperty("--f-del", `${delay}s`);
    el.style.setProperty("--f-size", `${size}px`);
    el.style.setProperty("--f-op", op);
    el.style.setProperty("--f-sway", `${sway}px`);
    el.style.setProperty("--f-drift", `${drift}px`);
    el.style.setProperty("--f-rot", `${rot}deg`);

    container.appendChild(el);
  }
}

/* ═══════════════ 15. DIGITAL BOUQUET (MATCHING SCREENSHOT) ═══════════════ */
function initDigitalBouquet() {
  const stage = document.getElementById("dbStage");
  const halo = document.getElementById("dbGlowHalo");
  const quoteBox = document.getElementById("dbQuoteBox");
  const quoteText = document.getElementById("dbQuoteText");
  const defaultActive = document.getElementById("dbDefaultActive");

  if (!stage || !halo || !quoteText) return;

  // Reposition halo to match the active flower element's center
  function alignHaloTo(flowerEl) {
    if (!flowerEl || !stage) return;
    const stageRect = stage.getBoundingClientRect();
    const flRect = flowerEl.getBoundingClientRect();

    const relX = flRect.left + flRect.width / 2 - stageRect.left;
    const relY = flRect.top + flRect.height / 2 - stageRect.top;

    halo.style.left = `${relX}px`;
    halo.style.top = `${relY}px`;
  }

  // Set initial position on default active flower
  setTimeout(() => {
    if (defaultActive) {
      alignHaloTo(defaultActive);
    }
  }, 250);

  // Re-align on window resize
  window.addEventListener("resize", () => {
    const currentActive =
      document.querySelector(".db-flower.db-active") || defaultActive;
    if (currentActive) alignHaloTo(currentActive);
  });

  // Handle click on any flower in the digital bouquet
  document.querySelectorAll(".db-flower").forEach((flower) => {
    flower.addEventListener("click", () => {
      document
        .querySelectorAll(".db-flower")
        .forEach((f) => f.classList.remove("db-active"));
      flower.classList.add("db-active");

      // Move glowing halo to this flower
      alignHaloTo(flower);

      // Play soft celebratory note/chime
      playFairyChime();

      // Spawn subtle sparkles on the flower
      spawnFlowerSparkles(flower);

      // Lookup message from BIRTHDAY_CONFIG.digitalBouquet
      const flowerId = flower.dataset.id;
      let msg = "";

      if (
        typeof BIRTHDAY_CONFIG !== "undefined" &&
        BIRTHDAY_CONFIG.digitalBouquet
      ) {
        const found = BIRTHDAY_CONFIG.digitalBouquet.find(
          (item) => item.id === flowerId,
        );
        if (found) msg = found.text;
      }

      if (!msg) {
        msg =
          "Kamu secantik bunga tulip di musim semi, segar dan penuh harapan baru.";
      }

      // Smoothly update quote text with animation
      quoteText.style.opacity = "0";
      quoteText.style.transform = "translateY(8px)";
      if (quoteBox) {
        quoteBox.style.borderColor = "rgba(245, 169, 184, 0.5)";
        quoteBox.style.boxShadow =
          "0 16px 40px rgba(0,0,0,0.5), 0 0 25px rgba(245, 169, 184, 0.35)";
      }

      setTimeout(() => {
        quoteText.textContent = `"${msg}"`;
        quoteText.style.opacity = "1";
        quoteText.style.transform = "translateY(0)";
      }, 180);
    });
  });
}

function playFairyChime() {
  try {
    const ctx = getAudioContext();
    const freqs = [659.25, 880.0, 1174.66]; // E5, A5, D6
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      g.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      g.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + idx * 0.08 + 0.6,
      );
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.6);
    });
  } catch (e) {
    // audio context might be blocked if user hasn't interacted
  }
}

function spawnFlowerSparkles(flowerEl) {
  const rect = flowerEl.getBoundingClientRect();
  const emojis = ["✨", "💕", "🌸"];
  for (let i = 0; i < 4; i++) {
    const sp = document.createElement("span");
    sp.textContent = emojis[i % emojis.length];
    sp.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * 30}px;
      top: ${rect.top + rect.height / 2 + (Math.random() - 0.5) * 30}px;
      font-size: 14px;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.7s cubic-bezier(0.2, 0.8, 0.3, 1);
      opacity: 1;
    `;
    document.body.appendChild(sp);

    requestAnimationFrame(() => {
      sp.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -${20 + Math.random() * 40}px) scale(0.4)`;
      sp.style.opacity = "0";
    });

    setTimeout(() => sp.remove(), 750);
  }
}

/* ═══════════════ WORD-BY-WORD & CHAR-BY-CHAR TEXT REVEAL ═══════════════ */

/**
 * Wraps each word in element in a <span class="word-unit">
 * (safe for nested spans like cfg-recipient)
 */
function wrapWords(el) {
  if (!el || el.dataset.wordDone) return;
  el.dataset.wordDone = "1";

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text.trim()) return;
      const parts = text.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else if (part) {
          const span = document.createElement("span");
          span.className = "word-unit";
          span.textContent = part;
          frag.appendChild(span);
        }
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(processNode);
    }
  }
  Array.from(el.childNodes).forEach(processNode);
}

/**
 * Reveals all .word-unit in container with a stagger delay
 */
function revealWords(container, stagger = 60) {
  const units = container.querySelectorAll(".word-unit:not(.revealed)");
  units.forEach((u, i) => {
    setTimeout(() => u.classList.add("revealed"), i * stagger);
  });
}

/**
 * Wraps each char in element in a <span class="char-unit"> for letter-by-letter effect
 */
function wrapChars(el) {
  if (!el || el.dataset.charDone) return;
  el.dataset.charDone = "1";

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text) return;
      const frag = document.createDocumentFragment();
      for (const ch of text) {
        if (ch === " ") {
          frag.appendChild(document.createTextNode("\u00a0"));
        } else {
          const span = document.createElement("span");
          span.className = "char-unit";
          span.textContent = ch;
          frag.appendChild(span);
        }
      }
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(processNode);
    }
  }
  Array.from(el.childNodes).forEach(processNode);
}

/**
 * Reveals all .char-unit in container with a stagger delay
 */
function revealChars(container, stagger = 38) {
  const units = container.querySelectorAll(".char-unit:not(.revealed)");
  units.forEach((u, i) => {
    setTimeout(() => u.classList.add("revealed"), i * stagger);
  });
}

/**
 * Initialises char-by-char reveal for scrollable main page text
 */
function initWordReveal() {
  // Wrap all main-page text with char units for scroll-triggered reveal
  const charTargets = [
    ".m-wish",
    ".m-tagline",
    ".note p",
    ".note-title",
    ".note-sign",
    ".cl-note",
    ".cl-from",
    ".db-sub",
    ".sec-sub",
  ];
  charTargets.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => wrapChars(el));
  });

  // Hero banner — char-by-char for big bold text
  [".m-pill", ".m-hb", ".m-name"].forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => wrapChars(el));
  });
  const tagEl = document.getElementById("heroTagline");
  if (tagEl) wrapChars(tagEl);
  const wishEl = document.getElementById("heroWish");
  if (wishEl) wrapChars(wishEl);

  // IntersectionObserver for main page char reveals on scroll
  const pgMain = document.getElementById("pg-main");
  if (!pgMain) return;

  const charObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          revealChars(e.target, 28);
          charObs.unobserve(e.target);
        }
      });
    },
    { root: pgMain, threshold: 0.08 },
  );

  document
    .querySelectorAll(
      ".note p, .note-title, .note-sign, .cl-note, .cl-from, .db-sub, .sec-sub, .m-wish, .m-tagline",
    )
    .forEach((el) => charObs.observe(el));
}

/**
 * Triggers the hero banner char reveal when pg-main becomes active
 */
function triggerHeroCharsReveal() {
  // Pill — chars from right
  const pill = document.querySelector(".m-pill");
  if (pill) revealChars(pill, 32);

  // "Happy Birthday" label — chars
  setTimeout(() => {
    const hb = document.querySelector(".m-hb");
    if (hb) revealChars(hb, 42);
  }, 200);

  // Name — chars, slower for drama
  setTimeout(() => {
    const name = document.querySelector(".m-name");
    if (name) revealChars(name, 60);
  }, 480);

  // Tagline — chars
  setTimeout(() => {
    const tagEl = document.getElementById("heroTagline");
    if (tagEl) revealChars(tagEl, 28);
  }, 900);

  // Wish — chars
  setTimeout(() => {
    const wishEl = document.getElementById("heroWish");
    if (wishEl) revealChars(wishEl, 22);
  }, 1250);
}

/* ═══════════════ SUB-PAGE FALLING ICONS ═══════════════ */

/**
 * Populates falling icon containers in sp-msg, sp-flower, sp-cake
 */
function initSubPageFalling() {
  const configs = [
    {
      id: "spFallMsg",
      items: ["💌", "🌹", "💕", "✨", "💝", "🌸", "💖", "🥹"],
      count: 22,
    },
    {
      id: "spFallFlower",
      items: ["🌸", "🌺", "🌷", "🌼", "🌻", "💐", "🌹", "🍃", "✨", "🌿"],
      count: 26,
    },
    {
      id: "spFallCake",
      items: ["🎂", "🎉", "🍰", "✨", "💕", "🎁", "🌟", "⭐", "🕯️"],
      count: 22,
    },
  ];

  configs.forEach(({ id, items, count }) => {
    const container = document.getElementById(id);
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "falling-item";
      el.textContent = items[Math.floor(Math.random() * items.length)];

      const left = Math.random() * 100;
      const dur = 7 + Math.random() * 9;
      const delay = -(Math.random() * 14);
      const size = 13 + Math.random() * 11;
      const sway = (Math.random() - 0.5) * 70;
      const drift = (Math.random() - 0.5) * 50;
      const rot = 160 + Math.random() * 360;

      el.style.left = `${left}%`;
      el.style.setProperty("--f-dur", `${dur}s`);
      el.style.setProperty("--f-del", `${delay}s`);
      el.style.setProperty("--f-size", `${size}px`);
      el.style.setProperty("--f-op", "0.22");
      el.style.setProperty("--f-sway", `${sway}px`);
      el.style.setProperty("--f-drift", `${drift}px`);
      el.style.setProperty("--f-rot", `${rot}deg`);

      container.appendChild(el);
    }
  });
}
