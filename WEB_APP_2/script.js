// Helper function to fetch data from the server
async function fetchData(url) {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to populate a table with data
function populateTable(tableId, data) {
    const table = document.querySelector(tableId);
    data.forEach(item => {
        const row = table.insertRow();
        Object.values(item).forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });
}

// Event listeners for navigation
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = link.getAttribute('href');
        document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Fetch and populate tables on document ready
document.addEventListener('DOMContentLoaded', () => {
    // Replace 'api/...' with your actual API endpoints
    fetchData('https://virtserver.swaggerhub.com/BSCNRB595022/test/1.0.0/users').then(data => populateTable('#users', data));
    fetchData('https://virtserver.swaggerhub.com/BSCNRB595022/test/1.0.0/locations').then(data => populateTable('#locations', data));
    fetchData('https://virtserver.swaggerhub.com/BSCNRB595022/test/1.0.0/shops').then(data => populateTable('#shops', data));
    fetchData('https://virtserver.swaggerhub.com/BSCNRB595022/test/1.0.0/products').then(data => populateTable('#products', data));
    fetchData('https://virtserver.swaggerhub.com/BSCNRB595022/test/1.0.0/transactions').then(data => populateTable('#transactions', data));
});
