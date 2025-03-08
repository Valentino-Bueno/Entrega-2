class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const productos = [
    new Producto("Manzana", 80),
    new Producto("Banana", 60),
    new Producto("Naranja", 70),
    new Producto("Zanahoria", 50),
    new Producto("Lechuga", 40),
    new Producto("Tomate", 90),
    new Producto("Brócoli", 120),
    new Producto("Uvas", 150)
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedorProductos = document.getElementById('productos');
const contenedorCarrito = document.getElementById('carrito');
const totalContainer = document.getElementById('totalContainer');
const botonVaciar = document.getElementById('vaciarCarrito');
const botonFinalizar = document.getElementById('finalizarCompra');
const mensajeContainer = document.getElementById('mensaje');

botonVaciar.addEventListener('click', vaciarCarrito);
botonFinalizar.addEventListener('click', finalizarCompra);

renderizarProductos();
renderizarCarrito();

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    guardarEnLocalStorage();
    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarEnLocalStorage();
    renderizarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarMensaje('El carrito está vacío.');
    } else {
        mostrarMensaje('Gracias por tu compra!');
        vaciarCarrito();
    }
}

function renderizarProductos() {
    contenedorProductos.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
                Agregar al carrito
            </button>
        `;
        contenedorProductos.appendChild(div);
    });
}

function renderizarCarrito() {
    contenedorCarrito.innerHTML = '';
    let total = 0;
    
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-carrito';
        div.innerHTML = `<p>${item.nombre} - $${item.precio}</p>`;
        contenedorCarrito.appendChild(div);
        total += item.precio;
    });
    
    totalContainer.textContent = `Total: $${total}`;
}

function mostrarMensaje(mensaje) {
    mensajeContainer.textContent = mensaje;
    setTimeout(() => {
        mensajeContainer.textContent = '';
    }, 3000);
}

function guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}