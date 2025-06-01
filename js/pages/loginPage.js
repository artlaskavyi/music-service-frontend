(function() {
    function loadLoginPage() {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = window.templates.loginPage();

        const loginForm = document.getElementById('login-form');
        const errorMessageDiv = document.getElementById('login-error-message');

        if (loginForm) {
            loginForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                errorMessageDiv.style.display = 'none';

                const username = event.target.username.value;
                const password = event.target.password.value;

                if (!username || !password) {
                    errorMessageDiv.textContent = 'Username and password are required.';
                    errorMessageDiv.style.display = 'block';
                    return;
                }

                try {
                    const loginButton = loginForm.querySelector('button[type="submit"]');
                    loginButton.disabled = true;
                    loginButton.textContent = 'Logging in...';

                    await window.auth.login(username, password);
                    window.location.hash = '#/home';
                } catch (error) {
                    let message = 'Login failed. Please check your credentials.';
                    if (error.data && error.data.error) {
                        message = error.data.error;
                    } else if (error.message) {
                        message = error.message;
                    }
                    errorMessageDiv.textContent = message;
                    errorMessageDiv.style.display = 'block';
                } finally {
                    const loginButton = loginForm.querySelector('button[type="submit"]');
                    if (loginButton) {
                        loginButton.disabled = false;
                        loginButton.textContent = 'Login';
                    }
                }
            });
        }
    }
    window.pageRender.loginPage = loadLoginPage;
})();
