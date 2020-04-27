import React from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import {ClientPage} from './pages/ClientPage'
import { AuthPage } from './pages/AuthPage'
import { RegisterPage } from './pages/RegisterPage'
import { AdminAuthPage } from './pages/AdminAuthPage'
import {AdminPage} from './pages/AdminPage'

export const useRoutes = (isAuthenticated,decoded) => {

    if (isAuthenticated){

       if (decoded === 'client')
        {
        return (
            <Switch>
            <Route path = "/clientPage" exact>
                <ClientPage/>
            </Route>

            <Redirect to="/clientPage" />
            </Switch>
            )
        }

        if (decoded === 'admin')
        {
            return (
                <Switch>
                <Route path = "/adminPage" exact>
                    <AdminPage/>
                </Route>
    
                <Redirect to="/adminPage" />
                </Switch>
                )
        } 

     /*   {
            return (
                <Switch>
                <Route path = "/clientPage" exact>
                    <ClientPage/>
                </Route>
    
                <Redirect to="/clientPage" />
                </Switch>
                )
            } */


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