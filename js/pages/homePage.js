(function() {
    function loadHomePage() {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        const currentUser = window.auth ? window.auth.getCurrentUser() : null;
        const username = currentUser ? currentUser.username : null;

        appContent.innerHTML = window.templates.homePage(username);

        const searchForm = document.getElementById('searchForm');
        const searchResultsContainer = document.getElementById('search-results-container');

        if (searchForm && searchResultsContainer) {
            searchForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                const query = document.getElementById('searchInput').value.trim();
                if (!query) {
                    searchResultsContainer.innerHTML = '<p>Please enter a search term.</p>';
                    return;
                }

                searchResultsContainer.innerHTML = `<p>Searching for "${query}"...</p>`;

                try {
                    const results = await window.api.get(`/search?query=${encodeURIComponent(query)}`, true);
                    renderSearchResults(results, searchResultsContainer, query);
                } catch (error) {
                    console.error('Search failed:', error);
                    let message = 'Search failed. Please try again.';
                    if (error.status === 401 || error.status === 403 ) {
                        message = 'You must be logged in to search.';
                         window.location.hash = '#/login'; 
                    } else if (error.data && error.data.error) {
                        message = error.data.error;
                    } else if (error.message) {
                        message = error.message;
                    }
                    searchResultsContainer.innerHTML = `<p class="error-message">${message}</p>`;
                }
            });
        }
    }

    function renderSearchResults(results, container, query) {
        let html = `<h2 class="search-results-title">Search Results for "${query}"</h2>`;
        let foundResults = false;

        if (results.artists && results.artists.length > 0) {
            foundResults = true;
            html += '<h3>Artists</h3><div class="card-grid search-artist-grid">';
            results.artists.forEach(artist => {
                html += window.components.artistCard(artist);
            });
            html += '</div>';
        }

        if (results.albums && results.albums.length > 0) {
            foundResults = true;
            html += '<h3>Albums</h3><div class="card-grid search-album-grid">';
            results.albums.forEach(album => {
                html += window.components.albumCard(album);
            });
            html += '</div>';
        }

        if (results.songs && results.songs.length > 0) {
            foundResults = true;
            html += '<h3>Songs</h3><ul class="search-result-list search-song-list">';
            results.songs.forEach(song => {
                html += `<li class="search-result-item">
                            <strong class="track-title">${song.title || 'Unknown Song'}</strong>
                            ${song.artistName ? `<span class="artist-name"> by ${song.artistName}</span>` : (song.artist && song.artist.artistName ? `<span class="artist-name"> by ${song.artist.artistName}</span>` : '')}
                            ${song.albumTitle ? `<span class="album-title"> from ${song.albumTitle}</span>` : (song.album && song.album.title ? `<span class="album-title"> from ${song.album.title}</span>` : '')}
                            ${song.duration ? `<span class="track-duration"> (${song.duration})</span>` : ''}
                         </li>`;
            });
            html += '</ul>';
        }

        if (results.playlists && results.playlists.length > 0) {
            foundResults = true;
            html += '<h3>Playlists</h3><ul class="search-result-list search-playlist-list">';
            results.playlists.forEach(playlist => {
                html += `<li class="search-result-item">
                            <strong class="playlist-title">${playlist.name || 'Unknown Playlist'}</strong>
                            ${playlist.userName ? `<span class="user-owner"> by ${playlist.userName}</span>` : (playlist.user && playlist.user.username ? `<span class="user-owner"> by ${playlist.user.username}</span>` : '')}
                         </li>`;
            });
            html += '</ul>';
        }

        if (results.users) {
            const usersArray = Array.isArray(results.users) ? results.users : (results.users ? [results.users] : []);
            if (usersArray.length > 0) {
                foundResults = true;
                html += '<h3>Users</h3><ul class="search-result-list search-user-list">';
                usersArray.forEach(user => {
                    html += `<li class="search-result-item">
                                <a href="#/users/${user.userId}" class="user-link">${user.username}</a>
                                <span class="user-email"> (${user.email || 'No email'})</span>
                             </li>`;
                });
                html += '</ul>';
            }
        }

        if (!foundResults) {
            html += '<p>No results found for your query.</p>';
        }

        container.innerHTML = html;
    }

    window.pageRender.homePage = loadHomePage;
})();
