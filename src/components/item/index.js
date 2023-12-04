import React, { useState } from "react";
import PropTypes from "prop-types";

import "./style.css";

function Item(props) {
  const handleAddToCart = () => {
    props.addToCart(props.item);
  };
  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.visualPrice}</div>
      <div className="Item-actions">
        <button className="addCart" onClick={handleAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);
