function addToCart(id, name, price) {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let product = { id: id, name: name, price: price };

    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let cartDiv = document.getElementById('cart');

    cartDiv.innerHTML = '';

    cart.forEach(item => {
        cartDiv.innerHTML += `<p>${item.name} - $${item.price}</p>`;
    });
}

window.onload = function() {
    displayCart();
}
