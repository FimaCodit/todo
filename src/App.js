import React, { Component } from 'react';
import './App.css';
import RoutedApp from './components/routedApp';

class App extends Component {
  test = () => console.log('test')

  render() {
    return (
      <RoutedApp />
    );
  }
}

export default App;
