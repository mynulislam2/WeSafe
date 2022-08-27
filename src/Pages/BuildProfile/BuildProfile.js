import React from 'react';
import safe from '../../assets/safe.png'
import BuildProfiles from '../../assets/wesafeassets/image/buildProfiles.png'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BuildProfile = () => {
    const navigate = useNavigate()
    const PersonalProfile = () => {
        navigate('/personalProfile')
    }
    return (
        <div className="bg-white h-full ">
            <div className="flex justify-center">
                <div className=' w-3/12 lg:w-1/6 flex justify-center items-center screen'>
                    <div class="avatar BuildProfiles">
                        <div class="w-20 rounded-full bg-primary">
                            <img className='avatarImg w-' src={safe} alt="" />
                        </div>
                    </div>

                </div>
                <div className="items-center flex">
                    <h1 className='text-center text-3xl'>WeSafe</h1>
                </div>
            </div>
            <div className="flex justify-center">
                <img className="img-responsive w-3/6 h-3/6 lg:w-2/6 lg:h-2/6" src={BuildProfiles} alt="buildProfile"></img>
            </div>
            <div>
                <h1 className="text-center text-2xl font-semibold text-black">Build Your Profile</h1>
            </div>
            <div className=' flex justify-center'>
                <div className="w-4/5 lg:w-2/5">
                    <p className="text-center ">
                        Get started by building your personal profile .Your name,address and some badic information.Your personal profile proves to be life saver in case of an emergency.
                    </p>
                </div>


            </div>
            <div onClick={PersonalProfile} className="cursor-pointer flex justify-center py-10 ">
                <div className="bg-primary rounded-full w-10 h-10 relative">
                    <p className="absolute top-3 left-3">
                        <FaArrowRight color="#fff"></FaArrowRight>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BuildProfile;