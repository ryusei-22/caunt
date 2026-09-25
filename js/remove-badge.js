// Netlify バッジを非表示にする
(function () {
  function removeBadge() {
    document.querySelectorAll('body *').forEach(function (el) {
      try {
        var href = el.getAttribute('href') || '';
        var text = (el.textContent || '').toLowerCase();
        var isNetlify =
          href.toLowerCase().includes('netlify') ||
          text.includes('powered by netlify');

        if (!isNetlify) return;

        // 要素自身が fixed かチェック
        var cs = getComputedStyle(el);
        if (cs.position === 'fixed' || cs.position === 'sticky') {
          el.style.setProperty('display', 'none', 'important');
          return;
        }

        // 親要素が fixed かチェック（最大5階層）
        var parent = el.parentElement;
        var depth = 0;
        while (parent && parent !== document.body && depth < 5) {
          var ps = getComputedStyle(parent);
          if (ps.position === 'fixed' || ps.position === 'sticky') {
            parent.style.setProperty('display', 'none', 'important');
            return;
          }
          parent = parent.parentElement;
          depth++;
        }
      } catch (e) {}
    });
  }

  // 即時・遅延・定期的に実行
  removeBadge();
  [100, 500, 1000, 2000, 3000].forEach(function (ms) {
    setTimeout(removeBadge, ms);
  });

  // DOM変化を監視
  new MutationObserver(removeBadge).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
