import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onGoModal }) {
  return (
    <div className="Controls">
      <button onClick={() => onGoModal()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onGoModal: PropTypes.func,
};

Controls.defaultProps = {
  onGoModal: () => {},
};

export default React.memo(Controls);
