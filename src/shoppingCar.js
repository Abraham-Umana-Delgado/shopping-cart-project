import dataProduct from "./data/dataProduct";
const product = document.getElementById('producto');
const btnAddToCar = document.getElementById('agregar-al-carrito');
const openCarBtn = document.querySelectorAll('[data-accion="abrir-carrito"]');
const closeCarBtn = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const shoppingCarWindow = document.getElementById('carrito');
const notification = document.getElementById('notificacion');
const productContainer = document.getElementById('producto');
const buyProductsIntoCar = document.getElementById('carrito__btn-comprar');
let shoppingCar = [];

const formatCurrency = new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' });
//

//
const colorThumbnails = {
    negro: './img/thumbs/negro.jpg',
    amarillo: './img/thumbs/amarillo.jpg',
    rojo: './img/thumbs/rojo.jpg'
}

const getColorThumbnails = (colorThumbnail) => {
    return colorThumbnails[colorThumbnail]
}


//
const renderShoppingCar = () => {
    let productPrice, total = 0;

    shoppingCarWindow.classList.add('carrito--active');

    const selectedPreviusProducts = shoppingCarWindow.querySelectorAll('.carrito__producto');
    selectedPreviusProducts.forEach((previusProducts) => {
        previusProducts.remove();
    });

    //
    if (shoppingCar.length < 1) {
        shoppingCarWindow.classList.add('carrito--vacio');
    } else {
        shoppingCarWindow.classList.remove('carrito--vacio');

        shoppingCar.forEach((productCar) => {

            //
            dataProduct.product.forEach((databaseProduct) => {
                if (databaseProduct.id === productCar.id) {
                    productCar.price = databaseProduct.price;
                    productPrice = productCar.productAmount * databaseProduct.price;
                    total += productPrice;
                }
            })

            //
            const selectedColorThumbnail = productCar.productColor;
            const thumbnailRoute = getColorThumbnails(selectedColorThumbnail);

            const productTemplate = `<div class="carrito__producto-info">
            <img src='${thumbnailRoute}' alt="" class="carrito__thumb" />
            <div>
                <p class="carrito__producto-nombre">
                    <span class="carrito__producto-cantidad">${productCar.productAmount} x </span> ${productCar.name}
                </p>
                <p class="carrito__producto-propiedades">
                    Tamaño:<span>${productCar.productSize}</span> Color:<span>${productCar.productColor}</span>
                </p>
            </div>
        </div>
        <div class="carrito__producto-contenedor-precio">
            <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                    />
                </svg>
            </button>
            <p class="carrito__producto-precio">${formatCurrency.format(productPrice)}</p>
        </div>`

            const itemCar = document.createElement('div');

            itemCar.classList.add('carrito__producto');
            itemCar.innerHTML = productTemplate;
            shoppingCarWindow.querySelector('.carrito__body').appendChild(itemCar);

            shoppingCarWindow.querySelector('.carrito__total').innerText = formatCurrency.format(total);
        });
    }

    //



}

shoppingCarWindow.addEventListener('click', (event) => {
    if (event.target.closest('button').dataset.accion === 'eliminar-item-carrito') {
        const item = event.target.closest('.carrito__producto');
        const indexItem = [...shoppingCarWindow.querySelectorAll('.carrito__producto')].indexOf(item);

        //
        shoppingCar = shoppingCar.filter((item, index) => {
            if (index !== indexItem) {
                return item;
            }
        });
        renderShoppingCar();
    }
});

//
openCarBtn.forEach((buttons) => {
    buttons.addEventListener('click', (event) => {
        renderShoppingCar();
    });
});

//
closeCarBtn.forEach((buttons) => {
    buttons.addEventListener('click', (event) => {
        shoppingCarWindow.classList.remove('carrito--active');
    });
});

//
btnAddToCar.addEventListener('click', (event) => {
    const id = parseInt(productContainer.dataset.productoId);
    const name = productContainer.querySelector('.producto__nombre').innerHTML;
    const description = productContainer.querySelector('.producto__descripcion').innerHTML;
    const productColor = productContainer.querySelector('#propiedad-color input:checked').value;
    const productSize = productContainer.querySelector('#propiedad-tamaño input:checked').value;
    const productAmount = parseInt(productContainer.querySelector('.producto__cantidad').value);

    //
    if (shoppingCar.length > 0) {
        let productIntoCar = false;

        //
        shoppingCar.forEach((item) => {
            if (item.id === id && item.name === name && item.description === description && item.productColor === productColor && item.productSize === productSize) {
                item.productAmount += productAmount;
                productIntoCar = true
            }
        });

        if (!productIntoCar) {
            shoppingCar.push({
                id: id,
                name: name,
                description: description,
                productColor: productColor,
                productSize: productSize,
                productAmount: productAmount
            });
        }
    } else {
        shoppingCar.push({
            id: id,
            name: name,
            description: description,
            productColor: productColor,
            productSize: productSize,
            productAmount: productAmount
        });
    }

    //

    notification.classList.add('notificacion--active');
    let thumbnailSrc = [...product.querySelectorAll('.producto__thumb-img')][0].src;
    thumbnailSrc = getColorThumbnails(productColor);
    notification.querySelector('.notificacion__thumb').src = thumbnailSrc;

    setTimeout(() => {
        notification.classList.remove('notificacion--active');
    }, 4000);
});

buyProductsIntoCar.addEventListener('click', (event) => {
    console.log('Sending information');
    console.log(shoppingCar);
});
