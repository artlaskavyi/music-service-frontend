(function() {
    async function loadEditUserPage(userId) {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = `<div class="container"><p>Loading user data for editing (ID: ${userId})...</p></div>`;

        try {
            const user = await window.api.get(`/users/${userId}`, true);
            appContent.innerHTML = window.templates.editUserPage(user);

            const editForm = document.getElementById('edit-user-form');
            const errorMessageDiv = document.getElementById('edit-user-error-message');
            const successMessageDiv = document.getElementById('edit-user-success-message');

            if (editForm) {
                editForm.addEventListener('submit', async function(event) {
                    event.preventDefault();
                    errorMessageDiv.style.display = 'none';
                    successMessageDiv.style.display = 'none';

                    const updatedUsername = document.getElementById('edit-username').value;
                    const updatedEmail = document.getElementById('edit-email').value;
                    const rolesString = document.getElementById('edit-user-roles').value;
                    const updatedRoles = rolesString.split(',').map(role => `ROLE_${role.trim().toUpperCase()}`);
                    const newPassword = document.getElementById('edit-new-password').value;
                    const confirmPassword = document.getElementById('edit-confirm-password').value;

                    if (newPassword && newPassword !== confirmPassword) {
                        errorMessageDiv.textContent = 'New passwords do not match.';
                        errorMessageDiv.style.display = 'block';
                        return;
                    }

                    const payload = {
                        username: updatedUsername,
                        email: updatedEmail,
                        roles: updatedRoles,
                    };

                    if (newPassword) {
                        payload.userPassword = newPassword;
                    }

                    try {
                        const saveButton = editForm.querySelector('button[type="submit"]');
                        saveButton.disabled = true;
                        saveButton.textContent = 'Saving...';
                        await window.api.put(`/users/${userId}`, payload, true);
                        successMessageDiv.textContent = 'User updated successfully!';
                        successMessageDiv.style.display = 'block';
                        setTimeout(() => {
                             window.location.hash = `#/users/${userId}`;
                        }, 1500);
                    } catch (error) {
                        let message = 'Failed to update user. Please try again.';
                        if (error.data && error.data.error) {
                            message = error.data.error;
                        } else if (error.message) {
                            message = error.message;
                        }
                        errorMessageDiv.textContent = message;
                        errorMessageDiv.style.display = 'block';
                    } finally {
                         const saveButton = editForm.querySelector('button[type="submit"]');
                         if (saveButton) {
                            saveButton.disabled = false;
                            saveButton.textContent = 'Save Changes';
                         }
                    }
                });
            }
        } catch (error) {
            appContent.innerHTML = `<div class="container error-message"><p>Could not load user for editing: ${error.message}</p></div>`;
        }
    }
    window.pageRender.editUserPage = loadEditUserPage;
})();
