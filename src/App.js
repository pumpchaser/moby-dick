import React from 'react';
import { Router,  Route } from "react-router-dom";

import hist from './history'
import AdminLayout from "./layouts/Admin/Admin.js"


function App() {
  return (
      <Router history={hist}>
        <Route exact path="/" render={ (props) => <AdminLayout {...props} />} />
        <Route exact path="/dashboard" render={ (props) => <AdminLayout {...props} />} />
        <Route exact path="/tokens" render={ (props) => <AdminLayout {...props} />} />
        <Route exact path="/token/form" render={ (props) => <AdminLayout {...props} />} />
        <Route path="/tokens/:name" render={ (props) => <AdminLayout {...props} />} />
      </Router>
  );
}

export default App;
