import React, { useState } from 'react';
import safe from '../../assets/safe.png'
import './Authpage.css'
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useAuthState, useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { doc, setDoc, getDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebase.init';
import { async } from '@firebase/util';
const Authpage = () => {
    const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);
    const [signInWithFacebook, user2, loading2, error2] = useSignInWithFacebook(auth);
    const [user3, loading3, error3] = useAuthState(auth);
    let navigate = useNavigate();





    const [user, setUser] = useState({
        uid: ""
    });
    async function signIn(params) {
        if (loading1 && loading2 && loading3) {
            return <p className='text-danger'>loading</p>
        }
        if (error1 || error2 || error3) {
            console.log(error3 || error2 || error1)
        }
        if (user3) {
            setUser({
                uid: user3.uid
            })

        }
        await setDoc(doc(db, `Users/${user.uid}/ChildList`, "child1"), {
            ActiveStatus: true,
            uid: user.uid
        });
    }


    const GoogleSignIn = (event) => {
        event.preventDefault()
        signInWithGoogle()
        signIn()
    }
    const FaceBookSignIn = (event) => {
        event.preventDefault()
        signInWithFacebook()
        signIn()

    }
    if (user3 || user2 || user1) {
        const getData = async () => {
            const docRef = doc(db, `Users/${user3?.uid}/ChildList/child1/data`, "personal_information");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                navigate('/')
            } else {
                navigate('/BuildProfile')
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getData()

    }
    return (
        <div className='px-5'>
            <div className=' flex justify-center items-center screen'>
                <div class="avatar authpagelogo">
                    <div class="w-24 rounded-full bg-primary">
                        <img className='avatarImg' src={safe} alt="" />
                    </div>
                </div>

            </div>
            <div className='flex justify-center'>
                <div>
                    <h1 className='text-center text-3xl'>WeSafe</h1>
                    <p className='text-center text-2xl mt-5'>Please enter your credential to proceed</p>
                </div>

            </div>
            <div className='flex justify-center mt-10 gap-x-1'>
                <select class="select select-bordered w-32 lg:w-full max-w-xs">
                    <option disabled selected>India(+91)</option>
                    <option>Bangladesh(+880)</option>
                </select>
                <input type="number" placeholder="Phone Number" class="input input-bordered w-full max-w-xs" />

            </div>
            <div className='flex justify-center mt-10'>
                <button className=' btn w-48 bg-primary border-none text-white'>Get OTP</button>
            </div>
            <div className='mt-10'>
                <p className='text-lg font-medium text-center '>OR CONNECT USING</p>
                <p className='text-red'>{error1 && error1?.message.slice(22)}</p>
                <p className='text-red'>{error2 && error2?.message.slice(22)}</p>
                <div className='flex justify-center text-primary gap-x-2 mt-4'>

                    <div onClick={FaceBookSignIn} className=' cursor-pointer border border-primary-100 border-spacing-1'>
                        <FaFacebook></FaFacebook>
                    </div>
                    <div onClick={GoogleSignIn} className='border cursor-pointer border-primary-100'>
                        <FaGoogle></FaGoogle>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authpage;