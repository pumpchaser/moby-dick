import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';


function App() {
  return (
      <Router>
        <Layout>
          <Route exact path="/" render={ () => <Dashboard />}/>
        </Layout>
      </Router>
  );
}

export default App;
