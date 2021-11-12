import './App.css';
import React,{useState} from "react";
import HomePage from './components/HomePage';
import Alert from "./components/Alert"
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Visiblepage from './components/Visiblepage';

export default function App() {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <div>
      <Router>
            <Navbar/>
            <Alert alert={alert}/>
          <Switch>
          <Route exact path="/">
             <HomePage />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/register">
            <Register showAlert={showAlert}/>
          </Route>
          <Route exact path="/visiblepage">
            <Visiblepage showAlert={showAlert}/>
          </Route>
          <Route exact path="/profile">
            <Profile showAlert={showAlert}/>
          </Route>
          <Route exact path="/editprofile">
            <EditProfile showAlert={showAlert}/>
          </Route>
        </Switch>

      </Router>
    </div>
    
  );
}

