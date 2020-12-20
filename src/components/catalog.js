'use strict'
export let catalog = {
    container: null,
    items: [],
    basket: null,
    url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json',
    init() {
        this.container = document.querySelector('#catalog');
        this.basket = basket;
        this._get(this.url)
            .then(arr => {
                this.items = arr;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    },
    _get(url) {
        return fetch(url).then(d => d.json());
    },
    _fillCatalog() { //Инкапсуляция (условная для JS)
        this.items = getArrayOfObjects();
    },
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += `<div class="item">
                    <a href="#" class="item_">
                        <div class="item__">
                            <div class="img_item">
                               <div class="open_text">
                                    <div class="gen_add_to_card">
                                        <img src="../src/assets/imgs/1287.png" alt="">
                                        <p class="p_add_to_card">Add to card</p>
                                    </div>
                                </div>
                                <img src="${item.productImg}" alt="">
                            </div>
                            <div class="footer_item">
                                <h1 class="h1_item">${item.productName}</h1>
                                <h2 class="h2_item">$${item.productPrice}</h2>
                            </div>
                        </div>
                    </a>
                </div>`
        });
        this.container.innerHTML = htmlStr;
    },
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add(this._createNewItem(dataset));
            }
        })
    },
    _createNewItem(dataset) {
        return {
            productId: dataset.id,
            productName: dataset.name,
            productImg: dataset.img,
            productPrice: +dataset.price,
            amount: 1
        }
    }
};
