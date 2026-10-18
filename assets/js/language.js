/* Choose a locale before rendering; manual choices take precedence. */
(() => {
  const config = document.currentScript.dataset;
  const explicit = new URLSearchParams(window.location.search).get('lang');
  let preferred = explicit === 'en' || explicit === 'zh' ? explicit : null;
  if (preferred) {
    try { window.localStorage.setItem('preferred-language', preferred); } catch (_) {}
  }
  if (!preferred) {
    try { preferred = window.localStorage.getItem('preferred-language'); } catch (_) {}
  }
  if (preferred !== 'en' && preferred !== 'zh') {
    const languages = navigator.languages && navigator.languages.length
      ? navigator.languages : [navigator.language || 'en'];
    preferred = languages.map(language => language.toLowerCase().split(/[-_]/)[0])
      .find(language => language === 'en' || language === 'zh') || 'en';
  }
  if (preferred === config.locale) return;
  const destination = new URL(preferred === 'zh' ? config.zhUrl : config.enUrl, window.location.origin);
  destination.search = window.location.search;
  destination.hash = window.location.hash;
  if (destination.pathname !== window.location.pathname) window.location.replace(destination.href);
})();
