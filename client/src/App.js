import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import AdminLayout from "./layouts/Admin/Admin.js"


const hist = createBrowserHistory();

function App() {
  return (
      <Router history={hist}>
        <Route exact path="/dashboard" render={ (props) => <AdminLayout {...props} />} />
      </Router>
  );
}

export default App;
