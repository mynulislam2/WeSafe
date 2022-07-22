import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, storage, db } from '../../firebase.init';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Header from '../../Component/Header/Header';
const PersonalProfile = () => {
    const [user, loading, error] = useAuthState(auth)
    const [Date, setDate] = useState("")
    const [Gender, setGender] = useState("")
    const [File, setFile] = useState("")
    const navigate = useNavigate()
    const BloodGroups = [
        "A +ve",
        "A -ve",
        "B +ve",
        "B -ve",
        "AB -ve",
        "AB +ve",
        "O +ve",
        "O -ve",
    ]
    const [PersonalProfiles, setPersonalProfiles] = useState({
        name: "",
        email: "",
        addressCity: "",
        addressCountry: "",
        addressState: "",
        addressPinCode: "",
        addressHouse: "",
        addressLocality: "",
        height: "",
        weight: "",
        gender: "",
        dob: "",
        bloodGroup: "",
        phoneNumber: "",
        info_type: "",
        profilePicUrl: ""
    })

    const Profile = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            var file = e.target.files[0];
            const imageRef = ref(storage, `Users/${user?.uid}/child1/${file.name}`)
            const uploadTask = uploadBytesResumable(imageRef, file)
            uploadTask.on('state_changed',
                (snapshot) => {
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFile(downloadURL);
                        localStorage.setItem("PhotoUrl", JSON.stringify(downloadURL));

                    });
                }
            );
        }
        input.click();
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const name = await event.target.name.value||user.displayName
        const email = await event.target.email.value||user.email
        const phoneNumber = await event.target.number.value
        const addressHouse = await event.target.houseNumber.value
        const addressLocality = await event.target.houseName.value
        const addressCountry = await event.target.country.value
        const addressState = await event.target.state.value
        const addressCity = await event.target.city.value
        const addressPinCode = await event.target.pincode.value
        const dob = Date
        const gender = Gender
        const height = await event.target.height.value + " " + event.target.heightUnit.value
        const weight = await event.target.weight.value + " " + event.target.weightUnit.value
        const bloodGroup = await event.target.bloodGroup.value
        setPersonalProfiles({
            name,
            email,
            addressCity,
            addressCountry,
            addressState,
            addressPinCode,
            addressHouse,
            addressLocality,
            gender,
            dob,
            height,
            weight,
            bloodGroup,
            phoneNumber,
            info_type: "personal_profile",
            profilePicUrl: File || user.photoURL
        })
        await setDoc(doc(db, `Users/${user?.uid}/ChildList/child1/data`, "personal_information"), {
            ...PersonalProfiles
        });

        // await setDoc(doc(db, `Users/${user?.uid}/ChildList`,"child2"), {
        //     ActiveStatus: true,
        //     uid: user.uid
        // });
    }

    if (PersonalProfiles.info_type) {
        localStorage.setItem("PersonalProfiles", JSON.stringify(PersonalProfiles));
    }
    let PersonalProfilesData = JSON.parse(localStorage.getItem("PersonalProfiles"))
    let PhotoUrl = JSON.parse(localStorage.getItem("PhotoUrl"))
    if (PersonalProfiles.info_type){
        navigate("/")

    }
        return (
            <div className="">
                <Header></Header>
                <h1 className='text-center text-3xl mt-2 font-semibold'>Personal Profile</h1>
                <div className="flex justify-center">
                    <div className="mb-2">
                        <div className="flex justify-center mt-10">
                            <div className="relative">
                                <div className="avatar ">
                                    <div className="w-24 rounded-full">
                                        <img src={PhotoUrl ? PhotoUrl : user?.photoURL} alt="" />
                                    </div>
                                </div>
                                <div onClick={Profile} className="cursor-pointer flex justify-center absolute top-14 left-14 ">
                                    <div className="bg-primary rounded-full w-10 h-10 relative border-white border-solid border-2">
                                        <p className="absolute top-2 left-3">
                                            <FaPen style={{ color: 'white' }}></FaPen>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">name <span className=' text-red-600'>*</span></span>
                                </label>
                                <input type="text" defaultValue={user?.displayName} required name="name" placeholder="Mynul" className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Phone Number </span>
                                </label>
                                <input defaultValue={PersonalProfilesData?.phoneNumber} type="number" name='number' placeholder="ex. 790 340 8392" className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email </span>
                                </label>
                                <input type="email" defaultValue={user?.email} name='email' placeholder="ex. abc@gmail.com" className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Date of Birth </span>
                                </label>
                                <input onChange={(e) => setDate(e.target.value)} type="date" placeholder="ex. 02/03/2004" className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Address </span>
                                </label>
                                <input defaultValue={PersonalProfilesData?.addressHouse} type="text" name='houseNumber' placeholder="House no/Flat no" className="input input-bordered w-full max-w-xs" />
                                <input defaultValue={PersonalProfilesData?.addressLocality} type="text" name="houseName" placeholder="HouseLocality" className="input input-bordered w-full max-w-xs mt-2" />
                                <div className='flex gap-2'>
                                    <input defaultValue={PersonalProfilesData?.addressCountry} type="text" name="country" placeholder="Country" className="input input-bordered w-full max-w-xs mt-2" />
                                    <input defaultValue={PersonalProfilesData?.addressState} type="text" name="state" placeholder="State" className="input input-bordered w-fullState" class="input input-bordered w-full max-w-xs mt-2" />
                                </div>
                                <div className='flex gap-2'>
                                    <input defaultValue={PersonalProfilesData?.addressCity} type="text" name="city" placeholder="City" className="input input-bordered w-full max-w-xs mt-2" />
                                    <input defaultValue={PersonalProfilesData?.addressPinCode} type="text" name='pincode' placeholder="Pin Code" className="input input-bordered w-full max-w-xs mt-2" />

                                </div>
                                <label className="label">
                                </label>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Gender </span>
                                </label>
                                <div className='flex gap-x-2'>
                                    <a onClick={() => setGender("Female")} className={`btn ${Gender == "Female" ? "bg-gray-900 text-white" : "text-secondary"}  bg-base-100  hover:text-white border-primary`}>Female</a>
                                    <a onClick={() => setGender("Male")} className={`btn ${Gender == "Male" ? "bg-gray-900 text-white" : "text-secondary"}  bg-base-100  hover:text-white border-primary`}>Male</a>
                                    <a onClick={() => setGender("Others")} className={`btn ${Gender == "Others" ? "bg-gray-900 text-white" : "text-secondary"}  bg-base-100  hover:text-white border-primary`}>Others</a>
                                </div>
                            </div>
                            <div className="form-control  w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Height </span>
                                </label>
                                <div className='flex'>
                                    <input defaultValue={Number(PersonalProfilesData?.height.split(" ")[0])} name="height" type="number" placeholder="Height" className="input input-bordered w-44 max-w-xs" />
                                    <select name="heightUnit" className="select select-bordered">
                                        <option value="Cms">cms</option>
                                        <option value="Feet">Feets</option>
                                    </select>
                                </div>

                            </div>
                            <div className="form-control  w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Weight </span>
                                </label>
                                <div className="flex">
                                    <input defaultValue={Number(PersonalProfilesData?.weight.split(" ")[0])} type="number" placeholder="Weight" name="weight" className="input input-bordered w-44 max-w-xs" />
                                    <select name="weightUnit" className="select select-bordered">
                                        <option value="kgs">kgs</option>
                                        <option value="Ibs">Ibs</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select name='bloodGroup' className="select select-bordered">
                                    {
                                        BloodGroups.map((data) => <option value={data}>{data}</option>)
                                    }
                                </select>

                            </div>
                            <div className="flex justify-center mb-5 mt-5">
                                <input type="submit" value="Save" className="btn btn-primary px-36 " />
                            </div>
                        </form>
                    </div>

                </div>


            </div >

        );
};

export default PersonalProfile;