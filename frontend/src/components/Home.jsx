import react from 'react';
import productdata from "../assets/data/product.json"
import Product from "./Product"
import Header from './Header';

const  Home = () => {
    return (
    <>  
        <Header />
        <Product />
    </>
    )
}


export default Home ;