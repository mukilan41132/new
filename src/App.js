import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Mymoves from './pages/Mymoves.tsx';
import Reports from './pages/Reports';
import Products from './pages/Products';


function App() {
  return (
    <>
      <Router>
        <Navbar />
       
        <Switch>
          <Route path='/' exact component={Mymoves} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
