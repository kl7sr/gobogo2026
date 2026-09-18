/**
 * GOBOGO Algérie - Dynamic Off-Screen Beam & Clean Optical Engine
 */

;(function () {
  'use strict';

  // ─── DOM Elements ──────────────────────────────────────────────────────────
  const heroStage      = document.getElementById('heroStage');
  const logoDiscAnchor = document.getElementById('logoDiscAnchor');
  const goboBadgeDisc  = document.getElementById('goboBadgeDisc');
  const spinningBadge  = document.getElementById('spinningBadge');
  const logoFileInput  = document.getElementById('logoFileInput');
  const uploadBtnText  = document.getElementById('uploadBtnText');
  const ctaCommander   = document.getElementById('cta-commander');

  // ─── 1. Dynamic Off-Screen Beam Engine ─────────────────────────────────────
  function updateBeamGeometry() {
    if (!heroStage || !logoDiscAnchor) return;

    const rStage = heroStage.getBoundingClientRect();
    const rLogo  = logoDiscAnchor.getBoundingClientRect();

    const stageW = rStage.width;
    const stageH = rStage.height;

    // Target: Exact center of projected logo disc relative to heroStage
    const x2 = (rLogo.left + rLogo.right) / 2 - rStage.left;
    const y2 = (rLogo.top  + rLogo.bottom) / 2 - rStage.top;
    const logoDiameter = rLogo.width || 210;

    // Origin: Off-screen to the left so pure volumetric light streams in seamlessly
    const x1 = stageW >= 768 ? -50 : -35;
    let y1;
    const isPortrait = stageH > stageW;

    if (stageW >= 1024) {
      y1 = Math.round(stageH * 0.80);
    } else if (stageW >= 768 && !isPortrait) {
      y1 = Math.round(stageH * 0.84);
    } else {
      // Mobile: lower portion off-screen
      y1 = Math.round(stageH * 0.88);
    }

    // Glow position: nudged a tiny bit to the top to align with the upward-slanted beam cone
    const glowY1 = Math.round(y1 - 32);

    const dx       = x2 - x1;
    const dy       = y2 - y1;
    const length   = Math.hypot(dx, dy);
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);

    // Feed dynamic geometric variables to CSS
    heroStage.style.setProperty('--beam-x1',         `${Math.round(x1)}px`);
    heroStage.style.setProperty('--beam-y1',         `${Math.round(y1)}px`);
    heroStage.style.setProperty('--glow-y1',         `${Math.round(glowY1)}px`);
    heroStage.style.setProperty('--beam-length',     `${Math.round(length)}px`);
    heroStage.style.setProperty('--beam-angle',      `${angleDeg.toFixed(2)}deg`);
    heroStage.style.setProperty('--beam-end-height', `${Math.round(logoDiameter * 1.06)}px`);
  }

  // ─── 2. Direct Picture Upload ──────────────────────────────────────────────
  function applyUploadedImage(dataUrl) {
    if (!goboBadgeDisc) return;

    goboBadgeDisc.innerHTML = `
      <div class="custom-uploaded-badge-wrapper">
        <img src="${dataUrl}" alt="Photo de logo importée" class="custom-badge-img">
        <div class="custom-badge-outer-glow"></div>
      </div>
    `;

    // Update WhatsApp link with customized message
    const text = encodeURIComponent("Bonjour GOBOGO, je viens d'importer mon logo sur votre site et je souhaite commander mon projecteur GOBO personnalisé !");
    if (ctaCommander) {
      ctaCommander.href = `https://wa.me/213549153751?text=${text}`;
    }
  }

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      applyUploadedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  // File input change
  if (logoFileInput) {
    logoFileInput.addEventListener('change', function (e) {
      const file = e.target.files && e.target.files[0];
      handleFile(file);
    });
  }

  // Clicking spinning badge triggers file picker
  if (spinningBadge && logoFileInput) {
    spinningBadge.addEventListener('click', function () {
      logoFileInput.click();
    });
    spinningBadge.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        logoFileInput.click();
      }
    });
  }

  // Drag and drop onto stage
  if (heroStage) {
    heroStage.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    heroStage.addEventListener('drop', function (e) {
      e.preventDefault();
      const dt = e.dataTransfer;
      const file = dt && dt.files && dt.files[0];
      handleFile(file);
    });
  }

  // ─── 3. Layout & Resize Observers ──────────────────────────────────────────
  window.addEventListener('resize',            updateBeamGeometry, { passive: true });
  window.addEventListener('orientationchange', updateBeamGeometry, { passive: true });
  window.addEventListener('load',              updateBeamGeometry, { passive: true });

  if (window.ResizeObserver && heroStage) {
    new ResizeObserver(updateBeamGeometry).observe(heroStage);
  }

  // ─── 4. Cinematic Projector Ignition Sequence & Session Recall ────────────
  function igniteProjector() {
    updateBeamGeometry();
    const hasRevealed = sessionStorage.getItem('gobogo_revealed');

    if (hasRevealed) {
      document.documentElement.classList.add('no-reveal');
      document.body.classList.add('projector-ignited');
      updateBeamGeometry();
    } else {
      sessionStorage.setItem('gobogo_revealed', 'true');
      requestAnimationFrame(() => {
        updateBeamGeometry();
        setTimeout(() => {
          document.body.classList.add('projector-ignited');
        }, 200);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', igniteProjector);
  } else {
    igniteProjector();
  }

  setTimeout(updateBeamGeometry, 300);
  setTimeout(updateBeamGeometry, 800);
  setTimeout(updateBeamGeometry, 1500);

})();
