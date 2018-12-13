import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/shoppingList'

import { Provider } from 'react-redux';
import store from './Store'
import {Container } from 'reactstrap';
import ItemModal from './components/itemModel'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />  
        </Container>
        
      </div>
      </Provider>
    );
  }
}

export default App;
