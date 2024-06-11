import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {clearToken} from '../../store/slices/logSlice'
import { userNameSelect } from '../../store/slices/userSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = ()=>{
    let navigate = useNavigate();
    const token = useSelector((state)=> state.log.token);
    const userName = useSelector(userNameSelect);
    const dispatch = useDispatch()
    const logout = ()=>{
        dispatch(clearToken());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/');
    }

    return(
        <nav className="main-nav">
            <a className="main-nav-logo" href="/">
                <img
                    className="main-nav-logo-image"
                    src="./img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            <div>
                {token && userName ? 
                    <a className="main-nav-item" onClick={logout}>
                        <i className="fa fa-user-circle"></i>
                        {userName}
                        <span> : Logout</span>
                    </a>
                    :
                    <Link className="main-nav-item" to="./sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign in
                    </Link>
                }
            </div>
        </nav>
    )

}

export default Header;