import React from 'react';
import safe from '../../assets/safe.png'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
const Header = () => {
    const [user, loading, error] = useAuthState(auth)
    let PhotoUrl = JSON.parse(localStorage.getItem("PhotoUrl"))
    return (
        <div class="navbar bg-primary">
            <div class="flex-1">
                <img className='w-12' src={safe} alt="" />
                <a class="btn btn-ghost normal-case text-xl text-white">WeSafe</a>
            </div>
            <div class="flex-none gap-2">
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img src={PhotoUrl ? PhotoUrl : user?.photoURL} alt="" />
                        </div>
                    </label>
                    <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link to='/personalProfile' class="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li className="justify-between">
                            <Link to="/addAnotherProfile">Add another Profile</Link>
                        </li>                        
                        <li className="justify-between">
                            <Link to="#">Contact us</Link>
                        </li>
                        <li><Link to="#">Invite</Link>
                        </li>
                        <li><Link to="#">Delete Account</Link>
                        </li>
                        <li>
                            <Link to="#">Support FAQ'S</Link>
                        </li>
                        <li onClick={() => {
                            signOut(auth)
                        }}> <Link to="/auth">Logout</Link>
                        </li>
                        <li>
                            <Link to="#">Terms of Service</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;