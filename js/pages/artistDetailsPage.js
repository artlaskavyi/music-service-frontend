(function() {
    async function loadArtistDetailsPage(artistId) {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = `<div class="container"><p>Loading artist details for ID: ${artistId}...</p></div>`;

        try {
            // Corrected endpoint to /artists/{id} (plural)
            const artist = await window.api.get(`/artists/${artistId}`, true); 
            
            // This endpoint seems correct based on your AlbumController: /albums?artistId={id}
            const albums = await window.api.get(`/albums?artistId=${artistId}`, true);

            let countryName = 'N/A';
            if (artist.countryId) {
                try {
                    const country = await window.api.get(`/countries/${artist.countryId}`, true);
                    countryName = country.countryName;
                } catch (countryError) {
                    console.error(`Failed to fetch country details for ID ${artist.countryId}:`, countryError);
                    // Keep countryName as 'N/A' or some error indicator if preferred
                }
            }
            
            appContent.innerHTML = window.templates.artistDetailsPage(artist, albums, countryName);

        } catch (error) {
            let message = `Could not load artist details. Please try again.`;
            if (error.status === 401 || error.status === 403) {
                message = "You are not authorized to view these details. Please log in.";
                 window.location.hash = '#/login';
            } else if (error.status === 404) {
                // This could be for /artists/{id} or /albums?artistId={id} or /countries/{id}
                message = `Artist details, albums, or country not found for ID ${artistId}. Check backend endpoints and data. Endpoint tried: /artists/${artistId}`;
            } else if (error.message) {
                message = error.message;
            }
            appContent.innerHTML = `<div class="container error-message"><p>${message}</p></div>`;
        }
    }
    window.pageRender.artistDetailsPage = loadArtistDetailsPage;
})();
