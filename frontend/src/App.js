import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import Header from "./components/organism/Header";
import Footer from "./components/organism/Footer";
import Home from "./components/pages/Home";
import SignIn from './components/pages/SignIn';
import User from './components/pages/User';
import {useSelector} from 'react-redux';

import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import {setToken} from "./store/slices/logSlice";
import { setUser } from './store/slices/userSlice';
import { getUserData } from "./store/slices/userSlice";

function App() {

  const token = useSelector((state)=> state.log.token);
  
  return (
    <BrowserRouter>
        <Header/>

        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/sign-in" exact element={<SignIn/>} />
          <Route path="/user" exact element={token ? <User /> : <Navigate to="/sign-in" />} />
        </Routes>

        <Footer/>
    </BrowserRouter>
  );
}

export default App;
