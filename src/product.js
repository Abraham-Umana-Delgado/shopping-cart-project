const product = document.getElementById('producto');
const mainProductImage = product.querySelector('.producto__imagen');
const thumbsContainer = product.querySelector('.producto__thumbs');
const colorProduct = product.querySelector('#propiedad-color');
const inputProductAmount = product.querySelector('#cantidad');
const btnIncreaseProductAmount = product.querySelector('#incrementar-cantidad');
const btnDecreaseProductAmount = product.querySelector('#disminuir-cantidad');

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
})

