import '../App.css';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '30%',
    height: '90%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


function Home({basket, setBasket, totalPrice, setTotalPrice}) {
const [catData, setCatData] = useState([])
const [modalIsOpen, setIsOpen] = useState(false);
const [selectedCat, setSelectedCat] = useState({});

function openModal(catObject) {
    setSelectedCat(catObject);
    setIsOpen(true);
}

function closeModal() {
    setIsOpen(false);
}

useEffect(() => {
    const fetchCat = async () => {
    const catAPI = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
    const data = await catAPI.json();
    data.map((catObject) => {
        catObject.name = faker.person.fullName();
        catObject.breed = faker.animal.cat();
        catObject.price = faker.commerce.price({ min: 100, max: 1000, dec: 2 });
        catObject.bornIn = faker.location.country();
        catObject.mobileno = faker.phone.number();
        catObject.email = faker.internet.email(); 
        return catObject;
    })
    setCatData(data)
    };
    fetchCat()
}, []);

const addToCart = (price, cat, index) => {
    setTotalPrice(totalPrice + parseFloat(price));
    setBasket([...basket, cat]);
    let catList = [...catData];
    let basketCopy = [...basket];
    basketCopy.push(catList.splice(index,1)[0]);
    setCatData(catList);
    setBasket(basketCopy);
    
};

const removeCart = (index, price) => {
  const updatedBasket = [...basket];
  const removedCat = updatedBasket.splice(index, 1)[0];
  setBasket(updatedBasket);
  setTotalPrice(totalPrice - parseFloat(price));
  setCatData([...catData, removedCat]);
};

return (  
    <div className="App">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className='titleContainer'>
        <p className='shoppingCart'><i class="fa fa-shopping-cart"></i> £{totalPrice.toString()}</p>
      </div>
      <div className="catContainer">
      <div className='availableCats'>
        {catData.map((cat, index) => {
          return (
            <div className="cat" key={index}>
              <img onClick={() => openModal(cat)} className='catPic' src={cat.url} alt="catImage"/>
              <p className='text'>{cat.name}</p>
              <p className='text'>£{cat.price}</p>
              <p className='text'>{cat.breed}</p>
              <button className="btn" onClick={() => addToCart(cat.price, cat, index)}>Add to cart</button>
            </div>            
          )
        })}
        <Modal className="Modal "isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <button className="modalBtn" onClick={closeModal}>Back to browse</button>
          <img className="modalImg"src={selectedCat.url} alt="catModalImg"/>
          <p>Name: {selectedCat.name}</p>
          <p>Price: £{selectedCat.price}</p>
          <p>Breed: {selectedCat.breed}</p>
          <p>Born in: {selectedCat.bornIn}</p>
          <p>Owner's mobile number: {selectedCat.mobileno}</p>
          <p>Owner's email address: {selectedCat.email}</p>
        </Modal>
      </div> 
      <div className="Basket">
        <h1>Basket</h1>
        <h3>Total price: £{totalPrice}</h3>
        <Link to="/checkout">
        <button className='checkoutBtn'>Checkout</button>
        </Link>
        <div className='basketCat'>
        {basket.map((cat, index) => {
          
          return (
            <div to={`/c`} className="cat" key={index}>
              <img className='catPic' src={cat.url} alt="catImage"/>
              <p className="text">{cat.name}</p>
              <p className="text">£{cat.price}</p>
              <p className="text">{cat.breed}</p>
              <button className="btn" onClick={() => removeCart(index, cat.price)}>Remove from cart</button>
            </div>
            
          )
        })}
      </div>
    </div>
    </div>
    </div>
)
}

export default Home;