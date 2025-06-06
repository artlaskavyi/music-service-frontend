window.templates = {
    loginPage() {
        return `
            <div class="login-page-container">
                <main class="main-content">
                    <div class="container">
                        <form id="login-form" class="auth-form">
                            <h1 class="auth-form-title">Login</h1>
                            <div id="login-error-message" class="error-message" style="display:none;"></div>
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" required placeholder="Enter your username">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" required placeholder="Enter your password">
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="button button-primary">Login</button>
                            </div>
                            <p class="alternative-action-link">Don't have an account? <a href="#/signup">Sign up here</a></p>
                        </form>
                    </div>
                </main>
            </div>
        `;
    },

    signupPage() {
        return `
            <div class="signup-page-container">
                <main class="main-content">
                    <div class="container">
                        <form id="signup-form" class="auth-form">
                            <h1 class="auth-form-title">Create Account</h1>
                            <div id="signup-error-message" class="error-message" style="display:none;"></div>
                            <div id="signup-success-message" class="success-message" style="display:none;"></div>
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" required placeholder="Choose a username">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required placeholder="your-email@example.com">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="userPassword" required placeholder="Create a strong password">
                            </div>
                            <div class="form-group">
                                <label for="passwordcon">Confirm Password</label>
                                <input type="password" id="passwordcon" name="passwordcon" required placeholder="Confirm your password">
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="button button-primary">Sign Up</button>
                            </div>
                            <p class="alternative-action-link">Already have an account? <a href="#/login">Log in here</a></p>
                        </form>
                    </div>
                </main>
            </div>
        `;
    },

    homePage(username) {
        const welcomeMessage = username ? `Welcome back, ${username}!` : 'Welcome to MusicService!';
        return `
            <div class="container">
                <section class="welcome-section">
                    <h3>${welcomeMessage}</h3>
                    <h5>Discover new music, create playlists, and rate your favorite tracks.</h5>
                </section>
                <section class="hero-section">
                    <h1>Your music, your way</h1>
                    <div class="gif-container">
                        <img src="assets/gifs/mygif.webp" alt="Music GIF" id="musicGif" onerror="this.style.display='none'">
                    </div>
                </section>
                <section class="search-section">
                    <h2>Search for Music</h2>
                    <form id="searchForm">
                        <input type="text" id="searchInput" name="query" placeholder="Search for albums, artists..." required>
                        <button type="submit" id="searchButton" class="button button-primary">Search</button>
                    </form>
                    <div id="search-results-container"></div>
                </section>
            </div>
        `;
    },

    genreExplorerPage(genres = []) {
        return `
            <div class="container">
                <section class="genre-explorer-page section">
                    <header class="page-header">
                        <h1>Explore Music Genres</h1>
                    </header>
                    <div id="genre-list-container" class="genre-list card-grid">
                        ${genres.length > 0 ? genres.map(genre => window.components.genreCard(genre)).join('') : '<p>Loading genres...</p>'}
                    </div>
                    <div id="selected-genre-details" class="section" style="display: none;">
                    </div>
                </section>
            </div>
        `;
    },

    artistListPage(artists = []) {
        return `
            <div class="container">
                <nav class="breadcrumbs" aria-label="breadcrumb">
                    <ol>
                        <li class="breadcrumb-item"><a href="#/home">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Artists</li>
                    </ol>
                </nav>
                <section class="artist-list-page section">
                    <header class="page-header">
                        <h1>All Artists</h1>
                    </header>
                    <div id="artist-list-container" class="card-grid">
                        ${artists.length > 0 ? artists.map(artist => window.components.artistCard(artist)).join('') : '<p>Loading artists...</p>'}
                    </div>
                </section>
            </div>
        `;
    },

    artistDetailsPage(artist, albums = [], countryName = 'N/A') {
        if (!artist) return '<p>Artist not found.</p>';
        const artistImageUrl = window.utils.generateImagePath('artist', artist.artistName);
        return `
            <div class="container">
                <nav class="breadcrumbs" aria-label="breadcrumb">
                    <ol>
                        <li class="breadcrumb-item"><a href="#/home">Home</a></li>
                        <li class="breadcrumb-item"><a href="#/artists">Artists</a></li>
                        <li class="breadcrumb-item active" aria-current="page">${artist.artistName || 'Artist Details'}</li>
                    </ol>
                </nav>
                <article class="artist-profile-page section">
                    <section class="artist-section">
                        <header class="artist-header">
                            <img src="${artistImageUrl}" alt="${artist.artistName}" class="artist-avatar-xl" onerror="this.src='${window.utils.placeholderArtist}'">
                            <div class="artist-info-main">
                                <h1 class="artist-name-large">${artist.artistName}</h1>
                                <p class="artist-meta-info">
                                    <span class="artist-origin" id="artist-country-name">Country: ${countryName}</span> •
                                    <span class="artist-active-years">Active since ${artist.yearOfCreation || 'N/A'}</span>
                                </p>
                            </div>
                        </header>
                        <section class="artist-discography">
                            <h2>Discography</h2>
                            <div class="card-grid">
                                ${albums.length > 0 ? albums.map(album => window.components.albumCard(album, artist.artistName)).join('') : '<p>No albums found for this artist.</p>'}
                            </div>
                        </section>
                    </section>
                </article>
            </div>
        `;
    },

    albumDetailsPage(albumData) {
        if (!albumData || !albumData.album) return '<p>Album not found.</p>';
        const { album, songs = [], genres = [] } = albumData;
        const artist = album.artist;
        const coverImageUrl = window.utils.generateImagePath('album', album.title);
        const artistNameForCard = (artist && artist.artistName) ? artist.artistName : null;

        return `
            <div class="container">
                <nav class="breadcrumbs" aria-label="breadcrumb">
                    <ol>
                        <li class="breadcrumb-item"><a href="#/home">Home</a></li>
                        ${artistNameForCard ? `<li class="breadcrumb-item"><a href="#/artists/${album.artistId}">${artistNameForCard}</a></li>` : ''}
                        <li class="breadcrumb-item active" aria-current="page">${album.title}</li>
                    </ol>
                </nav>
                <article class="album-details-page section">
                    <header class="album-header">
                        <div class="album-cover-art-large">
                            <img src="${coverImageUrl}" alt="Album Cover: ${album.title}" onerror="this.src='${window.utils.placeholderAlbum}'">
                        </div>
                        <div class="album-info">
                            <h1 class="album-title">${album.title}</h1>
                            ${artistNameForCard ? `<h2 class="artist-name"><a href="#/artists/${album.artistId}">${artistNameForCard}</a></h2>` : '<h2 class="artist-name">Unknown Artist</h2>'}
                            <p class="album-meta">
                                <span class="release-year">${album.releaseYear}</span> •
                                <span class="genre-tags">${genres.map(g => `<a href="#/genres/${g.genreId}">${g.genreName}</a>`).join(', ')}</span> •
                                <span class="track-count">${songs.length} tracks</span>
                            </p>
                            <div class="album-actions">
                                <button class="button button-primary"><i class="icon-play"></i> Play album</button>
                                <button class="button button-secondary"><i class="icon-add-playlist"></i> Add to playlist</button>
                            </div>
                        </div>
                    </header>
                    <section class="track-list-section">
                        <h3>Tracklist</h3>
                        <ol class="track-list">
                            ${songs.map((song, index) => `
                                <li class="track-item">
                                    <span class="track-number">${index + 1}.</span>
                                    <span class="track-title">${song.title}</span>
                                    <span class="track-duration">${song.songLength || 'N/A'}</span>
                                </li>
                            `).join('')}
                        </ol>
                    </section>
                </article>
            </div>
        `;
    },

    usersPage(users = []) {
        return `
            <div class="container">
                <section class="users-section">
                    <div class="section-header">
                        <h1>User Management</h1>
                        <a href="#/users/create" class="button button-primary">Create New User</a>
                    </div>
                    <div id="user-message-area" class="message-area" style="margin-bottom: 1em;"></div>
                    <div class="user-list-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role(s)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${users.map(user => `
                                    <tr>
                                        <td>${user.username}</td>
                                        <td>${user.email}</td>
                                        <td><span class="user-role ${user.roles && user.roles.includes('ROLE_ADMIN') ? 'admin' : 'regular'}">${user.roles ? user.roles.map(r => r.replace('ROLE_', '')).join(', ') : 'N/A'}</span></td>
                                        <td>
                                            <a href="#/users/${user.userId}" class="button button-icon" aria-label="view user"><i class="icon-eye"></i> View</a>
                                            <a href="#/users/${user.userId}/edit" class="button button-icon" aria-label="edit user"><i class="icon-edit"></i> Edit</a>
                                            <button data-user-id="${user.userId}" class="button button-icon button-danger delete-user-btn" aria-label="delete user"><i class="icon-delete"></i> Delete</button>
                                        </td>
                                    </tr>
                                `).join('')}
                                ${users.length === 0 ? '<tr><td colspan="4">No users found.</td></tr>' : ''}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        `;
    },
    userDetailsPage(user) {
        if (!user) return '<p>User not found.</p>';
        return `
        <div class="container">
            <nav class="breadcrumbs" aria-label="breadcrumb">
                <ol>
                    <li class="breadcrumb-item"><a href="#/home">Home</a></li>
                    <li class="breadcrumb-item"><a href="#/users">Users</a></li>
                    <li class="breadcrumb-item active" aria-current="page">User Details</li>
                </ol>
            </nav>
            <section class="user-details-section section">
                <div class="section-header">
                    <div class="user-avatar-large" aria-label="User Avatar">${user.username ? user.username.substring(0,2).toUpperCase() : 'N/A'}</div>
                    <h1>User Profile: ${user.username}</h1>
                </div>
                <div id="user-detail-message-area" class="message-area" style="margin-bottom: 1em;"></div>
                <div class="detail-item">
                    <span class="detail-label">User ID:</span>
                    <span class="detail-value">${user.userId}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Username:</span>
                    <span class="detail-value">${user.username}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${user.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Role(s):</span>
                    <span class="detail-value"><span class="user-role ${user.roles && user.roles.includes('ROLE_ADMIN') ? 'admin' : 'regular'}">${user.roles ? user.roles.map(r => r.replace('ROLE_', '')).join(', ') : 'N/A'}</span></span>
                </div>
                <div class="actions-toolbar">
                    <a href="#/users/${user.userId}/edit" class="button button-primary">Edit User</a>
                    <button type="button" class="button button-danger" id="delete-user-button" data-user-id="${user.userId}">Delete User</button>
                </div>
            </section>
        </div>
        `;
    },

    editUserPage(user) {
        if (!user) return '<p>User not found for editing.</p>';
        return `
        <div class="container">
            <nav class="breadcrumbs" aria-label="breadcrumb">
                <ol>
                    <li class="breadcrumb-item"><a href="#/home">Home</a></li>
                    <li class="breadcrumb-item"><a href="#/users">Users</a></li>
                    <li class="breadcrumb-item"><a href="#/users/${user.userId}">User Details</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Edit User</li>
                </ol>
            </nav>
            <section class="edit-user-section section">
                <div class="section-header">
                    <h1>Edit User: ${user.username}</h1>
                </div>
                <form id="edit-user-form" class="edit-user-form">
                    <input type="hidden" id="edit-userId" name="userId" value="${user.userId}">
                    <div id="edit-user-error-message" class="error-message" style="display:none;"></div>
                    <div id="edit-user-success-message" class="success-message" style="display:none;"></div>
                    <div class="form-group">
                        <label for="edit-username">Username</label>
                        <input type="text" id="edit-username" name="username" value="${user.username}" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-email">Email</label>
                        <input type="email" id="edit-email" name="email" value="${user.email}" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-user-roles">Roles (comma-separated, e.g., USER,ADMIN)</label>
                        <input type="text" id="edit-user-roles" name="roles" value="${user.roles ? user.roles.map(r => r.replace('ROLE_', '')).join(',') : 'USER'}" required>
                    </div>
                    <fieldset class="password-change-fieldset">
                        <legend>Change Password (optional)</legend>
                        <div class="form-group">
                            <label for="edit-new-password">New Password</label>
                            <input type="password" id="edit-new-password" name="userPassword" placeholder="Leave blank to keep current password">
                        </div>
                        <div class="form-group">
                            <label for="edit-confirm-password">Confirm New Password</label>
                            <input type="password" id="edit-confirm-password" name="confirmPassword" placeholder="Confirm new password">
                        </div>
                    </fieldset>
                    <div class="form-actions">
                        <button type="submit" class="button button-primary">Save Changes</button>
                        <a href="#/users/${user.userId}" class="button button-secondary">Cancel</a>
                    </div>
                </form>
            </section>
        </div>
        `;
    },
    createUserPage() {
        return `
        <div class="container">
            <nav class="breadcrumbs" aria-label="breadcrumb">
                <ol>
                    <li class="breadcrumb-item"><a href="#/home">Home</a></li>
                    <li class="breadcrumb-item"><a href="#/users">Users</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Create User</li>
                </ol>
            </nav>
            <section class="create-user-section section">
                <div class="section-header">
                    <h1>Create New User</h1>
                </div>
                <form id="create-user-form" class="create-user-form">
                    <div id="create-user-error-message" class="error-message" style="display:none;"></div>
                    <div id="create-user-success-message" class="success-message" style="display:none;"></div>
                    <div class="form-group">
                        <label for="create-username">Username</label>
                        <input type="text" id="create-username" name="username" required>
                    </div>
                     <div class="form-group">
                        <label for="create-email">Email</label>
                        <input type="email" id="create-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="create-password">Password</label>
                        <input type="password" id="create-password" name="userPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="create-confirm-password">Confirm Password</label>
                        <input type="password" id="create-confirm-password" name="confirmPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="create-user-roles">Roles (comma-separated, e.g., USER,ADMIN)</label>
                        <input type="text" id="create-user-roles" name="roles" value="USER" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="button button-primary">Create User</button>
                        <a href="#/users" class="button button-secondary">Cancel</a>
                    </div>
                </form>
            </section>
        </div>
        `;
    },

    notFoundPage() {
        return `
            <div class="container text-center" style="padding-top: 50px; padding-bottom: 50px;">
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist or you do not have permission to view it.</p>
                <p><a href="#/home" class="button button-primary">Go to Homepage</a></p>
            </div>
        `;
    }
};
