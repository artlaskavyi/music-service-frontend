(function() {
    async function loadUsersPage() {
        const appContent = document.getElementById('app-content');
        if (!appContent) return;

        appContent.innerHTML = window.templates.usersPage([]);

        try {
            const users = await window.api.get('/users', true);
            appContent.innerHTML = window.templates.usersPage(users);
            attachDeleteEventListeners();
        } catch (error) {
            let message = "Could not load users. Please try again later.";
            if (error.status === 401 || error.status === 403) {
                message = "You are not authorized to view users. This area is for admins only.";
            } else if (error.message) {
                message = error.message;
            }
            appContent.innerHTML = `<div class="container error-message"><p>${message}</p></div>`;
        }
    }

    function attachDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll('.delete-user-btn');
        const messageArea = document.getElementById('user-message-area');

        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const userId = event.target.closest('button').dataset.userId;
                if (confirm(`Are you sure you want to delete user with ID: ${userId}?`)) {
                    try {
                        await window.api.delete(`/users/${userId}`, true);
                        if (messageArea) {
                             messageArea.textContent = `User ${userId} deleted successfully.`;
                             messageArea.className = 'success-message';
                             messageArea.style.display = 'block';
                        }
                        loadUsersPage();
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
        });
    }
    window.pageRender.usersPage = loadUsersPage;
})();
