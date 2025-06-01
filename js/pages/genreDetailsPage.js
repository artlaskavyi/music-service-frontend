(function() {
    async function loadGenreDetailsPage(genreId) {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = `<div class="container"><p>Loading genre details for ID: ${genreId}...</p></div>`;

        try {
            const genre = await window.api.get(`/genres/${genreId}`, true);
            const albums = await window.api.get(`/albums/genre/${genreId}`, true);

            let genreDetailsHTML = `
                <div class="container">
                    <nav class="breadcrumbs" aria-label="breadcrumb">
                        <ol>
                            <li class="breadcrumb-item"><a href="#/home">Home</a></li>
                            <li class="breadcrumb-item"><a href="#/genres">Genres</a></li>
                            <li class="breadcrumb-item active" aria-current="page">${genre.genreName}</li>
                        </ol>
                    </nav>
                    <section class="genre-details-section section">
                        <header class="page-header">
                            <h1>${genre.genreName}</h1>
                        </header>
                        <div class="albums-in-genre-section">
                            <h3>Popular Albums in ${genre.genreName}</h3>
                            <div class="card-grid">
                                ${albums.length > 0 ? albums.map(album => window.components.albumCard(album)).join('') : `<p>No albums found for ${genre.genreName}.</p>`}
                            </div>
                        </div>
                    </section>
                </div>
            `;
            appContent.innerHTML = genreDetailsHTML;

        } catch (error) {
            let message = `Could not load details for genre. Please try again.`;
             if (error.status === 401 || error.status === 403) {
                message = "You are not authorized to view these details. Please log in.";
            } else if (error.message) {
                message = error.message;
            }
            appContent.innerHTML = `<div class="container error-message"><p>${message}</p></div>`;
        }
    }
    window.pageRender.genreDetailsPage = loadGenreDetailsPage;
})();
