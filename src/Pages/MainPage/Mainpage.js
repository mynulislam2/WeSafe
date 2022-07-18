import React from 'react';
import safe from '../../assets/safe.png'
import { FaAngleRight } from "react-icons/fa";

const Mainpage = () => {
    return (
        <div className='bg-accent h-screen'>
            <div class="navbar bg-primary">
                <div class="flex-1">
                    <img className='w-12' src={safe} alt="" />
                    <a class="btn btn-ghost normal-case text-xl text-white">WeSafe</a>
                </div>
                <div class="flex-none gap-2">
                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a class="justify-between">
                                    Profile
                                    <span class="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center  w-2/4'>
                    <div class="text-center bg-accent p-3 rounded-xl">
                        icon
                    </div>
                    <h1 className="text-xl font-semibold">Personal Profile</h1>
                    <p className="text-primary">
                        <FaAngleRight></FaAngleRight>
                    </p>
                </div>
            </div>


        </div>
    );
};

export default Mainpage;