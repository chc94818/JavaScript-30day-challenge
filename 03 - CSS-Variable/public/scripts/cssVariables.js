(function cssVariables() {
  const controlPanel = document.querySelector('.control-panel');
  if (!controlPanel) {
    return;
  }
  function handleUpdate(event) {
    const { nodeName, value, dataset: { unit= '' }, id } = event.target;
    if (nodeName === 'INPUT' && !!value) {
      const valueWithUnit = value + unit;
      document.documentElement.style.setProperty(`--${id}`, valueWithUnit);
    }
  }
  controlPanel.addEventListener('change', handleUpdate);
})();
