document.addEventListener('DOMContentLoaded', function() {
    // Function to switch between tabs
    function switchTab(tabName) {
        // Hide all tab content
        const tabContents = document.querySelectorAll('.tab-content > div');
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab content
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    }

    // Function to handle tab button click
    function handleTabClick(event) {
        const tabName = event.target.dataset.tab;
        if (tabName) {
            switchTab(tabName);
            // Mark the clicked tab as active
            const tabButtons = document.querySelectorAll('.tab-button');
            tabButtons.forEach(button => {
                button.classList.remove('active');
            });
            event.target.classList.add('active');
        }
    }

    // Add event listener to tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
    });

    // Initially show the first tab
    switchTab('shops'); // Assuming 'shops' is the ID of the first tab content

    // Function to fetch and display shop data
    async function displayShops() {
        try {
            const response = await fetch('/dashboard/admin/shops');
            const data = await response.json();
            const shopTable = document.getElementById('shop-table-body');
            shopTable.innerHTML = ''; // Clear previous data

            data.forEach(shop => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${shop.id}</td>
                    <td>${shop.name}</td>
                    <td>${shop.location}</td>
                    <td>${shop.description}</td>
                `;
                shopTable.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching shop data:', error);
            alert('An error occurred while fetching shop data. Please try again later.');
        }
    }

    // Fetch and display shop data initially
    displayShops();

    // Other functions for fetching and displaying products, locations, transactions, etc. can be implemented similarly
    // Remember to update the switchTab function to switch between respective tab contents
});
