import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onGoModal, cart }) {
  const totalPrice = Object.values(cart).reduce(
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

  const uniqueItemCount = Object.keys(cart).length;

  const cartInfoText =
    uniqueItemCount > 0
      ? `${uniqueItemCount} ${getTotalItemsPlural(
          uniqueItemCount
        )} / ${totalPrice} ₽`
      : "пусто";

  return (
    <div className="Controls">
      <div className="cart-info">
        <p className="in-backer">В корзине:</p>
        <p className="total-info">{cartInfoText}</p>
      </div>
      <button className="open-modal" onClick={() => onGoModal()}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  onGoModal: PropTypes.func,
  cart: PropTypes.object,
};

Controls.defaultProps = {
  onGoModal: () => {},
  cart: {},
};

export default React.memo(Controls);
