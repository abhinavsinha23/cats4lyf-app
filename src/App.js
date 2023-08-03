import './App.css';
import { BrowserRouter, Routes, Route, Link,} from 'react-router-dom';
import styled from "styled-components";
import Checkout from './pages/checkout';
import { useState } from 'react';
import Home from './pages/Home';

function App() {  
  const [basket, setBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  return (  
    <div className="App">
      <BrowserRouter>  
      <Wrapper>
        <h1 className='cats4LyfTitle'>Cats4Lyf</h1>
        <NavBarItem to='/'>Home</NavBarItem>
        <NavBarItem to='/checkout'>Checkout</NavBarItem>
      </Wrapper>
      <Routes>
        <Route path='/' element={<Home basket={basket} setBasket={setBasket} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}></Route>
        <Route path="/checkout" element={<Checkout basket={basket} totalPrice={totalPrice}/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
  
}
export default App;


export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0091d5;
`;

const NavBarItem = styled(Link)`
  font-size: 16px;
  margin-right: 5%;
  margin-left: 5%;
  padding-top: 1%;
  padding-bottom: 1%;
  color: white;
  &:hover {
    opacity: 0.3;
    cursor: pointer;
    text-decoration: underline;
  }
`;