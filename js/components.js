window.components = {
    genreCard(genre) {
        return `
            <article class="genre-card card" data-genre-id="${genre.genreId}">
                <div class="card-content">
                    <h2 class="genre-card-title">${genre.genreName}</h2>
                    ${genre.description ? `<p class="genre-description">${genre.description}</p>` : ''}
                    <a href="#/genres/${genre.genreId}" class="button button-primary">Explore Genre</a>
                </div>
            </article>
        `;
    },

    artistCard(artist, isRelated = false) {
        const imageUrl = window.utils.generateImagePath('artist', artist.artistName);
        return `
            <article class="card artist-card" data-artist-id="${artist.artistId}">
                <img src="${imageUrl}" alt="${artist.artistName}" class="card-image" onerror="this.src='${window.utils.placeholderArtist}'">
                <div class="card-content">
                    <h3 class="card-title">${artist.artistName}</h3>
                    ${artist.genres && artist.genres.length > 0 ? `<p class="card-subtitle">${artist.genres[0].genreName}</p>` : ''}
                </div>
                <div class="card-actions">
                    <a href="#/artists/${artist.artistId}" class="button button-secondary">View Artist</a>
                </div>
            </article>
        `;
    },

    albumCard(album) {
        const coverImageUrl = window.utils.generateImagePath('album', album.title);
        return `
            <article class="card album-card" data-album-id="${album.albumId}">
                <img src="${coverImageUrl}" alt="${album.title}" class="card-image" onerror="this.src='${window.utils.placeholderAlbum}'">
                <div class="card-content">
                    <h3 class="card-title">${album.title}</h3>
                    ${album.artist ? `<p class="card-subtitle">${album.artist.artistName}</p>` : ''}
                    ${album.releaseYear ? `<p class="card-subtitle-small">${album.releaseYear}</p>` : ''}
                </div>
                <div class="card-actions">
                    <a href="#/albums/${album.albumId}" class="button button-secondary">View Album</a>
                </div>
            </article>
        `;
    },
};
