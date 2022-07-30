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
            return <div role="status" className=' h-screen flex justify-center items-center'>
            <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>
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