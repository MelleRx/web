(() => {
    window.onload = () => {
        let perf = performance.getEntriesByType("navigation")[0];

        let nodeItem = document.createElement('p');
        const pageLoadTime = perf.loadEventStart - perf.loadEventEnd;

        nodeItem.innerHTML = `Время загрузки страницы <strong>${pageLoadTime.toFixed(2)} ms</strong>`;

        document.querySelector('footer').appendChild(nodeItem);
    };
} )();
