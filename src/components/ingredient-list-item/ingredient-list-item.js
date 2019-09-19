import React from 'react';
import './ingredient-list-item.css';

const IngredientListItem = ({ ingredient, onAddedToCart }) => {
  const { name, timeCook, imageSrc } = ingredient;
  return (
    <div className="ingredient-list-item">
      <div className="ingredient-list-item">
        <div className="ingredient-cover">
          <img src={`http://localhost:8080/images/${imageSrc}`} alt="pizza" />
        </div>
        <div className="ingredient-details">
          <div className="ingredient-name">{name}</div>
          <div className="ingredient-time">
            time for preparing: {timeCook} {' '} sec
          </div>
          <button
            onClick={onAddedToCart}
            className="btn btn-info add-to-cart"
          >
Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientListItem;
