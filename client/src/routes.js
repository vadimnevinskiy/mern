import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "./pages/LinsPages";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

//Routes
export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        //if isAuthenticated is true, then display the components
        return (
            //Check route
            // If route '/links' will display <LinksPage />
            // If route '/create' will display <CreatePage />
            // If route '/detail' will display <DetailPage />
            // For default route will redirect to <CreatePage />
            <Switch>
                <Route path='/links' exact>
                    <LinksPage />
                </Route>
                <Route path='/create' exact>
                    <CreatePage />
                </Route>
                <Route path='/detail/:id'>
                    <DetailPage />
                </Route>
                <Redirect to='/create' />
            </Switch>
        )
    }
    //if isAuthenticated is false, then display the components <AuthPage />
    //By default redirect to <AuthPage />
    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}
