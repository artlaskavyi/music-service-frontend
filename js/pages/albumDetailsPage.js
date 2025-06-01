(function() {
    async function loadAlbumDetailsPage(albumId) {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = `<div class="container"><p>Loading album details for ID: ${albumId}...</p></div>`;

        try {
            const album = await window.api.get(`/albums/${albumId}`, true);
            const songs = await window.api.get(`/songs/album/${albumId}`, true);
            const albumPageData = {
                album: album,
                songs: songs,
                genres: album.genres || []
            };
            appContent.innerHTML = window.templates.albumDetailsPage(albumPageData);
        } catch (error) {
            let message = `Could not load album details. Please try again.`;
             if (error.status === 401 || error.status === 403) {
                message = "You are not authorized to view these details. Please log in.";
            } else if (error.message) {
                message = error.message;
            }
            appContent.innerHTML = `<div class="container error-message"><p>${message}</p></div>`;
        }
    }
    window.pageRender.albumDetailsPage = loadAlbumDetailsPage;
})();
