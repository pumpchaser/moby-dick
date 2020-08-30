import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import hist from './history'
import AdminLayout from "./layouts/Admin/Admin.js"
import TokenForm from "./dashboard/TokenForm.js"


function App() {
  return (
      <Router history={hist}>
        <Route exact path="/" render={ (props) => <AdminLayout {...props} />} />
        <Route exact path="/dashboard" render={ (props) => <AdminLayout {...props} />} />
        <Route exact path="/tokens" render={ (props) => <AdminLayout {...props} />} />
        <Route exact path="/tokens/form" render={ (props) => <AdminLayout {...props} />} />

      </Router>
  );
}

export default App;
