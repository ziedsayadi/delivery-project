import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword))
  }
 
  return <>
    {category &&
      <h2 className='mt-4 ml-3'>{category}</h2>}

    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input name="searchKeyword" className='w-60' onChange={(e) => setSearchKeyword(e.target.value)} />
          <button className='mb-4' type="submit"><i class="fas fa-search"></i></button>
        </form>
      </li>
     
    </ul>
    {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <ul className="products">
          {
            products.map(product =>
              <li key={product._id}>
                <div className="product">
                  <Link to={'/product/' + product._id}>
                    <img className="product-image" src={product.image} alt="product" />

                  </Link>
                  <div className="product-name">
                    <Link to={'/product/' + product._id}>Name: {product.name}</Link>
                  </div>
                  <div className="product-brand">Category: {product.category}</div>
                  <div className="product-brand">Stock: {product.countInStock}</div>
                  <div className="product-price">Price: {product.price} Dt</div>
                  <div className="product-rating">Rating: {product.rating} ★★★★★ {product.numReiews} </div>
                </div>
              </li>)
          }
        </ul>
    }
  </>

}
export default HomeScreen;