import { useState } from "react";
import { useBasket } from "../hooks/useContext";
import logo from "../assets/Images/logo-site.png";
import "../styles/navbar.css";


export default function Navbar() {
  const { basket } = useBasket();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  }
const totalPrix = basket.reduce((total, item) => total +parseFloat(item.prix), 0);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo-container">
          <img src={logo} alt="logo indead" />
        </div>
        <div className="navbar_basket">
          <button onClick={togglePopup}>
            {basket.length
              ? `Il y a ${basket.length} articles dans votre panier`
              : "Votre panier est vide"}
          </button>
        </div>
      </nav>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup_inner">
            <h2>Votre Panier</h2>
            <button className="close" onClick={togglePopup}>X</button>
            {basket.length > 0 ? (
              <>
              <ul className="basket_items">
                {basket.map((item, index) => (
                  <li key={index} className="basket_item">
                    <div className="item_details">
                      <p className="item_name">{item.nom}</p>
                      <p className="item_price">{item.prix} {item.devise}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total_price">
              <strong>Total: {totalPrix.toFixed(2)} {basket[0].devise}</strong>
          </div>
          </>
            ) : (
              <p>Votre panier est vide</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}