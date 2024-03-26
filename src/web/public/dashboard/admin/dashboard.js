// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentContainer = document.getElementById('content');
    const editShopModal = document.getElementById('edit-shop-modal');
    const editProductModal = document.getElementById('edit-product-modal');
    const editLocationModal = document.getElementById('edit-location-modal');
    const modals = document.querySelectorAll('.modal');
    const modalCloseBtns = document.querySelectorAll('.close');

    // Close modals when click outside
    window.onclick = (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };

    // Close modals when close button is clicked
    modalCloseBtns.forEach(btn => {
        btn.onclick = () => {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        };
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.id.replace('-tab', '');
            showTab(tabId);
        });
    });

    const showTab = async (tabId) => {
        try {
            tabButtons.forEach(button => button.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');

            // Get the JWT token from localStorage or cookies
            const token = localStorage.getItem('token');

            const response = await fetch(`/${tabId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            contentContainer.innerHTML = '';

            switch (tabId) {
                case 'shops':
                    renderShops(data);
                    break;
                case 'products':
                    renderProducts(data);
                    break;
                case 'locations':
                    renderLocations(data);
                    break;
                case 'transactions':
                    renderTransactions(data);
                    break;
                default:
                    contentContainer.innerHTML = '<p>Content not available</p>';
            }
        } catch (error) {
            console.error('Error loading content:', error);
            contentContainer.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        }
    };

    const renderShops = (shops) => {
        const shopsTable = createTable(['Shop Name', 'Actions']);

        shops.forEach(shop => {
            const row = shopsTable.insertRow();
            row.insertCell().textContent = shop.name;
            const actionsCell = row.insertCell();
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-shop');
            editBtn.dataset.shopId = shop.id;
            editBtn.addEventListener('click', () => showEditShopModal(shop));
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-shop');
            deleteBtn.dataset.shopId = shop.id;
            deleteBtn.addEventListener('click', () => deleteShop(shop.id));
            actionsCell.appendChild(editBtn);
            actionsCell.appendChild(deleteBtn);
        });

        contentContainer.appendChild(shopsTable);
    };

    const renderProducts = (products) => {
        const productsTable = createTable(['Product Name', 'Price', 'Actions']);

        products.forEach(product => {
            const row = productsTable.insertRow();
            row.insertCell().textContent = product.name;
            row.insertCell().textContent = `$${product.price}`;
            const actionsCell = row.insertCell();
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-product');
            editBtn.dataset.productId = product.id;
            editBtn.addEventListener('click', () => showEditProductModal(product));
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-product');
            deleteBtn.dataset.productId = product.id;
            deleteBtn.addEventListener('click', () => deleteProduct(product.id));
            actionsCell.appendChild(editBtn);
            actionsCell.appendChild(deleteBtn);
        });

        contentContainer.appendChild(productsTable);
    };

    const renderLocations = (locations) => {
        const locationsTable = createTable(['Location Name', 'Address', 'Actions']);

        locations.forEach(location => {
            const row = locationsTable.insertRow();
            row.insertCell().textContent = location.name;
            row.insertCell().textContent = location.address;
            const actionsCell = row.insertCell();
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-location');
            editBtn.dataset.locationId = location.id;
            editBtn.addEventListener('click', () => showEditLocationModal(location));
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-location');
            deleteBtn.dataset.locationId = location.id;
            deleteBtn.addEventListener('click', () => deleteLocation(location.id));
            actionsCell.appendChild(editBtn);
            actionsCell.appendChild(deleteBtn);
        });

        contentContainer.appendChild(locationsTable);
    };

    const renderTransactions = (transactions) => {
        const transactionsTable = createTable(['Product Name', 'Quantity', 'Price', 'Total']);

        transactions.forEach(transaction => {
            const row = transactionsTable.insertRow();
            row.insertCell().textContent = transaction.product_name;
            row.insertCell().textContent = transaction.quantity;
            row.insertCell().textContent = `$${transaction.price}`;
            row.insertCell().textContent = `$${transaction.quantity * transaction.price}`;
        });

        contentContainer.appendChild(transactionsTable);
    };

    const createTable = (headers) => {
        const table = document.createElement('table');
        const headerRow = table.insertRow();
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        return table;
    };

    const showEditShopModal = (shop) => {
        const editShopIdInput = document.getElementById('edit-shop-id');
        const editShopNameInput = document.getElementById('edit-shop-name');

        editShopIdInput.value = shop.id;
        editShopNameInput.value = shop.name;
        editShopModal.style.display = 'block';
    };

    const showEditProductModal = (product) => {
        const editProductIdInput = document.getElementById('edit-product-id');
        const editProductNameInput = document.getElementById('edit-product-name');
        const editProductPriceInput = document.getElementById('edit-product-price');

        editProductIdInput.value = product.id;
        editProductNameInput.value = product.name;
        editProductPriceInput.value = product.price;
        editProductModal.style.display = 'block';
    };

    const showEditLocationModal = (location) => {
        const editLocationIdInput = document.getElementById('edit-location-id');
        const editLocationNameInput = document.getElementById('edit-location-name');
        const editLocationAddressInput = document.getElementById('edit-location-address');

        editLocationIdInput.value = location.id;
        editLocationNameInput.value = location.name;
        editLocationAddressInput.value = location.address;
        editLocationModal.style.display = 'block';
    };

    const editShopForm = document.getElementById('edit-shop-form');
    editShopForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const shopId = document.getElementById('edit-shop-id').value;
        const shopName = document.getElementById('edit-shop-name').value;

        try {
            const response = await fetch(`/api/shops/${shopId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: shopName })
            });

            if (response.ok) {
                editShopModal.style.display = 'none';
                showTab('shops');
            } else {
                console.error('Failed to update shop');
            }
        } catch (error) {
            console.error('Error updating shop:', error);
        }
    });

    const editProductForm = document.getElementById('edit-product-form');
    editProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const productId = document.getElementById('edit-product-id').value;
        const productName = document.getElementById('edit-product-name').value;
        const productPrice = document.getElementById('edit-product-price').value;

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: productName, price: productPrice })
            });

            if (response.ok) {
                editProductModal.style.display = 'none';
                showTab('products');
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    });

    const editLocationForm = document.getElementById('edit-location-form');
    editLocationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const locationId = document.getElementById('edit-location-id').value;
        const locationName = document.getElementById('edit-location-name').value;
        const locationAddress = document.getElementById('edit-location-address').value;

        try {
            const response = await fetch(`/api/locations/${locationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: locationName, address: locationAddress })
            });

            if (response.ok) {
                editLocationModal.style.display = 'none';
                showTab('locations');
            } else {
                console.error('Failed to update location');
            }
        } catch (error) {
            console.error('Error updating location:', error);
        }
    });

    const deleteShop = async (shopId) => {
        try {
            const response = await fetch(`/api/shops/${shopId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showTab('shops');
            } else {
                console.error('Failed to delete shop');
            }
        } catch (error) {
            console.error('Error deleting shop:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showTab('products');
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const deleteLocation = async (locationId) => {
        try {
            const response = await fetch(`/api/locations/${locationId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showTab('locations');
            } else {
                console.error('Failed to delete location');
            }
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    };

    showTab('shops');
});