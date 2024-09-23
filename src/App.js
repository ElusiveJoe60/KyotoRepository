import React, { useEffect, useState } from "react";
import "./styles/App.css"
import "./styles/normalize.css"
import Navbar from "./UI/Navbar/Navbar";
import Footer from "./UI/footer/Footer"
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./UI/AppRouter"
import { AuthContext } from "./context";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(localStorage.getItem("auth")) {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </AuthContext.Provider>

  );

}

export default App;
