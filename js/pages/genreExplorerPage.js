(function() {
    async function loadGenreExplorerPage() {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = window.templates.genreExplorerPage([]);

        try {
            const genres = await window.api.get('/genres', true);
            appContent.innerHTML = window.templates.genreExplorerPage(genres);
        } catch (error) {
            let message = "Could not load genres. Please try again later.";
            if (error.status === 401 || error.status === 403) {
                message = "You are not authorized to view genres. Please log in.";
            } else if (error.message) {
                message = error.message;
            }
            appContent.innerHTML = `<div class="container error-message"><p>${message}</p></div>`;
        }
    }
    window.pageRender.genreExplorerPage = loadGenreExplorerPage;
})();
