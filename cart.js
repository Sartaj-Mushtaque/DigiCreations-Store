// Constants
const CONVERSION_RATE = 1; // Use 1 for dollars, or adjust if you need currency conversion

// Function to add items to the cart
function addToCart(id, name, price) {
    // Show alert message and use setTimeout to delay the cart update slightly
    alert(`"${name}" has been added to your cart!`);
    
    // Ensure the alert is shown before executing the following code
    setTimeout(() => {
        // Retrieve cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the item already exists in the cart
        const existingItem = cartItems.find(item => item.id === id);

        if (existingItem) {
            // If the item already exists, increase the quantity
            existingItem.quantity += 1;
        } else {
            // If the item doesn't exist, add it to the cart
            cartItems.push({ id, name, price, quantity: 1 });
        }

        // Save the updated cart items back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update the cart total
        updateCartTotal();
    }, 100); // Delay the execution by 100 milliseconds
}

// Function to display cart items on the cart page
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemElement = document.createElement('tr');
        const priceInUSD = (item.price / CONVERSION_RATE).toFixed(2);
        const totalInUSD = (item.price * item.quantity / CONVERSION_RATE).toFixed(2);

        itemElement.innerHTML = `
            <td>${item.name}</td>
            <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)"></td>
            <td>$${priceInUSD}</td>
            <td>$${totalInUSD}</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        `;
        cartContainer.appendChild(itemElement);
    });

    updateCartTotal();
}

// Function to update the quantity of an item
function updateQuantity(id, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems = cartItems.map(item => {
        if (item.id === id) {
            item.quantity = parseInt(quantity, 10);
        }
        return item;
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
}

// Function to remove an item from the cart
function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== id);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
}

// Function to update cart total
function updateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    document.getElementById('cart-total-price').textContent = `$${(totalPrice / CONVERSION_RATE).toFixed(2)}`;
}

// Initial load of cart items
displayCartItems();
