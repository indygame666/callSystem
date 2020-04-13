import React from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import {ClientPage} from './pages/ClientPage'
import { AuthPage } from './pages/AuthPage'
import { RegisterPage } from './pages/RegisterPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return (
            <Switch>
            
            <Route path = "/:id" exact>
                <ClientPage/>
            </Route>

            <Redirect to="/:id" />
            </Switch>
        )
    }

    return (
        <Switch>
        
        <Route path ="/login" exact>
            <AuthPage />
        </Route>

        <Route path = "/register" exact>
            <RegisterPage />
        </Route>

        <Redirect to="/login" />
        </Switch>
    )

}