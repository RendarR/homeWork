'use strict';
 export let basket = {
    items: [],
    container: null,
    containerItems: null,
    shown: false,
    url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json',
    init() {
        this.container = document.querySelector('#basket');
        this.containerItems = document.querySelector('#basket-items');
        this._get(this.url)
            .then(basket => {
                this.items = basket.content;
            })
            .finally(() => {
                this._render();
                this._handleActions(    );
            })
    },
    _get(url) {
        return fetch(url).then(d => d.json());
    },
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += `
                <div class="drop-cart-products-1">
                    <img src="${item.productImg}" width="85" height="100" alt="" class="drop-cart-products-1-img">
                    <div class="drop-cart-products-1-text">
                        <h3 class="drop-cart-products-1-text-h3">${item.productName}</h3>
                        <img src="../src/assets/imgs/stars.png" alt="" class="drop-cart-products-1-text-stars">
                        <div class="drop-cart-products-1-text-totallist">${item.amount}
            <span>x</span> $${item.productPrice}</div>
                    </div>
                    <div class="drop-cart-products-1-delete"><img src="../src/assets/imgs/x.png" alt=""></div>
                </div>
            </div>
            `
        });
        this.container.innerHTML = htmlStr;
    },
    _handleActions() {

        document.querySelector('#basket-toggler').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
            document.querySelectorAll('.drop-cart-down').forEach((elem)=>{
                elem.classList.toggle('invisible');
            });
            // document.querySelector('#basket').classList.toggle('invisible');
            this.shown = !this.shown;
        });
        this.container.addEventListener('click', ev => {
            if (ev.target.name === 'remove') {
                this._remove(ev.target.dataset.id);
            }
        })
    },
    add(item) {
        let find = this.items.find(el => el.productId === item.productId);
        if (find) {
            find.amount++;
        } else {
            this.items.push(item);
        }
        this._render();
    },
    _remove(id) {
        let find = this.items.find(el => el.productId === id);
        if (find.amount > 1) {
            find.amount--;
        } else {
            this.items.splice(this.items.indexOf(find), 1);
        }
        this._render();
    },
 };
