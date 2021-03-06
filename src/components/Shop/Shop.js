import React, { Component } from 'react';
import './Shop.css';
import fakeData from '../../fakeData/index'
import Product from '../Product/Product';
import Cart from '../Cart/Cart'
import { addToDatabaseCart } from '../../utility/local-storage';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[],
            cart:[]
        }
    }

    componentDidMount() {
        // console.log(fakeData);
        const first10 = fakeData.slice(0,10);
        this.setState({products: first10});
    }

    handleAdd = (prod) => {
        // console.log("item added", prod);
        const newCart = [...this.state.cart, prod];// Spread element. 
        this.setState({cart:newCart});
        const quantity = newCart.filter(item => item.id === prod.id).length
        addToDatabaseCart(prod.id, quantity);
    }

    render() {
        return (
            <div className="shop">
                <div className="product-container">
                    <h2>Shop Now</h2>
                    {
                        this.state.products.map(prod => <Product key={prod.id} prodInfo={prod} handleAdd={this.handleAdd}></Product>)
                    }
                </div>
                <div className="cart-container"> 
                    
                    <Cart cart={this.state.cart}/>
                </div>
            </div>
            
        );
    }
}

export default Shop;