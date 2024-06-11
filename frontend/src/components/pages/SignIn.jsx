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
                  // window.location.href = "/user";
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

    // try{
    //   fetch("http://localhost:3001/api/v1/user/login",{
    //     method:"POST",
    //     headers:{
    //       "Content-Type":"application/json",
    //     },
    //     body: JSON.stringify(userInfo)
    //   })
    //   .then(res=>{
    //     if(!res.ok){
    //       return {error : {
    //         code : res.status,
    //         message: res.statusText,
    //       }}
    //     }
    //     return res.json()
    //   })
    //   .then(data=>{
        
    //     if(data.error && data.error.code === 400){
    //       setErrorMessage("Login failed ! Invalid Email or Password ! ")
    //     }else if(data){
    //       localStorage.setItem("token", data.body.token);
    //       dispatch(setToken(localStorage.token));
    //       window.location.href = "/user";
    //     }
    //   })
    // }
    // catch(err){
    //   console.error(err);
    // }
  }

    return(
        <main class="main bg-dark">
      <section class="sign-in-content">
        <i class="fa fa-user-circle sign-in-icon"></i>
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
          <button class="sign-in-button" onClick={handleSubmitBtnClick}>Sign In</button>
        </form>
      </section>
    </main>
    )

}

export default SignIn;