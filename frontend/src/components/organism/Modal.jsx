import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import {useSelector} from 'react-redux';
import {useDispatch} from "react-redux";
import { firstNameSelect, lastNameSelect, setUser, userNameSelect } from "../../store/slices/userSlice";

const Modal = ({handleCancelClick})=>{
    
    const userName = useSelector(userNameSelect);
    const firstName = useSelector(firstNameSelect);
    const lastName = useSelector(lastNameSelect);
    const token = useSelector((state)=> state.log.token);
    const dispatch = useDispatch();
    const [inputValue,setInputValue] = useState(userName)

    const postRequestUserName = (newUserName, token)=>{
        fetch('http://localhost:3001/api/v1/user/profile',{
            method : 'PUT',
            headers:{
                "Authorization" : `Bearer ${token.token}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({"userName": newUserName})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur : ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            
            dispatch(setUser(data.body))
            handleCancelClick();
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
    }

    const handleInputChange = (e)=>{
        setInputValue(e.target.value);
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        if(inputValue.length > 0){
            postRequestUserName(inputValue, token);
        }
    }

    return(
        <section className='sign-in-content edit-modal'>
        <h2>Edit user info</h2>
            <form onSubmit={handleFormSubmit}>
                <FormField
                    type="text"
                    id="username"
                    label="User name"
                    value={inputValue}
                    handleChange ={handleInputChange}
                />
                <FormField
                    type="text"
                    id="firstname"
                    label="First name"
                    disabled={true}
                    value={firstName}
                />
                <FormField
                    type="text"
                    id="lastname"
                    label="Last name"
                    disabled={true}
                    value={lastName}
                />
                <input type="submit" value="Save" className='edit-button modal-button'/>
                <button onClick={handleCancelClick} className='edit-button modal-button'>Cancel</button>
            </form>
        </section>
    )

}

export default Modal;