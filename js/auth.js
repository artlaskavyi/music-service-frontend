window.auth = {
    STORAGE_KEY: 'musicServiceAuth',

    setCredentials(username, password, userInfo) {
        const authData = {
            username: username,
            password: password,
            user: userInfo,
        };
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(authData));
    },

    getCredentials() {
        const authData = sessionStorage.getItem(this.STORAGE_KEY);
        return authData ? JSON.parse(authData) : null;
    },

    clearCredentials() {
        sessionStorage.removeItem(this.STORAGE_KEY);
    },

    isAuthenticated() {
        return this.getCredentials() !== null;
    },

    getCurrentUser() {
        const credentials = this.getCredentials();
        return credentials ? credentials.user : null;
    },

    async login(username, password) {
        try {
            const userDTO = await window.api.post('/auth/login', { username, password }, false);
            this.setCredentials(username, password, userDTO);
            if (window.navigation) window.navigation.updateNav();
            return userDTO;
        } catch (error) {
            this.clearCredentials();
            throw error;
        }
    },

    async signup(userData) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userDTO = await window.api.post('/auth/signup', userData, false);
            return userDTO;
        } catch (error) {
            throw error;
        }
    },

    logout() {
        this.clearCredentials();
        if (window.navigation) window.navigation.updateNav();
        window.location.hash = '#/login';
    },

    async fetchCurrentUserFromServer() {
        if (!this.isAuthenticated()) {
            return null;
        }
        try {
            const userDTO = await window.api.get('/users/me', true);
            const currentAuth = this.getCredentials();
            if (currentAuth) {
                this.setCredentials(currentAuth.username, currentAuth.password, userDTO);
            }
            return userDTO;
        } catch (error) {
            if (error.status === 401 || error.status === 403) {
                this.logout();
            }
            return null;
        }
    }
};
