import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {Register} from './components/Registro/registro'
import NotFound from './components/notFound'
import {Login} from './components/Login/login'
import Layout from './components/layout'

import Context from './Context'

import {Dashboard} from './pages/Dashboard/Dashboard'
import {NotRegisteredUser} from './pages/NotRegisteredUser'
import {Clientes} from './pages/Clientes/clientes'
import {Vehiculos} from './pages/Vehiculos/vehiculos'

function App(){


  return (
      <BrowserRouter>
        <Layout>
          
            <Context.Consumer>
              {
                ({isAuth}) => 
                  isAuth
                    ?
                    <Switch>
                      <Route exact path="/" component={Register}></Route>
                      <Route exact path="/registro" component={Register}></Route>
                      <Route exact path="/login" component={Login}></Route>
                      <Route exact path="/dashboard" component={Dashboard}></Route>
                      <Route exact path="/clientes" component={Clientes}></Route>
                      <Route exact path="/vehiculos" component={Vehiculos}></Route>
                      <Route component={NotFound}></Route>
                    </Switch> 
                    :
                    <NotRegisteredUser>

                    </NotRegisteredUser> 
              }
            </Context.Consumer>
        </Layout>
      </BrowserRouter>
  )
}

export default App;
