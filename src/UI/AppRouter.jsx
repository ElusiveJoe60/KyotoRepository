import React, { useContext } from "react";
import { AuthContext } from "../context/index";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../router/routes";
import Loader from "./Loader/Loader";

const AppRouter = () => {
    const {isAuth, setIsLoading} = useContext(AuthContext)

    if (setIsLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Routes>
                {routes.map(route => 
                    <Route
                        key={route.path}
                        element={<route.component/>}
                        path={route.path}
                    />
                )}

                <Route path="/" element={<Navigate to="/products" replace/>}/>
            </Routes>
            :
            <Routes>
                {routes.map(route => 
                    <Route
                        key={route.path}
                        element={<route.component/>}
                        path={route.path}
                    />
                )}

                <Route path="/" element={<Navigate to="/products" replace/>}/>
            </Routes>
    )
}

export default AppRouter