/* ══════════════════════════════════════════════════
   PIXCUT S1 GUIDE  ·  script.js
   ══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── STEP ACCORDION ─────────────────────────────── */
  const steps       = document.querySelectorAll('.step');
  const totalSteps  = steps.length;
  const progressFill = document.getElementById('progressFill');

  // Track which steps have been opened (seen)
  const seen = new Set();

  function updateProgress() {
    const pct = (seen.size / totalSteps) * 100;
    progressFill.style.width = pct + '%';
  }

  steps.forEach((step) => {
    const btn  = step.querySelector('.step__header');
    const num  = step.dataset.step;

    // Inject a check mark span into header
    const check = document.createElement('span');
    check.classList.add('step__check');
    check.textContent = '✓';
    btn.insertBefore(check, btn.querySelector('.step__arrow'));

    btn.addEventListener('click', () => {
      const isOpen = step.classList.contains('is-open');

      // Close all other steps (accordion behaviour)
      steps.forEach(s => {
        if (s !== step) {
          s.classList.remove('is-open');
          s.querySelector('.step__header').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle this step
      if (isOpen) {
        step.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        step.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');

        // Mark as seen → progress
        if (!seen.has(num)) {
          seen.add(num);
          updateProgress();
        }

        // After a beat, mark as done
        setTimeout(() => {
          step.classList.add('is-done');
        }, 600);

        // Smooth scroll step into view (with offset for small screens)
        setTimeout(() => {
          const offset = 80;
          const top = step.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 60);
      }
    });
  });

  /* ── OPEN FIRST STEP ON LOAD ────────────────────── */
  const firstBtn = steps[0]?.querySelector('.step__header');
  if (firstBtn) {
    setTimeout(() => firstBtn.click(), 500);
  }

  /* ── SCROLL-TRIGGERED REVEAL ────────────────────── */
  // Add .reveal class to sections
  const revealTargets = document.querySelectorAll(
    '.spec-card, .section-title, .section-sub, .faq-item'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 60) + 'ms';
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));

  /* ── HERO ENTRANCE ANIMATION ────────────────────── */
  const heroContent = document.querySelector('.hero__content');
  const heroBadges  = document.querySelector('.hero__badges');

  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(24px)';
    heroContent.style.transition = 'opacity .7s ease, transform .7s ease';
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 80);
    });
  }

  if (heroBadges) {
    heroBadges.style.opacity = '0';
    heroBadges.style.transition = 'opacity .6s ease .4s';
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroBadges.style.opacity = '1';
      }, 100);
    });
  }

  /* ── FAQ SMOOTH ANIMATION ───────────────────────── */
  // <details> elements animate open natively in most browsers,
  // but we can add a subtle class for the open state styling.
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      // nothing extra needed — CSS handles it
    });
  });

  /* ── KEYBOARD NAVIGATION FOR STEPS ─────────────── */
  steps.forEach((step, idx) => {
    const btn = step.querySelector('.step__header');
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextBtn = steps[idx + 1]?.querySelector('.step__header');
        if (nextBtn) nextBtn.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevBtn = steps[idx - 1]?.querySelector('.step__header');
        if (prevBtn) prevBtn.focus();
      }
    });
  });

  /* ── PRINT LAYER ANIMATION (trigger on step 6 open) */
  const step6 = document.querySelector('.step[data-step="6"]');
  if (step6) {
    const step6Btn = step6.querySelector('.step__header');
    step6Btn.addEventListener('click', () => {
      // layers animate via CSS animation-delay already
      // re-trigger by cloning nodes
      const layers = step6.querySelectorAll('.layer');
      layers.forEach(l => {
        l.style.animation = 'none';
        l.offsetHeight; // reflow
        l.style.animation = '';
      });
    });
  }

  /* ── PROGRESS LABEL ─────────────────────────────── */
  // Optionally show X/7 label — append after progress bar
  const progressTrack = document.querySelector('.progress-bar-track');
  if (progressTrack) {
    const label = document.createElement('p');
    label.id = 'progressLabel';
    label.style.cssText = `
      font-size: .75rem;
      color: var(--ink-soft);
      text-align: right;
      margin-top: .35rem;
      font-family: var(--font-body);
    `;
    label.textContent = `0 / ${totalSteps} steps explored`;
    progressTrack.insertAdjacentElement('afterend', label);

    // Update label on progress change
    const origUpdateProgress = updateProgress;
    window._updateProgressLabel = function () {
      origUpdateProgress();
      label.textContent = `${seen.size} / ${totalSteps} steps explored`;
    };

    // Override seen.add to also update label
    const origAdd = seen.add.bind(seen);
    seen.add = function (val) {
      origAdd(val);
      label.textContent = `${seen.size} / ${totalSteps} steps explored`;
    };
  }

});
