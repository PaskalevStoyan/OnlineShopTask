const products = document.querySelector('.products');
const modalTitle = document.querySelector('.modal-title');
const modalProductPrice = document.querySelector('.modal-product-price');
const modalProductQuantity = document.querySelector('.modal-product-quantity');
const modalProductShippingDate = document.querySelector('.modal-product-shipping-date');
const modalProductImage = document.querySelector('.modal-product-img');
const modalProductDescription = document.querySelector('.modal-product-description');

let prods = [];
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
                    <button ${product.UnitsInStock > 0 ? '' : 'disabled'}  type="button" class="btn btn-primary mt-2" data-toggle="modal" data-target="#prodModalCenter">More info</button>

                </div>
            `
            prods.push(product);
            });
            products.innerHTML = output;
        })
}

products.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
       
        const prevSibling = event.target.previousElementSibling;
        const item = prods[prevSibling.id - 1];
        let date = new Date(item.DeliveryOn.slice(9, item.DeliveryOn.length - 1));
        date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`; 
        
        modalTitle.textContent = item.ProductName;
        modalProductPrice.textContent = `Price: ${item.UnitPrice}$`;
        modalProductQuantity.textContent = `In stock: ${item.UnitsInStock}`;
        modalProductShippingDate.textContent = `Delivery date: ${date}`;
        modalProductImage.src = item.image;

        const description = `<span class="desc">Description: </span> <p>${ item.description}</p>`
        modalProductDescription.innerHTML = description
        
    }
});

console.log(products);



getProducts();