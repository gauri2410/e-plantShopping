import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import { allPlants, plantCategories, plantsArray } from './data/plants';
import Navbar from './components/Navbar';

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartIds = new Set(cartItems.map((item) => item.id));
  const [addedToCart, setAddedToCart] = useState({});
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar />
      <main className="listing-page product-list">
        <div className="product-list-navbar">
          <span>Plant categories: {plantsArray.length}</span>
          <span className="cart-icon" aria-label={`${cartQuantity} items in cart`}>🛒 {cartQuantity}</span>
        </div>
      <section className="listing-hero">
        <p className="eyebrow">The plant edit</p>
        <h1>Find your new <i>favorite</i> leaf.</h1>
        <p>Curated houseplants for sunny windows, cozy corners, and everything in between.</p>
        <span className="plant-count">{allPlants.length} plants · 3 collections</span>
      </section>
      {plantCategories.map((category) => (
        <section className="category-section product-list" key={category.name}>
          <div className="category-heading">
            <div>
              <p className="eyebrow">Collection</p>
              <h2>{category.name}</h2>
            </div>
            <p>{category.description}</p>
          </div>
          <div className="product-grid">
            {category.plants.map((plant) => {
              const isAdded = Boolean(addedToCart[plant.name]) || cartIds.has(plant.id);
              return (
                <article className="product-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <div className="product-info">
                    <div>
                      <h3>{plant.name}</h3>
                      <p>Easy-care houseplant</p>
                    </div>
                    <strong>${plant.price.toFixed(2)}</strong>
                  </div>
                  <button
                    className={isAdded ? 'add-button added' : 'add-button'}
                    disabled={addedToCart[plant.name]}
                    onClick={() => {
                      dispatch(addItem({ ...plant, cost: plant.price }));
                      setAddedToCart((current) => ({ ...current, [plant.name]: true }));
                    }}
                  >
                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      ))}
      </main>
    </>
  );
}
