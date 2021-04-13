const products = document.querySelector('.products');
const modalTitle = document.querySelector('.modal-title');
const modalProductPrice = document.querySelector('.modal-product-price');
const modalProductQuantity = document.querySelector('.modal-product-quantity');
const modalProductShippingDate = document.querySelector('.modal-product-shipping-date');
const modalProductImage = document.querySelector('.modal-product-img');
const modalProductDescription = document.querySelector('.modal-product-description');


//When an item is chosen it displays its information in the modal
products.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        const prevSibling = event.target.previousElementSibling;
        const item = productsArray[prevSibling.id - 1];
        let date = new Date(item.DeliveryOn.slice(9, item.DeliveryOn.length - 1));
        date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`; 
        loadModalInformation(item, date);
        const description = `<span class="desc">Description: </span> <p>${ item.description}</p>`
        modalProductDescription.innerHTML = description
    }
});
//Load the current item's information into the Modal
function loadModalInformation(item, date) {
    modalTitle.textContent = item.ProductName;
    modalProductPrice.textContent = `Price: ${item.UnitPrice}$`;
    modalProductQuantity.textContent = `In stock: ${item.UnitsInStock}`;
    modalProductShippingDate.textContent = `Delivery date: ${date}`;
    modalProductImage.src = item.image;
}

let productsArray = [];

//fetch request to get the data and visualize it
function getProducts() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            let output = '';
            data.forEach(product => {
                output += `
                <div class="product m-5">
                    <img src="${product.image}" alt="${product.ProductName}"
                    class="product-img ${product.UnitsInStock > 0 ? '' : 'out-of-stock'}">
                    <div id=${product.ProductID} class="product-display mt-1 text-center">
                        <p class="mt-2">${product.ProductName}
                            <span class="out-of-stock-heading">${product.UnitsInStock > 0 ? '' : '(out of stock)'}</span>
                        </p>
                        <p>${product.UnitPrice.toFixed(2)}$</p>
                    </div>
                    <button 
                    ${product.UnitsInStock > 0 ? '' : 'disabled'}  
                    type="button" class="btn btn-primary mt-2" 
                    data-toggle="modal" 
                    data-target="#prodModalCenter">More info
                    </button>

                </div>
            `
            productsArray.push(product);
            });
            products.innerHTML = output;
        })
}

getProducts();