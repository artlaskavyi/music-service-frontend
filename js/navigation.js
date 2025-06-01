window.navigation = {
    updateNav() {
        const navLinksContainer = document.getElementById('nav-links-container');
        if (!navLinksContainer) {
            return;
        }

        const isAuthenticated = window.auth ? window.auth.isAuthenticated() : false;
        const currentUser = window.auth ? window.auth.getCurrentUser() : null;
        const isAdmin = isAuthenticated && currentUser && currentUser.roles &&
                        currentUser.roles.some(role => role === 'ROLE_ADMIN');

        let navItemsHTML = `
            <li><a href="#/home" class="nav-link">Home</a></li>
            <li><a href="#/genres" class="nav-link">Genres</a></li>
            <li><a href="#/artists" class="nav-link">Artists</a></li>
        `;

        if (isAuthenticated) {
            if (isAdmin) {
                navItemsHTML += `<li><a href="#/users" class="nav-link">Users</a></li>`;
            }
            navItemsHTML += `<li><span class="nav-link nav-username">Hi, ${currentUser.username}</span></li>`;
            navItemsHTML += `<li><a href="#" id="logout-link" class="nav-link button button-outline">Logout</a></li>`;
        } else {
            navItemsHTML += `<li><a href="#/login" class="nav-link">Login</a></li>`;
            navItemsHTML += `<li><a href="#/signup" class="nav-link button button-primary">Sign Up</a></li>`;
        }

        navLinksContainer.innerHTML = navItemsHTML;

        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.auth) window.auth.logout();
            });
        }
        this.setActiveLink();
    },

    setActiveLink() {
        const currentHash = window.location.hash || '#/home';
        const navLinks = document.querySelectorAll('.main-navigation .nav-link');
        navLinks.forEach(link => {
            if (link.tagName === 'A') {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');
                if (linkHref === currentHash || (currentHash === '#/' && linkHref === '#/home')) {
                    link.classList.add('active');
                } else if (linkHref && currentHash.startsWith(linkHref) && linkHref !== '#/home' && linkHref !== '#/' && linkHref.length > 2) {
                     const pathSegments = currentHash.split('/');
                     const linkSegments = linkHref.split('/');
                     if (pathSegments.length > 1 && linkSegments.length > 1 && pathSegments[1] === linkSegments[1]) {
                        link.classList.add('active');
                     }
                }
            }
        });
    }
};
