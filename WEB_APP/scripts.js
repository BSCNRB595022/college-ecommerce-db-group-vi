document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.querySelector('.resource-table tbody');

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    function createUserRow(user) {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = user.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = user.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        actionsCell.appendChild(editButton);
        row.appendChild(actionsCell);

        return row;
    }

    async function populateUserTable() {
        const users = await fetchUsers();
        users.forEach((user) => {
            const row = createUserRow(user);
            userTableBody.appendChild(row);
        });
    }

    populateUserTable();
});
