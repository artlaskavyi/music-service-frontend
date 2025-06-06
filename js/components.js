window.components = {
    genreCard(genre) {
        return `
            <article class="genre-card card" data-genre-id="${genre.genreId}">
                <div class="card-content">
                    <h2 class="genre-card-title">${genre.genreName}</h2>
                    <a href="#/genres/${genre.genreId}" class="button button-primary">Explore Genre</a>
                </div>
            </article>
        `;
    },

    artistCard(artist) {
        const imageUrl = window.utils.generateImagePath('artist', artist.artistName);
        return `
            <article class="card artist-card" data-artist-id="${artist.artistId}">
                <img src="${imageUrl}" alt="${artist.artistName}" class="card-image" onerror="this.src='${window.utils.placeholderArtist}'">
                <div class="card-content">
                    <h3 class="card-title">${artist.artistName}</h3>
                </div>
                <div class="card-actions">
                    <a href="#/artists/${artist.artistId}" class="button button-secondary">View Artist</a>
                </div>
            </article>
        `;
    },

    albumCard(album, artistNameFromContext = null) {
        const coverImageUrl = window.utils.generateImagePath('album', album.title);
        let artistDisplay = '';
        if (artistNameFromContext) {
            artistDisplay = `<p class="card-subtitle">${artistNameFromContext}</p>`;
        } else if (album.artist && album.artist.artistName) {
            artistDisplay = `<p class="card-subtitle">${album.artist.artistName}</p>`;
        } else if (album.artistName) {
             artistDisplay = `<p class="card-subtitle">${album.artistName}</p>`;
        }

        return `
            <article class="card album-card" data-album-id="${album.albumId}">
                <img src="${coverImageUrl}" alt="${album.title}" class="card-image" onerror="this.src='${window.utils.placeholderAlbum}'">
                <div class="card-content">
                    <h3 class="card-title">${album.title}</h3>
                    ${artistDisplay}
                    ${album.releaseYear ? `<p class="card-subtitle-small">${album.releaseYear}</p>` : ''}
                </div>
                <div class="card-actions">
                    <a href="#/albums/${album.albumId}" class="button button-secondary">View Album</a>
                </div>
            </article>
        `;
    },
};
