const appContent = document.getElementById('app-content');

const routes = {
    '/': 'homePage',
    '/home': 'homePage',
    '/login': 'loginPage',
    '/signup': 'signupPage',
    '/genres': 'genreExplorerPage',
    '/genres/:id': 'genreDetailsPage',
    '/artists': 'artistListPage',
    '/artists/:id': 'artistDetailsPage',
    '/albums/:id': 'albumDetailsPage',
    '/users': 'usersPage',
    '/users/create': 'createUserPage',
    '/users/:id': 'userDetailsPage',
    '/users/:id/edit': 'editUserPage',
};

const protectedRoutesBase = ['/users', '/profile', '/genres', '/artists', '/albums', '/search'];

function router() {
    const path = window.location.hash.slice(1) || '/';
    if (!appContent) {
        console.error("Main content area 'app-content' not found!");
        return;
    }
    appContent.innerHTML = '<div class="container"><p>Loading...</p></div>';

    const requiresAuth = protectedRoutesBase.some(protectedRouteBase => {
        if (path === protectedRouteBase) return true;
        if (path.startsWith(protectedRouteBase + '/') && protectedRouteBase !== '/') return true;
        return false;
    });

    const isAdminRoute = path.startsWith('/users');

    if (requiresAuth && (!window.auth || !window.auth.isAuthenticated())) {
        console.log('Route requires authentication. Redirecting to login.');
        window.location.hash = '#/login';
        return;
    }

    if (isAdminRoute) {
        const currentUser = window.auth ? window.auth.getCurrentUser() : null;
        const isActuallyAdmin = currentUser && currentUser.roles && currentUser.roles.some(role => role === 'ROLE_ADMIN');
        if (!isActuallyAdmin) {
            console.log('Route requires admin privileges. Displaying error/redirecting.');
            appContent.innerHTML = window.templates ? window.templates.notFoundPage() : '<p>Access Denied. Admin role required.</p>';
            return;
        }
    }

    let foundRouteHandlerKey = null;
    let params = [];

    for (const routePattern in routes) {
        const regex = new RegExp(`^${routePattern.replace(/:\w+/g, '([^/]+)')}$`);
        const match = path.match(regex);

        if (match) {
            foundRouteHandlerKey = routes[routePattern];
            params = match.slice(1);
            break;
        }
    }

    if (foundRouteHandlerKey && window.pageRender && typeof window.pageRender[foundRouteHandlerKey] === 'function') {
        try {
            window.pageRender[foundRouteHandlerKey](...params);
        } catch (err) {
            console.error(`Error rendering page for ${path}:`, err);
            appContent.innerHTML = `<div class="container error-message">Error loading page: ${err.message || 'Unknown error'}. Check console for details.</div>`;
        }
    } else {
        console.log(`No route handler found for ${path} or pageRender.${foundRouteHandlerKey} is not a function. Displaying 404.`);
        if (window.pageRender && typeof window.pageRender.notFoundPage === 'function') {
            window.pageRender.notFoundPage();
        } else if (window.templates && typeof window.templates.notFoundPage === 'function') {
            appContent.innerHTML = window.templates.notFoundPage();
        } else {
            appContent.innerHTML = '<div class="container"><h1>404 - Page Not Found</h1></div>';
        }
    }
    if (window.navigation) window.navigation.setActiveLink();
}

document.addEventListener('DOMContentLoaded', () => {
    if (!window.pageRender) {
        console.warn('window.pageRender was not initialized before DOMContentLoaded. Initializing now.');
        window.pageRender = {};
    }

    if (window.navigation) window.navigation.updateNav();
    router();

    window.addEventListener('hashchange', router);

    if (window.auth && window.auth.isAuthenticated()) {
        window.auth.fetchCurrentUserFromServer().then(user => {
            if (user) {
                console.log('User session verified on load:', user.username);
                if (window.navigation) window.navigation.updateNav();
                router();
            } else {
                console.log('User session could not be verified or expired on load.');
            }
        }).catch(err => {
           console.error('Error verifying user session on load:', err.message || err);
        });
    }
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
    if (appContent) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'container error-message global-error';
        errorDiv.style.marginTop = '1em';
        errorDiv.style.padding = '1em';
        errorDiv.style.border = '1px solid red';
        errorDiv.textContent = `An unexpected error occurred: ${event.reason && event.reason.message ? event.reason.message : 'Unknown error'}. Please try refreshing the page or check the console.`;
    }
});
