// ============================================
// YASHVI BHATT PORTFOLIO — main.js
// ============================================

// --- Mobile nav toggle ---
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Animate hamburger to X
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav when a link is clicked (mobile)
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });
})();

// --- Highlight active nav link based on current page ---
(function () {
  const path     = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  navLinks.forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// --- Essay expand/collapse (writing page) ---
function toggleEssay(btn) {
  var targetId = btn.getAttribute('data-target');
  var body = document.getElementById(targetId);
  if (!body) return;
  var isOpen = body.classList.toggle('open');
  btn.innerHTML = isOpen ? 'Close essay &uarr;' : 'Read full essay &darr;';
}

// --- Articles toggle (writing page) ---
function toggleArticles() {
  var extra   = document.getElementById('articlesExtra');
  var btn     = document.getElementById('articlesToggle');
  if (!extra || !btn) return;
  var isOpen  = extra.style.display !== 'none';
  extra.style.display  = isOpen ? 'none' : 'grid';
  btn.innerHTML        = isOpen ? 'Show more articles &darr;' : 'Show less &uarr;';
}

// --- Smooth scroll for anchor links (case study deep links) ---
document.querySelectorAll('a[href*="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;

    const targetId = href.slice(hashIndex + 1);
    const page     = href.slice(0, hashIndex);
    const isCurrentPage = page === '' || page === window.location.pathname.split('/').pop();

    if (isCurrentPage && targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// --- Count-up numbers on scroll ---
(function () {
  var nums = document.querySelectorAll('.count-num');
  if (!nums.length || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      var el      = entry.target;
      var target  = parseInt(el.getAttribute('data-target'), 10);
      var duration = 1400;
      var start   = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        // ease-out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });

  nums.forEach(function (el) { observer.observe(el); });
})();

// --- Fade in sections on scroll ---
(function () {
  if (!('IntersectionObserver' in window)) return;

  const style = document.createElement('style');
  style.textContent = `
    .fade-in-section {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .fade-in-section.visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  // Apply to case studies, service tiles, gallery cards, work cards, experience sections
  document.querySelectorAll(
    '.case-study, .service-tile, .gallery-card, .work-card, .col-card, .pull-quote, .about-teaser > div, .exp-timeline, .exp-stats'
  ).forEach(function (el) {
    el.classList.add('fade-in-section');
    observer.observe(el);
  });

  // Stagger siblings inside grids
  document.querySelectorAll('.three-col, .work-grid').forEach(function (grid) {
    grid.querySelectorAll('.col-card, .work-card').forEach(function (card, i) {
      card.style.transitionDelay = (i * 110) + 'ms';
    });
  });
  document.querySelectorAll('.about-teaser > div').forEach(function (div, i) {
    div.style.transitionDelay = (i * 150) + 'ms';
  });
})();

// --- Cursor spotlight ---
(function () {
  var glow = document.createElement('div');
  glow.id = 'cursorGlow';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', function (e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

// --- Text scramble on hero load ---
(function () {
  var el = document.querySelector('.hero h1 span');
  if (!el) return;
  var final  = el.textContent;
  var chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$&?';
  var dur    = 1100;
  var start  = null;

  function step(ts) {
    if (!start) start = ts;
    var progress = Math.min((ts - start) / dur, 1);
    var resolved = Math.floor((1 - Math.pow(1 - progress, 2)) * final.length);
    var out = '';
    for (var i = 0; i < final.length; i++) {
      if (i < resolved || final[i] === ' ') {
        out += final[i];
      } else {
        out += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = out;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = final;
  }

  window.addEventListener('load', function () {
    setTimeout(function () { requestAnimationFrame(step); }, 200);
  });
})();

// --- Live clock (Champaign IL / CT) ---
(function () {
  var el = document.getElementById('heroClock');
  if (!el) return;
  function tick() {
    el.textContent = new Date().toLocaleTimeString('en-US', {
      timeZone: 'America/Chicago',
      hour: '2-digit', minute: '2-digit', hour12: true
    }) + ' CT';
  }
  tick();
  setInterval(tick, 1000);
})();

// --- CFA Level II countdown ---
(function () {
  var el = document.getElementById('cfaCountdown');
  if (!el) return;
  var exam = new Date('2026-05-17T00:00:00'); // CFA L2 May 2026 window
  function update() {
    var now  = new Date();
    var diff = exam - now;
    if (diff <= 0) { el.textContent = 'CFA L2 — exam week'; return; }
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    el.textContent = '\u00b7 ' + days + 'd to CFA L2';
  }
  update();
  setInterval(update, 60000);
})();

// --- Live market ticker (Finnhub) ---
(function () {
  var KEY = 'd6k104pr01qkvh5roa50d6k104pr01qkvh5roa5g';

  var tickers = [
    { key: 'spx',    symbol: '^GSPC',           decimals: 1 },
    { key: 'ndx',    symbol: '^IXIC',           decimals: 1 },
    { key: 'dji',    symbol: '^DJI',            decimals: 1 },
    { key: 'vix',    symbol: '^VIX',            decimals: 2 },
    { key: 'tsy',    symbol: '^TNX',            decimals: 3, scale: 0.1, isYield: true },
    { key: 'btc',    symbol: 'BINANCE:BTCUSDT', decimals: 0 },
    { key: 'gold',   symbol: 'OANDA:XAU_USD',   decimals: 1 },
    { key: 'eurusd', symbol: 'OANDA:EUR_USD',   decimals: 4 },
    { key: 'oil',    symbol: 'NYMEX:CL1!',      decimals: 2 }
  ];

  function fmtNum(n, d) {
    return n.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function paint(t, data) {
    if (!data || data.c == null || data.c === 0) return;
    var price  = t.scale ? data.c * t.scale : data.c;
    var change = t.scale ? (data.d || 0) * t.scale : (data.d || 0);
    var pct    = data.dp || 0;

    document.querySelectorAll('[data-ticker="' + t.key + '"]').forEach(function (el) {
      var priceEl  = el.querySelector('.ticker-price');
      var changeEl = el.querySelector('.ticker-change');
      if (!priceEl || !changeEl) return;

      priceEl.textContent = fmtNum(price, t.decimals) + (t.isYield ? '%' : '');

      var dir       = change >= 0 ? '+' : '\u2212';
      var absChange = Math.abs(change);
      var absPct    = Math.abs(pct);
      changeEl.textContent = t.isYield
        ? dir + absChange.toFixed(3)
        : dir + absChange.toFixed(2) + ' (' + dir + absPct.toFixed(2) + '%)';
      changeEl.className = 'ticker-change ' + (change >= 0 ? 'up' : 'dn');
    });
  }

  function fetchAll() {
    tickers.forEach(function (t, i) {
      setTimeout(function () {
        fetch('https://finnhub.io/api/v1/quote?symbol=' + encodeURIComponent(t.symbol) + '&token=' + KEY)
          .then(function (r) { return r.json(); })
          .then(function (data) { paint(t, data); })
          .catch(function () {});
      }, i * 150);
    });
  }

  if (document.querySelector('[data-ticker]')) {
    fetchAll();
    setInterval(fetchAll, 30000);
  }
})();

// --- Hero background line chart ---
(function () {
  var canvas = document.getElementById('heroChart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var pts = [];
  var progress = 0;   // 0→1: how far the line is drawn
  var alpha    = 0;   // canvas opacity
  var phase    = 'fadein'; // fadein | drawing | hold | fadeout
  var phaseT   = 0;
  var last     = null;

  var DRAW_DUR  = 5;    // seconds to draw full line
  var HOLD_DUR  = 1.8;  // seconds to hold at end
  var FADE_DUR  = 0.8;  // seconds to fade out/in

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    generate();
  }

  function generate() {
    pts = [];
    var W = canvas.width;
    var H = canvas.height;
    var n = 220;
    var y = H * 0.80;
    var vel = 0;
    for (var i = 0; i <= n; i++) {
      var t   = i / n;
      // Trend: smooth rise from 80% to 14% of height
      var trend = H * (0.80 - t * 0.66);
      // Brownian noise
      vel += (Math.random() - 0.5) * 14;
      vel *= 0.82;
      y = trend + vel;
      pts.push({ x: (t * W), y: Math.max(H * 0.06, Math.min(H * 0.94, y)) });
    }
    progress = 0;
    alpha    = 0;
    phase    = 'fadein';
    phaseT   = 0;
  }

  function draw() {
    var W = canvas.width;
    var H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    var count = Math.max(2, Math.floor(progress * pts.length));
    var visible = pts.slice(0, count);
    if (visible.length < 2) return;

    ctx.globalAlpha = alpha;

    // Gradient fill under line
    var grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   'rgba(126,184,247,0.07)');
    grad.addColorStop(0.7, 'rgba(126,184,247,0.02)');
    grad.addColorStop(1,   'rgba(126,184,247,0)');

    ctx.beginPath();
    ctx.moveTo(visible[0].x, visible[0].y);
    for (var i = 1; i < visible.length - 1; i++) {
      var mx = (visible[i].x + visible[i + 1].x) / 2;
      var my = (visible[i].y + visible[i + 1].y) / 2;
      ctx.quadraticCurveTo(visible[i].x, visible[i].y, mx, my);
    }
    ctx.lineTo(visible[visible.length - 1].x, visible[visible.length - 1].y);
    ctx.lineTo(visible[visible.length - 1].x, H);
    ctx.lineTo(visible[0].x, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line itself
    ctx.beginPath();
    ctx.moveTo(visible[0].x, visible[0].y);
    for (var j = 1; j < visible.length - 1; j++) {
      var mx2 = (visible[j].x + visible[j + 1].x) / 2;
      var my2 = (visible[j].y + visible[j + 1].y) / 2;
      ctx.quadraticCurveTo(visible[j].x, visible[j].y, mx2, my2);
    }
    ctx.lineTo(visible[visible.length - 1].x, visible[visible.length - 1].y);
    ctx.strokeStyle = 'rgba(126,184,247,0.22)';
    ctx.lineWidth   = 1.8;
    ctx.lineJoin    = 'round';
    ctx.stroke();

    // Glowing dot at tip
    var tip = visible[visible.length - 1];
    ctx.beginPath();
    ctx.arc(tip.x, tip.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(126,184,247,0.5)';
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  function tick(ts) {
    if (!last) last = ts;
    var dt = Math.min((ts - last) / 1000, 0.05);
    last = ts;

    if (phase === 'fadein') {
      alpha  = Math.min(1, alpha + dt / FADE_DUR);
      phaseT += dt;
      if (alpha >= 1) { phase = 'drawing'; phaseT = 0; }
    } else if (phase === 'drawing') {
      progress = Math.min(1, phaseT / DRAW_DUR);
      phaseT  += dt;
      if (progress >= 1) { phase = 'hold'; phaseT = 0; }
    } else if (phase === 'hold') {
      phaseT += dt;
      if (phaseT >= HOLD_DUR) { phase = 'fadeout'; phaseT = 0; }
    } else if (phase === 'fadeout') {
      alpha  = Math.max(0, alpha - dt / FADE_DUR);
      phaseT += dt;
      if (alpha <= 0) { generate(); } // regenerate with fresh random path
    }

    draw();
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
})();
