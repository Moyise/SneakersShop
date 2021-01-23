import React from "react";
import "./checkout.css";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav>
      <div>
        {step1 ? <div className="activeBar"></div> : <div className="inactiveBar"></div>}
      </div>
      <div>
        {step2 ? <div className="activeBar"></div> : <div className="inactiveBar"></div>}
      </div>
      <div>
        {step3 ? <div className="activeBar"></div> : <div className="inactiveBar"></div>}
      </div>
      <div>
        {step4 ? <div className="activeBar"></div> : <div className="inactiveBar"></div>}
      </div>
    </nav>
  );
};

export default CheckoutSteps;
