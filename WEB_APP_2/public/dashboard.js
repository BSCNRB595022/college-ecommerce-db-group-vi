const usersLink = document.getElementById('users-link');
const locationsLink = document.getElementById('locations-link');
const shopsLink = document.getElementById('shops-link');
const productsLink = document.getElementById('products-link');
const transactionsLink = document.getElementById('transactions-link');
const contentDiv = document.getElementById('content');
const usernameSpan = document.getElementById('username');

const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        contentDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        contentDiv.innerHTML = `<p>${error.message}</p>`;
    }
};

usersLink.addEventListener('click', () => fetchData('users'));
locationsLink.addEventListener('click', () => fetchData('locations'));
shopsLink.addEventListener('click', () => fetchData('shops'));
productsLink.addEventListener('click', () => fetchData('products'));
transactionsLink.addEventListener('click', () => fetchData('transactions'));

// Fetch user data and display the username
fetch('/user', {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
})
    .then(response => response.json())
    .then(userData => {
        usernameSpan.textContent = userData.name;
    })
    .catch(error => {
        console.error('Failed to fetch user data:', error);
    });