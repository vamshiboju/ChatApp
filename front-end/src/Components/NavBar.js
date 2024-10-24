import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from "../Images/bubble.svg";

const NavBar = (props) => {
    const [login, setlogin] = useState(props.path.login);
    const [signup, setsignup] = useState(props.path.signup);
    return (
        <div className='headerMain'>
            <div className='headerTitle' >
                <Link to='/' >
                    <a>Chat<img src={Logo} alt='Logo' />App</a>
                </Link>
            </div>
            <div className='buttonDiv'>
                <Link to='/' >
                    <button className={login ? "loginOn" : "loginOff"}>Login</button>
                </Link>
                <Link to='/signup'>
                    <button className={signup ? "signOn" : "signOff"}>SignUp</button>
                </Link>
            </div>
        </div>
    )
}

export default NavBar