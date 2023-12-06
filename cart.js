let cart = [];

document.querySelectorAll('.menuBtn').forEach(button => {
    button.addEventListener('click', function (e) {
        const card = e.target.closest('.card');
        const title = card.querySelector('.titulo-menu').textContent;
        const price = card.querySelector('.precio').textContent;

        const itemRepetido = cart.find(item => item.title === title);
        if (itemRepetido) {
            itemRepetido.quantity++;
        } else
        cart.push({ title, price, quantity: 1 });

        console.log(cart);
        updateCart();
    });
});

function updateCart() {
    const cartDisplay = document.getElementById('cart');
    cartDisplay.innerHTML = '';
    cart.forEach(item => {
        cartDisplay.innerHTML += `<p>${item.title} - ${item.price} x ${item.quantity}<button class="increase">+</button><button class="decrease">-</button><p>`
    });

    const total = cart.reduce((total, item) => total + Number(item.price) *item.quantity, 0);
    cartDisplay.innerHTML += `<p>Total: ${total}</p>`;

    document.querySelectorAll('.increase').forEach((button, index) => {
        button.addEventListener('click', function() {
          cart[index].quantity++;
          updateCart();
        });
     });

    document.querySelectorAll('.decrease').forEach((button, index) => {
        button.addEventListener('click', function() {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            } else {
            cart.splice(index, 1);
        }
          updateCart();
        });
    });
}