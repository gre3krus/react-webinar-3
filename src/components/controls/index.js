import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onGoModal, cart }) {
  const totalItems = cart.reduce((total, item) => total + item.count, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );
  const ruPluralRules = new Intl.PluralRules("ru");

  const getTotalItemsPlural = (totalItems) => {
    const rule = ruPluralRules.select(totalItems);
    if (rule === "few") {
      return "товара";
    } else if (rule === "one") {
      return "товар";
    } else {
      return "товаров";
    }
  };

  return (
    <div className="Controls">
      <div className="cart-info">
        <p className="in-backer">В корзине:</p>
        <p className="total-info">
          {`${totalItems} ${getTotalItemsPlural(totalItems)} / ${totalPrice} ₽`}
        </p>
      </div>
      <button className="open-modal" onClick={() => onGoModal()}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  onGoModal: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      count: PropTypes.number,
    })
  ),
};

Controls.defaultProps = {
  onGoModal: () => {},
  cart: [],
};

export default React.memo(Controls);
