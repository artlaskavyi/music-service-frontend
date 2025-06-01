(function() {
    async function loadArtistDetailsPage(artistId) {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = `<div class="container"><p>Loading artist details for ID: ${artistId}...</p></div>`;

        try {
            const artist = await window.api.get(`/artists/${artistId}`, true);
            const albums = await window.api.get(`/albums/artist/${artistId}`, true);
            appContent.innerHTML = window.templates.artistDetailsPage(artist, albums);
        } catch (error) {
            let message = `Could not load artist details. Please try again.`;
            if (error.status === 401 || error.status === 403) {
                message = "You are not authorized to view these details. Please log in.";
                 window.location.hash = '#/login';
            } else if (error.message) {
                message = error.message;
            } else if (error.status === 404) {
                message = `Artist with ID ${artistId} not found.`;
            }
            appContent.innerHTML = `<div class="container error-message"><p>${message}</p></div>`;
        }
    }
    window.pageRender.artistDetailsPage = loadArtistDetailsPage;
})();
