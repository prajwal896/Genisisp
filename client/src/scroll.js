// Smooth-scroll to a section on the landing page. Returns false if the section isn't on this page.
export function scrollToId(id) {
  if (id === 'home') {
    if (window.location.pathname !== '/') return false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', '/');
    return true;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `/#${id}`);
  return true;
}
