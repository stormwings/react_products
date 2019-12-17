import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import List from './components/smart/List/List';
import Edit from './components/smart/Edit/Edit';
import Create from './components/smart/Create/Create';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={List} />
        <Route exact path="/product" component={Create} />
        <Route exact path="/product/:id" component={Edit} />
      </Switch>
    </BrowserRouter>
  );
}
