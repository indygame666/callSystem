import React from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import {ClientPage} from './pages/ClientPage'
import { AuthPage } from './pages/AuthPage'
import { RegisterPage } from './pages/RegisterPage'
import { useAuth } from './hooks/auth.hook'
import { AuthContext} from './context/AuthContext'
import { AdminAuthPage } from './pages/AdminAuthPage'

export const useRoutes = isAuthenticated => {

    if (isAuthenticated){
        return (
            <Switch>
            <Route path = "/clientPage" exact>
                <ClientPage/>
            </Route>

            <Redirect to="/clientPage" />
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

        <Route path ="/admin" exact>
            <AdminAuthPage/>
        </Route>

        <Redirect to="/login"/>
        </Switch>
    )

}