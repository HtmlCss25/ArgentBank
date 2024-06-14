import React from "react";
import {useState} from "react";
import FormField from "../molecules/FormField";
import {useDispatch} from "react-redux";
import {setTokenAsync} from "../../store/slices/logSlice";
import { getUserData } from "../../store/slices/userSlice";
import { useNavigate } from 'react-router-dom';

const SignIn = ()=>{
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useDispatch();

  const handleSubmitBtnClick = (e)=>{
    e.preventDefault();
    const userInfo = {
      "email" : document.getElementById("username").value,
      "password": document.getElementById("password").value,
    }

    dispatch(setTokenAsync(userInfo))
      .then((result) => {
        if(result.payload && result.payload.code){
          switch(result.payload.code){
            case 400 : setErrorMessage("Login Failed !")
              break;
            case 500 : setErrorMessage("Server Error")
              break;
            case 200 :
              dispatch(getUserData(result.payload.token))
              .then((res)=>{
                if(res){
                  navigate('/user');
                }
              })
              
              break;
            default:
              break;
          }
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

    return(
        <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {errorMessage && <p>{errorMessage}</p>}
        <form>
          <FormField
            type="text"
            id="username"
            label="Username"
          />
          <FormField
            type="password"
            id="password"
            label="Password"
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