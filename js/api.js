window.api = {
    BASE_URL: 'http://localhost:8080',

    async request(endpoint, method, body = null, requiresAuth = false) {
        const url = `${this.BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
        };

        if (requiresAuth) {
            const credentials = window.auth ? window.auth.getCredentials() : null;
            if (credentials && credentials.username && credentials.password) {
                headers['Authorization'] = 'Basic ' + btoa(`${credentials.username}:${credentials.password}`);
            } else if (endpoint !== '/auth/login' && endpoint !== '/auth/signup') {
                const error = new Error('Authentication required. Please log in.');
                error.status = 401;
                throw error;
            }
        }

        const config = {
            method: method,
            headers: headers,
            credentials: 'include',
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, config);

            if (response.status === 204) {
                return {};
            }

            let responseData;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }

            if (!response.ok) {
                const message = (typeof responseData === 'object' && responseData !== null && (responseData.error || responseData.message))
                                ? responseData.error || responseData.message
                                : (typeof responseData === 'string' ? responseData : `HTTP error! status: ${response.status}`);
                const error = new Error(message);
                error.data = responseData;
                error.status = response.status;
                throw error;
            }
            return responseData;
        } catch (error) {
            if (error.data !== undefined && error.status !== undefined) throw error;
            const genericError = new Error(error.message || 'Network error or server is unreachable.');
            genericError.status = error.status || 0;
            throw genericError;
        }
    },

    get: function(endpoint, requiresAuth = false) {
        return this.request(endpoint, 'GET', null, requiresAuth);
    },
    post: function(endpoint, body, requiresAuth = false) {
        return this.request(endpoint, 'POST', body, requiresAuth);
    },
    put: function(endpoint, body, requiresAuth = true) {
        return this.request(endpoint, 'PUT', body, requiresAuth);
    },
    delete: function(endpoint, requiresAuth = true) {
        return this.request(endpoint, 'DELETE', null, requiresAuth);
    },
};
