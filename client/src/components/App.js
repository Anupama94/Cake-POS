import React from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Login/Login";
import OrderList from "./OrderList/OrderList";
import OrderDetailsView from "./OrderDetails/OrderDetailsView";
import ProtectedRoute from "../authentication/protectedRoutes";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Login} exact/>
                    <ProtectedRoute path="/OrderList" component={OrderList} exact/>
                    <ProtectedRoute path="/OrderDetails/:id" component={OrderDetailsView} exact/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;