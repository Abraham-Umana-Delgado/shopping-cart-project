'use strict';

const product$1 = document.getElementById('producto');
const mainProductImage = product$1.querySelector('.producto__imagen');
const thumbsContainer = product$1.querySelector('.producto__thumbs');
const colorProduct = product$1.querySelector('#propiedad-color');
const inputProductAmount = product$1.querySelector('#cantidad');
const btnIncreaseProductAmount = product$1.querySelector('#incrementar-cantidad');
const btnDecreaseProductAmount = product$1.querySelector('#disminuir-cantidad');

thumbsContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        const imageSrc = event.target.src;
        const lastIndex = imageSrc.lastIndexOf('/');
        const thumbnailName = imageSrc.substring(lastIndex + 1);

        mainProductImage.src = `./img/tennis/${thumbnailName}`;
    }
});

colorProduct.addEventListener('click', (event) => {
    if (event.target.tagName === 'INPUT') {
        mainProductImage.src = `./img/tennis/${event.target.value}.jpg`;
    }
});

btnIncreaseProductAmount.addEventListener('click', (event) => {
    inputProductAmount.value = parseInt(inputProductAmount.value) + 1;
});

btnDecreaseProductAmount.addEventListener('click', (event) => {
    if (inputProductAmount.value > 1) {
        inputProductAmount.value = parseInt(inputProductAmount.value) - 1;
    } else {
        alert('La minima cantidad de productos que puedes tener en el carrito es de 1, no puedes disminuir mas');
    }
});

inputProductAmount.addEventListener('input', (event) => {
    if (isNaN(parseInt(inputProductAmount.value)) || inputProductAmount.value < 1) {
        inputProductAmount.value = 1;
    }
});

var dataProduct = {
    product: [
        {
            id: 1,
            name: 'Tennis Converse Standard',
            description: 'Lorem Ipsum Dolot Asimmet',
            price: 500.00,
            size: ['1.5', '2', '2.5', '3', '3.5', '4']
        },
        {
            id: 2,
            name: 'Tennis Converse 2000',
            description: 'Lorem Ipsum Dolot Asimmet',
            price: 300.00,
            size: ['1.5', '2', '2.5', '3', '3.5', '4'],
        },
    ],
};

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
};

const getColorThumbnails = (colorThumbnail) => {
    return colorThumbnails[colorThumbnail]
};


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
            });

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
        </div>`;

            const itemCar = document.createElement('div');

            itemCar.classList.add('carrito__producto');
            itemCar.innerHTML = productTemplate;
            shoppingCarWindow.querySelector('.carrito__body').appendChild(itemCar);

            shoppingCarWindow.querySelector('.carrito__total').innerText = formatCurrency.format(total);
        });
    }

    //



};

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
                productIntoCar = true;
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

class Tabs {
    constructor(idContainerOptions) {
        this.containerOptions = document.getElementById(idContainerOptions);
        this.tabs = this.containerOptions.querySelector('.tabs');

        this.tabs.addEventListener('click', (event) => {
            //
            if ([...event.target.classList].includes('tabs__button')) {
                //
                const tab = event.target.dataset.tab;

                if (this.containerOptions.querySelector('.tab--active')) {
                    this.containerOptions.querySelector('.tab--active').classList.remove('tab--active');
                }

                this.containerOptions.querySelector(`#${tab}`).classList.add('tab--active');

                if (this.tabs.querySelector('.tabs__button--active')) {
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }

                event.target.classList.add('tabs__button--active');
            }
        });
    }
}

new Tabs('mas-informacion');
