// js/pages/createUserPage.js

(function() {
    /**
     * Renders the create new user page (Admin only).
     */
    function loadCreateUserPage() {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = window.templates.createUserPage();

        const createForm = document.getElementById('create-user-form');
        const errorMessageDiv = document.getElementById('create-user-error-message');
        const successMessageDiv = document.getElementById('create-user-success-message');

        if (createForm) {
            createForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                errorMessageDiv.style.display = 'none';
                successMessageDiv.style.display = 'none';

                const username = document.getElementById('create-username').value;
                const email = document.getElementById('create-email').value;
                const password = document.getElementById('create-password').value;
                const confirmPassword = document.getElementById('create-confirm-password').value;
                const rolesString = document.getElementById('create-user-roles').value;
                const roles = rolesString.split(',').map(role => `ROLE_${role.trim().toUpperCase()}`);


                if (password !== confirmPassword) {
                    errorMessageDiv.textContent = 'Passwords do not match.';
                    errorMessageDiv.style.display = 'block';
                    return;
                }

                // Backend UserRequestDTO for creation: username, email, userPassword, roles (List<String>)
                const payload = {
                    username: username,
                    email: email,
                    userPassword: password,
                    roles: roles
                };

                try {
                    const createButton = createForm.querySelector('button[type="submit"]');
                    createButton.disabled = true;
                    createButton.textContent = 'Creating...';

                    // Backend endpoint for creating user: POST /users with UserRequestDTO
                    // Your AuthController has /auth/signup. If admin creates user, it might be POST /users
                    // Assuming you have a POST /users endpoint for admin to create users.
                    // If not, this needs to align with your backend.
                    // For now, let's assume POST /users for admin creation.
                    // If you only have /auth/signup, that's typically public.
                    // Let's use /users as per typical admin user creation.
                    await window.api.post('/users', payload, true); // true for requiresAuth (admin)

                    successMessageDiv.textContent = 'User created successfully!';
                    successMessageDiv.style.display = 'block';
                    createForm.reset();
                    setTimeout(() => {
                         window.location.hash = '#/users'; // Go to users list
                    }, 1500);

                } catch (error) {
                    console.error('Failed to create user:', error);
                    let message = 'Failed to create user. Please try again.';
                    if (error.data && error.data.error) {
                        message = error.data.error;
                    } else if (error.message) {
                        message = error.message;
                    }
                    errorMessageDiv.textContent = message;
                    errorMessageDiv.style.display = 'block';
                } finally {
                    const createButton = createForm.querySelector('button[type="submit"]');
                    if(createButton) {
                        createButton.disabled = false;
                        createButton.textContent = 'Create User';
                    }
                }
            });
        }
    }

    window.pageRender.createUserPage = loadCreateUserPage;
})();
