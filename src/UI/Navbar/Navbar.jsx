import React, { useContext } from "react";
import MyMenu from "../menu/MyMenu";
import loginIcon from "../../images/loginIcon.svg"
import buyIcon from "../../images/buyIcon.svg"
import favoriteIcon from "../../images/favoriteIcon.svg"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    
    return (
        <div>
            <MyMenu/>
            <div className="navbar">
            <div className="navbar_buttons_container">
                <Link to="/products" className="products_link">
                    <h1 className="navbar__main">ShopWave</h1>
                </Link>
                <div className="navbar__links">
                    <ul className="navbar__links__items">
                        <li className="navbar__links__items__list">
                            {isAuth
                                ?
                                <Link to="/login" className="login_link">
                                    <img src={loginIcon} alt="Войти в личный кабинет"/>
                                    <p className="text">Профиль</p>
                                </Link>
                                :
                                <Link to="/login" className="login_link">
                                    <img src={loginIcon} alt="Войти в личный кабинет"/>
                                    <p className="text">Войти</p>
                                </Link>
                            }
                        </li>
                        <li className="navbar__links__items__list">
                            <Link to="/favorite" className="favorite_link">
                                <img src={favoriteIcon} alt="Перейти на страницу избранного"/>
                                <p className="text">Избранное</p>
                            </Link>
                        </li>
                        <li className="navbar__links__items__list">
                            <Link to="/basket" className="basket_link">
                                <img src={buyIcon} alt="Перейти на страницу с корзиной"/>
                                <p className="text">Корзина</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Navbar