import styled from "styled-components";
import React from "react";
import "../App.css";

const Checkout = ({ basket, totalPrice }) => {
  return (
    <div className="checkoutCont">
      <div className="checkoutTitle">
        <h1>Checkout Page</h1>
      </div>
      <div className="catContainer">
        {basket.map((cat, index) => (
          <div className="cat" key={index}>
            <img className="catPic" src={cat.url} alt="catImage" />
            <p className="text">{cat.name}</p>
            <p className="text">£{cat.price}</p>
            <p className="text">{cat.breed}</p>
          </div>
        ))}
      </div>
      <div className="totalPrice">
        <h2>Total price: £{totalPrice}</h2>
      </div>
    </div>
  );
};

export default Checkout;

export const CheckoutButton = styled.div`
  top: 5%;
  left: 50%;
`;

export const StyledCheckout = styled(Checkout)`
  .catContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;
