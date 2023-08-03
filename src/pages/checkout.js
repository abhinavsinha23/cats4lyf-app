import styled from "styled-components";
import React from "react";
import '../App.css';

const Checkout = ({basket, totalPrice}) => {
  return (
    <div className="checkout">
      <h1>Checkout Page</h1>
      {basket.map((cat, index) => (
        <div className="cat" key={index}>
          <img className="catPic" src={cat.url} alt="catImage" />
          <p className="text">{cat.name}</p>
          <p className="text">£{cat.price}</p>
          <p className="text">{cat.breed}</p>
        </div>
      ))}
      <h2>Total price: £{totalPrice}</h2>
    </div>
  );
};

export default Checkout;

export const checkoutBtn = styled.div`
  top: 5%;
  left: 50%;
`;
