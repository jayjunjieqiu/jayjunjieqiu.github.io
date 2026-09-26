(() => {
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

  document.querySelectorAll('.figure-zoom').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      const image = link.querySelector('img');
      enlargedImage.src = link.href;
      enlargedImage.alt = image.alt;
      dialog.setAttribute('aria-label', image.alt);
      dialog.showModal();
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
