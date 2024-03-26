document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    const content = document.getElementById('content');

    // Add click event listener to each tab button
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove 'active' class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add 'active' class to the clicked tab
            tab.classList.add('active');

            // Load content based on the clicked tab
            loadContent(tab.id);
        });
    });

    // Function to load content based on the selected tab
    async function loadContent(tabId) {
        try {
            const response = await fetch(`/dashboard/admin/${tabId}`);
            const data = await response.json();

            // Replace this with your logic to render content based on data
            let contentHTML = '';
            switch (tabId) {
                case 'shops':
                    contentHTML = renderShops(data);
                    break;
                case 'products':
                    contentHTML = renderProducts(data);
                    break;
                case 'locations':
                    contentHTML = renderLocations(data);
                    break;
                case 'transactions':
                    contentHTML = renderTransactions(data);
                    break;
                default:
                    contentHTML = 'Content not available';
            }
            content.innerHTML = contentHTML;
        } catch (error) {
            console.error('Error loading content:', error);
            content.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        }
    }

   // Function to render shops content
function renderShops(data) {
    let html = '<h3>Shops</h3>';
    if (data && data.length > 0) {
        html += '<ul>';
        data.forEach(shop => {
            html += `<li>${shop.name} - ${shop.location}</li>`;
        });
        html += '</ul>';
    } else {
        html += '<p>No shops available.</p>';
    }
    return html;
}

// Function to render products content
function renderProducts(data) {
    let html = '<h3>Products</h3>';
    if (data && data.length > 0) {
        html += '<ul>';
        data.forEach(product => {
            html += `<li>${product.name} - $${product.price}</li>`;
        });
        html += '</ul>';
    } else {
        html += '<p>No products available.</p>';
    }
    return html;
}

// Function to render locations content
function renderLocations(data) {
    let html = '<h3>Locations</h3>';
    if (data && data.length > 0) {
        html += '<ul>';
        data.forEach(location => {
            html += `<li>${location.name} - ${location.address}</li>`;
        });
        html += '</ul>';
    } else {
        html += '<p>No locations available.</p>';
    }
    return html;
}

// Function to render transactions content
function renderTransactions(data) {
    let html = '<h3>Transactions</h3>';
    if (data && data.length > 0) {
        html += '<ul>';
        data.forEach(transaction => {
            html += `<li>${transaction.product_name} - ${transaction.quantity} at $${transaction.price} each</li>`;
        });
        html += '</ul>';
    } else {
        html += '<p>No transactions available.</p>';
    }
    return html;
}


    // Load default content when the page loads
    loadContent('shops');
});
