import React, { useContext } from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import { AuthContext } from "../context/index";
import profileIcon from "../images/profileIcon.svg"

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem("auth", "true")
    }

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem("auth")
    }

    return (
        isAuth
            ?
                <div className="profile">
                    <img
                        src={profileIcon}
                        className="profile_icon"
                    />
                    <div className="profile_information">
                        <h1 className="profile_information_item">Никита Кудряшов</h1>
                        <p className="profile_information_item">+79788144245</p>
                        <p className="profile_information_item">marbtop@gmail.com</p>
                        <MyButton style={{width: "150px"}} onClick={logout}>
                            Выйти из профиля
                        </MyButton>
                    </div>
                </div>
            :
            <div className="login">
                <h1 className="login_text">Войти в профиль</h1>
                <form className="login_form" onSubmit={login}>
                    <MyInput style={{marginBottom: '15px', padding: '8px 15px 8px 15px', width: "250px"}} placeholder="Введите ваш логин" required="true"/>
                    <MyInput style={{marginBottom: '45px', padding: '8px 15px 8px 15px', width: "250px"}} type="password" placeholder="Введите ваш пароль" required="true"/>
                    <MyButton>
                        Войти
                    </MyButton>
                </form>
            </div>
    )
}

export default Login