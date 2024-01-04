function updateCartCount() {
    try {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

        if (isNaN(cartCount)) {
            cartCount = 0;
        }

        // Update localStorage cartCount
        localStorage.setItem('cartCount', cartCount);

        // Update the cartCount display
        $('#cartCount').text(cartCount);
    } catch (error) {
        console.error('Error occurred while updating cart count:', error);
        // Handle the error gracefully, reset the cart count to 0
        localStorage.setItem('cartCount', 0);
        $('#cartCount').text(0);
    }
}

$(document).ready(function() {
    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Initialize cartCount based on the quantities of items in cartItems
    let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Check if cartCount is NaN and handle it gracefully
    if (!isNaN(cartCount)) {
        // Update the cart count on the cart icon
        $('#cartCount').text(cartCount);
    } else {
        // Handle the error, perhaps reset the cart or set cartCount to 0
        $('#cartCount').text('0');
    }
    updateCartCount();
});

function editQuantity(productName, action) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productIndex = cartItems.findIndex(item => item.name === productName);


    // If productIndex is -1 (not found), just return without making any changes
    if (productIndex === -1) {
        console.warn(`Product ${productName} not found in cart.`);
        localStorage.removeItem('cartItems');
        return;
    }

    if (action === 'add') {
        cartItems[productIndex].quantity++;
    } else if (action === 'remove') {
        if (cartItems[productIndex].quantity > 1) {
            cartItems[productIndex].quantity--;
        } else {
            cartItems.splice(productIndex, 1); // Remove item if quantity is 1
        }
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
    displayCartItems(); // Update cart display
    updateCartCount(); //Update the cartCount
}