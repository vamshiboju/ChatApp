import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from "../Images/bubble.svg";
import MaleAvathar from "../Images/MaleAvathar.svg";
import FemaleAvathar from "../Images/FemaleAvathar.svg";

const NavBarUser = (props) => {
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const [login, setlogin] = useState(props.path.login);
    const [signup, setsignup] = useState(props.path.signup);
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData.data.gender);
    return (
        <div className='headerMain'>
            <div className='headerTitle' >
                <Link to='/' >
                    <a>Chat<img src={Logo} alt='Logo' />App</a>
                </Link>
            </div>
            <div className='AccountDetails'>
                <div className='NavBarUser-image'>
                    {userData.data.gender === "male" ? <img className='maleAvatherDiv' src={MaleAvathar} alt='userlogo' /> : <img className='femaleAvatharDiv' src={FemaleAvathar} alt='Userlogo' />}
                </div>
                <h1 className='userName'>{capitalizeFirstLetter(userData.data.name)}</h1>
                <div className='LogoutDiv'>
                    <Link to='/' >
                        <button styles={{ outline: 'none' }}>
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavBarUser