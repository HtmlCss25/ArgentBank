import React, { useEffect, useState } from "react";
import AccountCard from "../organism/AccountCard";
import {useSelector} from 'react-redux';
import { firstNameSelect, getUserData, lastNameSelect, userNameSelect } from "../../store/slices/userSlice";
import {useDispatch} from "react-redux";
import Modal from "../organism/Modal";

const User = ()=>{

    const token = useSelector((state)=> state.log.token);
    const firstName = useSelector(firstNameSelect);
    const lastName = useSelector(lastNameSelect);
    const [isEditing, setIsEditing] = useState(false);

    const handleCancelClick = ()=>{
        setIsEditing(false);
    }

    if(token){
        return(
            
            <main className="main bg-dark">
                
                <div className="header">
                    <h1>Welcome back<br />{`${firstName} ${lastName} !`}</h1>
                    {!isEditing &&
                        <button className="edit-button" onClick={()=>setIsEditing(!isEditing)}>Edit Name</button>
                    }
                </div>
                
                {isEditing && 
                    <Modal handleCancelClick={handleCancelClick}/>
                }
                <h2 className="sr-only">Accounts</h2>
                <AccountCard 
                    title="Argent Bank Checking (x8349)"
                    amount="2,082.79"
                    description="Available Balance"
                />
                <AccountCard 
                    title="Argent Bank Savings (x6712)"
                    amount="10,928.42"
                    description="Available Balance"
                />
                <AccountCard 
                    title="Argent Bank Credit Card (x8349)"
                    amount="184.30"
                    description="Current Balance"
                />
            </main>
        )
    }


}

export default User;