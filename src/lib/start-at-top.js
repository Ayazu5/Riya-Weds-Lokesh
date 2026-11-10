(() => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  if (window.location.hash) {
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  }
  const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  resetScroll();
  window.addEventListener("pageshow", resetScroll);
})();