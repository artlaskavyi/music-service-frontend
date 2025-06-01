(function() {
    function loadSignupPage() {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = window.templates.signupPage();

        const signupForm = document.getElementById('signup-form');
        const errorMessageDiv = document.getElementById('signup-error-message');
        const successMessageDiv = document.getElementById('signup-success-message');

        if (signupForm) {
            signupForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                errorMessageDiv.style.display = 'none';
                successMessageDiv.style.display = 'none';

                const username = event.target.username.value;
                const email = event.target.email.value;
                const password = event.target.userPassword.value;
                const passwordConfirm = event.target.passwordcon.value;

                if (password !== passwordConfirm) {
                    errorMessageDiv.textContent = 'Passwords do not match.';
                    errorMessageDiv.style.display = 'block';
                    return;
                }

                const userData = {
                    username: username,
                    email: email,
                    userPassword: password
                };

                try {
                    const signupButton = signupForm.querySelector('button[type="submit"]');
                    signupButton.disabled = true;
                    signupButton.textContent = 'Signing up...';

                    await window.auth.signup(userData);
                    successMessageDiv.textContent = 'Signup successful! You can now log in.';
                    successMessageDiv.style.display = 'block';
                    signupForm.reset();
                    setTimeout(() => {
                        window.location.hash = '#/login';
                    }, 2000);

                } catch (error) {
                     let message = 'Signup failed. Please try again.';
                    if (error.data && error.data.error) {
                        message = error.data.error;
                    } else if (error.message) {
                        message = error.message;
                    }
                    errorMessageDiv.textContent = message;
                    errorMessageDiv.style.display = 'block';
                } finally {
                    const signupButton = signupForm.querySelector('button[type="submit"]');
                     if(signupButton) {
                        signupButton.disabled = false;
                        signupButton.textContent = 'Sign Up';
                     }
                }
            });
        }
    }
    window.pageRender.signupPage = loadSignupPage;
})();
