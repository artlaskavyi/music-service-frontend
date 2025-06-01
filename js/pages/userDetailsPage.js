(function() {
    async function loadUserDetailsPage(userId) {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = `<div class="container"><p>Loading user details for ID: ${userId}...</p></div>`;

        try {
            const user = await window.api.get(`/users/${userId}`, true);
            appContent.innerHTML = window.templates.userDetailsPage(user);

            const deleteButton = document.getElementById('delete-user-button');
            const messageArea = document.getElementById('user-detail-message-area');

            if (deleteButton) {
                deleteButton.addEventListener('click', async () => {
                    if (confirm(`Are you sure you want to delete user ${user.username} (ID: ${userId})?`)) {
                        try {
                            await window.api.delete(`/users/${userId}`, true);
                             if (messageArea) {
                                 messageArea.textContent = `User ${user.username} deleted successfully. Redirecting to users list...`;
                                 messageArea.className = 'success-message';
                                 messageArea.style.display = 'block';
                             }
                            setTimeout(() => window.location.hash = '#/users', 1500);
                        } catch (error) {
                            let msg = `Error deleting user: ${error.message}`;
                            if (error.data && error.data.error) msg = error.data.error;
                            if (messageArea) {
                                 messageArea.textContent = msg;
                                 messageArea.className = 'error-message';
                                 messageArea.style.display = 'block';
                            }
                        }
                    }
                });
            }
        } catch (error) {
            let message = `Could not load user details. Please try again.`;
            if (error.status === 401 || error.status === 403) {
                message = "You are not authorized to view these details. Admin access required.";
            } else if (error.message) {
                message = error.message;
            }
            appContent.innerHTML = `<div class="container error-message"><p>${message}</p></div>`;
        }
    }
    window.pageRender.userDetailsPage = loadUserDetailsPage;
})();
