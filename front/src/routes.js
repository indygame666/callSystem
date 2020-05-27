import React from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import {ClientPage} from './pages/ClientPage'
import { AuthPage } from './pages/AuthPage'
import { RegisterUserPage } from './pages/RegisterUserPage'
import { AdminAuthPage } from './pages/AdminAuthPage'
import { AdminPage } from './pages/AdminPage'
import { ConfigUserPage } from './pages/ConfigUserPage'
import { ConfigAdminPage } from './pages/ConfigAdminPage'
import { RegisterAdminPage } from './pages/RegisterAdminPage'
import {DetailPage} from './pages/DetailPage'

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

                <Route path = "/detail/:id">
                <DetailPage />
                </Route>

                <Route path = "/registerUser" exact>
                    <RegisterUserPage />
                </Route>

                <Route path = "/registerAdmin" exact>
                    <RegisterAdminPage />
                </Route>

                <Route path = "/editAdmin" exact>
                    <ConfigAdminPage/>
                </Route>

                <Route path = "/editUser" exact>
                    <ConfigUserPage />
                </Route>

                
    
                <Redirect to="/adminPage" />
                </Switch>
                )
        } 

    }

    return (
        <Switch>
        <Route path ="/login" exact>
            <AuthPage />
        </Route>

        <Route path ="/admin" exact>
            <AdminAuthPage/>
        </Route>

        <Redirect to="/login"/>
        </Switch>
    )

}