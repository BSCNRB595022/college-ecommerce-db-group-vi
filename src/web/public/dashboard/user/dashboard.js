document.addEventListener('DOMContentLoaded', async () => {
  // Constants
  const productsTable = document.getElementById('products-table');
  const cartTable = document.getElementById('cart-table');
  const totalPrice = document.getElementById('total-price');
  const checkoutBtn = document.getElementById('checkout-btn');
  const token = localStorage.getItem('token');

  // Check if the user is authenticated
  if (!token) {
    window.location.href = '/login'; // Redirect to login page if not authenticated
    return;
  }

  // Fetch available products and render them
  const fetchAndRenderProducts = async () => {
    try {
      const response = await fetch('/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        window.location.href = '/login'; // Redirect to login page if not authenticated
        return;
      }
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Render products into the products table
  const renderProducts = (products) => {
    const tbody = productsTable.querySelector('tbody');
    tbody.innerHTML = '';
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td><button class="add-to-cart-btn" data-id="${product.product_id}">Add to Cart</button></td>
            `;
      tbody.appendChild(row);
    });
  };

  // Event listener for Add to Cart button
  productsTable.addEventListener('click', async (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
      const productId = event.target.dataset.id;
      try {
        // Instead of fetching from the API, directly create product object
        const product = {
          product_id: productId,
          name: event.target.parentElement.parentElement.children[0].textContent,
          price: parseFloat(event.target.parentElement.parentElement.children[1].textContent.slice(1)),
          quantity: 1
        };
        addToCart(product);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  });

  // Add product to cart and update UI
  const addToCart = (product) => {
    const tbody = cartTable.querySelector('tbody');
    const existingCartItem = tbody.querySelector(`tr[data-id="${product.product_id}"]`);
    if (existingCartItem) {
      const quantityCell = existingCartItem.querySelector('.quantity');
      const quantity = parseInt(quantityCell.textContent) + 1;
      quantityCell.textContent = quantity;
    } else {
      const row = document.createElement('tr');
      row.dataset.id = product.product_id;
      row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td class="quantity">1</td>
                <td>$${product.price.toFixed(2)}</td>
                <td><button class="remove-from-cart-btn">Remove</button></td>
            `;
      tbody.appendChild(row);
    }
    updateTotalPrice();
  };

  // Event listener for Remove from Cart button
  cartTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart-btn')) {
      const row = event.target.closest('tr');
      row.remove();
      updateTotalPrice();
    }
  });

  // Fetch the current user's information
  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        window.location.href = '/login'; // Redirect to login page if not authenticated
        return;
      }

      const userInfo = await response.json();
      userId = userInfo.user_id; // Assign the user_id to the userId variable
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  await fetchUserInfo(); // Call the fetchUserInfo function to get the user_id


  checkoutBtn.addEventListener('click', async () => {
    const cartItems = cartTable.querySelectorAll('tbody tr');
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add some items before checkout.');
      return;
    }

    // Prepare transactions data
    const transactions = [];
    for (const item of cartItems) {
      const productId = item.dataset.id;
      const quantity = parseInt(item.querySelector('.quantity').textContent);
      try {
        const productResponse = await fetch(`/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (productResponse.status === 404) {
          console.error(`Product with ID ${productId} not found.`);
          continue; // Skip this product and move to the next one
        }

        const product = await productResponse.json();

        // Check if the response is valid JSON
        if (typeof product === 'object' && product !== null) {
          transactions.push({
            user_id: userId, // Add the user's ID to the transaction object
            product_id: product.product_id,
            quantity: quantity
          });
        } else {
          console.error('Error fetching product information:', product);
        }
      } catch (error) {
        console.error('Error fetching product information:', error);
      }
    }

    // All transactions data fetched, proceed to checkout
    try {
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ transactions })
      });
      if (response.status === 200) {
        // Clear the cart and update UI
        cartTable.querySelector('tbody').innerHTML = '';
        updateTotalPrice();
        alert('Checkout successful. Your transactions have been recorded.');
      } else {
        alert('Failed to complete checkout. Please try again later.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again later.');
    }
  });

  // Update total price in the cart
  const updateTotalPrice = () => {
    const cartItems = cartTable.querySelectorAll('tbody tr');
    let total = 0;
    cartItems.forEach(item => {
      const priceCell = item.querySelector('td:nth-child(2)');
      const quantityCell = item.querySelector('.quantity');
      const price = parseFloat(priceCell.textContent.slice(1));
      const quantity = parseInt(quantityCell.textContent);
      total += price * quantity;
    });
    totalPrice.textContent = `$${total.toFixed(2)}`;
  };

  // Fetch and render products on page load
  fetchAndRenderProducts();
});