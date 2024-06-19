import React from "react";
import {useState} from "react";
import FormField from "../molecules/FormField";
import {useDispatch, useSelector} from "react-redux";
import {setTokenAsync} from "../../store/slices/logSlice";
import { useNavigate } from 'react-router-dom';

const SignIn = ()=>{
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const error = useSelector((state) => state.log.error);

  const handleSubmitBtnClick = (e)=>{
    e.preventDefault();
    const userInfo = {
      "email" : email,
      "password": password
    }

    dispatch(setTokenAsync(userInfo))
      .then(() => {
        navigate('/user');
      })
  }

    return(
        <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {error && <p>{`${error.code} : ${error.message}`}</p>}
        <form>
          <FormField
            type="text"
            id="username"
            label="Username"
            value={email}
            handleChange ={(e)=>{setEmail(e.target.value)}}
          />
          <FormField
            type="password"
            id="password"
            label="Password"
            value={password}
            handleChange ={(e)=>{setPassword(e.target.value)}}
          />
          <FormField
            type="checkbox"
            id="remember-me"
            label="Remember me"
          />
          <button className="sign-in-button" onClick={handleSubmitBtnClick}>Sign In</button>
        </form>
      </section>
    </main>
    )

}

export default SignIn;