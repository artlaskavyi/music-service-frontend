(function() {
    function loadNotFoundPage() {
        const appContent = document.getElementById('app-content');
        if (!appContent) {
            return;
        }
        appContent.innerHTML = window.templates.notFoundPage();
    }
    window.pageRender.notFoundPage = loadNotFoundPage;
})();
