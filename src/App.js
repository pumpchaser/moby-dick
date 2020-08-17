import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from './components/Layout';


function App() {
  return (
      <Router>
        <Layout>
          <Route exact path="/" />
        </Layout>
      </Router>
  );
}

export default App;
