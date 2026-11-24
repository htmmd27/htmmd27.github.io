function renderSiteMath(element) {
  if (!element || typeof renderMathInElement !== 'function') return;
  renderMathInElement(element, {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ],
    throwOnError: false,
    trust: false,
    ignoredClasses: ['katex']
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSiteMath(document.querySelector('#pbr-lab') || document.querySelector('.post-content'));
});
