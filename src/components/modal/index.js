import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import item from "../item";

function ModalWindow({
  isModalOpen,
  closeModal,
  cart,
  getTotalPrice,
  removeFromCart,
}) {
  const handleClick = (itemCode) => {
    removeFromCart(itemCode);
  };

  const modalClassName = `modal ${isModalOpen ? "opened" : ""}`;
  return (
    <div className="modal">
      <div className={modalClassName}>
        <div className="overlay" onClick={closeModal}></div>
      </div>
      {isModalOpen && (
        <div className="modalWindow">
          <div className="head">
            <span className="text">Корзина</span>
            <button className="exit" onClick={closeModal}>
              Закрыть
            </button>
          </div>
          <div className="cart">
            {cart.map((item) => (
              <div key={item.code} className="cart-item">
                <div className="title-column">
                  <div>{item.code}</div>
                  <div>{item.title}</div>
                </div>
                <div className="product-column">
                  <div className="visualPrice">{item.visualPrice}</div>
                  <div>{`${item.count} шт`}</div>
                  <button onClick={() => handleClick(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
            <div className="div-price">
              <p className="total-price">Итого</p>
              <p className="total-price">{getTotalPrice()} ₽</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ModalWindow.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
    })
  ),
};

ModalWindow.defaultProps = {
  isModalOpen: false,
  closeModal: () => {},
  cart: [],
};

export default React.memo(ModalWindow);
