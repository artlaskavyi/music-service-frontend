(function() {
    async function loadArtistListPage() {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = window.templates.artistListPage([]);

        try {
            const artists = await window.api.get('/artists', true);
            appContent.innerHTML = window.templates.artistListPage(artists);
        } catch (error) {
            let message = "Could not load artists. Please try again later.";
            if (error.status === 401 || error.status === 403) {
                message = "You are not authorized to view artists. Please log in.";
            } else if (error.message) {
                message = error.message;
            }
            appContent.innerHTML = `<div class="container error-message"><p>${message}</p></div>`;
        }
    }
    window.pageRender.artistListPage = loadArtistListPage;
})();
