import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function PageLayout({ children, isModalOpen, closeModal }) {
  return (
    <div className="PageLayout">
      <div className="center">
        {children}
        {isModalOpen && (
          <div className="modalWindow">
            <div className="head">
              <h2>Корзина</h2>
              <button className="exit" onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default React.memo(PageLayout);
