import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { Router } from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './config/global/style.css'

function App() {
  return (
     <React.Fragment>
        <Router></Router>
     </React.Fragment>
  );
}

export default App;
