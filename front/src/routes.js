import React from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import {ClientPage} from './pages/ClientPage'
import { AuthPage } from './pages/AuthPage'

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
        
        <Route path ="/" exact>
            <AuthPage />
        </Route>
        <Redirect to="/" />
        </Switch>
    )

}