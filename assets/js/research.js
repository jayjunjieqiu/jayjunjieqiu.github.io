(() => {
  const cvDialog = document.querySelector('.cv-dialog');
  const cvTrigger = document.querySelector('.cv-trigger');
  if (cvDialog && cvTrigger) {
    cvTrigger.addEventListener('click', () => cvDialog.showModal());
    cvDialog.querySelector('.cv-close').addEventListener('click', () => cvDialog.close());
    cvDialog.addEventListener('click', event => {
      if (event.target !== cvDialog) return;
      const box = cvDialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) cvDialog.close();
    });
    cvDialog.addEventListener('close', () => cvTrigger.focus({ preventScroll: true }));
  }
  const languageSwitch = document.querySelector('[data-language-switch]');
  if (languageSwitch) {
    const syncLanguageLink = () => {
      languageSwitch.hash = window.location.hash;
      languageSwitch.search = window.location.search;
      const destination = new URL(languageSwitch.href);
      destination.searchParams.set('lang', languageSwitch.lang.startsWith('zh') ? 'zh' : 'en');
      languageSwitch.href = destination.href;
    };
    syncLanguageLink();
    window.addEventListener('hashchange', syncLanguageLink);
    languageSwitch.addEventListener('click', () => {
      const language = languageSwitch.lang.startsWith('zh') ? 'zh' : 'en';
      try {
        window.localStorage.setItem('preferred-language', language);
      } catch (_) {
        // Keep manual switching usable when browser storage is unavailable.
        const destination = new URL(languageSwitch.href);
        destination.searchParams.set('lang', language);
        languageSwitch.href = destination.href;
      }
    });
  }

  const sections = document.querySelectorAll('main > section[id]');
  const links = document.querySelectorAll('nav [data-section]');

  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.dataset.section === entry.target.id) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-15% 0px -60% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  const dialog = document.querySelector('.figure-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const enlargedImage = dialog.querySelector('.figure-full');
  let trigger = null;
  let zoom = 1;
  const canvas = dialog.querySelector('.figure-canvas');
  const fit = () => {
    const ratio = enlargedImage.naturalWidth / enlargedImage.naturalHeight || 1;
    const availableHeight = Math.max(200, window.innerHeight * .9 - 90);
    const baseWidth = ratio >= 1 ? canvas.clientWidth : Math.min(canvas.clientWidth, availableHeight * ratio);
    enlargedImage.style.width = Math.round(baseWidth * zoom) + 'px';
  };
  enlargedImage.addEventListener('load', fit);
  window.addEventListener('resize', () => { if (dialog.open) fit(); });
  dialog.querySelectorAll('[data-figure-zoom]').forEach(button => button.addEventListener('click', () => {
    const action = button.dataset.figureZoom;
    zoom = action === 'fit' ? 1 : Math.max(.5, Math.min(4, zoom * (action === 'in' ? 1.4 : 1 / 1.4)));
    fit();
  }));

  document.querySelectorAll('.figure-zoom').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      const image = link.querySelector('img');
      zoom = 1;
      enlargedImage.src = link.href;
      enlargedImage.alt = image.alt;
      dialog.setAttribute('aria-label', image.alt);
      dialog.showModal();
      fit();
      canvas.scrollTo(0, 0);
      document.documentElement.classList.add('figure-open');
    });
  });

  dialog.querySelector('.figure-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) {
      dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('figure-open');
    if (trigger) trigger.focus({ preventScroll: true });
  });
})();
