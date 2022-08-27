import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, storage, db } from '../../firebase.init';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import Header from '../../Component/Header/Header';
const PersonalProfile = ({setSwitcheduser,Switcheduser,setActiveusers,Activeusers}) => {
    const child=Switcheduser||"child1"
    const [user, loading, error] = useAuthState(auth)
    const [Date, setDate] = useState("")
    const [Gender, setGender] = useState("")
    const [File, setFile] = useState("")
    const [FileUploading, setFileUploading] = useState(false)
    const navigate = useNavigate()
    const forceUpdate = React.useReducer(bool => !bool)[1];
const ActiveUser=JSON.parse( localStorage.getItem('activeUser'))
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
    const [ShowedProfile, setShowedProfile] = useState({})
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
            const imageRef = ref(storage, `Users/${user?.uid}/${child}/${file.name}`)
            const uploadTask = uploadBytesResumable(imageRef, file)
            uploadTask.on('state_changed',
                (snapshot) => {
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            setFileUploading(true)
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL)
                        setFile(downloadURL);
                        localStorage.setItem("PhotoUrl", JSON.stringify(downloadURL));
                        setFileUploading(false)
                    });
                }
            );
        }
        input.click();
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const name = await event.target.name.value || user.displayName
        const email = await event.target.email.value || user.email
        const phoneNumber = await event.target.number.value
        const addressHouse = await event.target.houseNumber.value
        const addressLocality = await event.target.houseName.value
        const addressCountry = await event.target.country.value
        const addressState = await event.target.state.value
        const addressCity = await event.target.city.value
        const addressPinCode = await event.target.pincode.value
        const dob = Date
        const gender = Gender||""
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
            profilePicUrl:File ||user.photoURL
        })
        // await setDoc(doc(db, `Users/${user?.uid}/ChildList`,"child2"), {
        //     ActiveStatus: true,
        //     uid: user.uid
        // });
        setSwitcheduser(ActiveUser)
        localStorage.setItem("activeUser", JSON.stringify(child))
    }

    if (PersonalProfiles.info_type) {
        setDoc(doc(db, `Users/${user?.uid}/ChildList/${child}/data`, "personal_information"), {
            ...PersonalProfiles
        });
        setDoc(doc(db, `Users/${user?.uid}/ChildList/${child}`), {
            ActiveStatus: true,
            uid: user?.uid
        });
        setDoc(doc(db, `Users/${user?.uid}`), {
            ActiveStatus: true
        });
        localStorage.setItem("PersonalProfiles", JSON.stringify(PersonalProfiles));
    }
    let PersonalProfilesData = JSON.parse(localStorage.getItem("PersonalProfiles"))
    let PhotoUrl = JSON.parse(localStorage.getItem("PhotoUrl"))
    if (PersonalProfiles.info_type) {
        navigate("/")

    }
    useEffect(() => {
        const getPersonalInfo = async () => {
            const querySnapshot = await getDocs(collection(db, `Users/${user?.uid}/ChildList/${ActiveUser}/data`));
            querySnapshot.forEach(async (docs) => {
                
                setShowedProfile(docs.data())
                forceUpdate();
            })
        }
        getPersonalInfo()
        setGender(ShowedProfile?.gender)

}, [ShowedProfile?.gender]);
console.log(ShowedProfile)
    return (
        <div className="">
            <Header setSwitcheduser={setSwitcheduser} Switcheduser={Switcheduser} setActiveusers={setActiveusers} Activeusers={Activeusers}></Header>
            <h1 className='text-center text-3xl mt-2 font-semibold'>Personal Profile</h1>
            <div className="flex justify-center">
                <div className="mb-2">
                    <div className="flex justify-center mt-10">
                        <div className="relative">
                            <div className="avatar ">
                                <div className={`w-24 rounded-full ${FileUploading&&"animate-pulse"}`}>
                                    <img src={File||ShowedProfile?.profilePicUrl||user?.photoURL} alt="" />
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
                            <input type="text" defaultValue={ ShowedProfile?.name?ShowedProfile?.name:user.name } required name="name" placeholder="Mynul" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Phone Number </span>
                            </label>
                            <input defaultValue={ShowedProfile?.phoneNumber} type="number" name='number' placeholder="ex. 790 340 8392" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email </span>
                            </label>
                            <input type="email" defaultValue={user?.email || ShowedProfile?.email} name='email' placeholder="ex. abc@gmail.com" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Date of Birth </span>
                            </label>
                            <input onChange={(e) => setDate(e.target.value)} defaultValue={ShowedProfile?.dob} type="date" placeholder="ex. 02/03/2004" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Address </span>
                            </label>
                            <input defaultValue={ ShowedProfile?.addressHouse} type="text" name='houseNumber' placeholder="House no/Flat no" className="input input-bordered w-full max-w-xs" />
                            <input defaultValue={ ShowedProfile?.addressLocality} type="text" name="houseName" placeholder="HouseLocality" className="input input-bordered w-full max-w-xs mt-2" />
                            <div className='flex gap-2'>
                                <input defaultValue={ ShowedProfile?.addressCountry} type="text" name="country" placeholder="Country" className="input input-bordered w-full max-w-xs mt-2" />
                                <input defaultValue={ ShowedProfile?.addressState} type="text" name="state" placeholder="State" className="input input-bordered w-fullState" class="input input-bordered w-full max-w-xs mt-2" />
                            </div>
                            <div className='flex gap-2'>
                                <input defaultValue={ ShowedProfile?.addressCity} type="text" name="city" placeholder="City" className="input input-bordered w-full max-w-xs mt-2" />
                                <input defaultValue={ ShowedProfile?.addressPinCode} type="text" name='pincode' placeholder="Pin Code" className="input input-bordered w-full max-w-xs mt-2" />

                            </div>
                            <label className="label">
                            </label>
                        </div>
                        <div className="form-control  w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Gender </span>
                            </label>
                            <div className='flex gap-x-2'>
                                <a onClick={() => setGender("Female")} className={`btn ${Gender == "Female" ? "bg-gray-900 text-white" : "text-secondary"} bg-white  hover:text-white border-primary`}>Female</a>
                                <a onClick={() => setGender("Male")} className={`btn ${Gender == "Male" ? "bg-gray-900 text-white" : "text-secondary"}   bg-white hover:text-white border-primary`}>Male</a>
                                <a onClick={() => setGender("Others")} className={`btn ${Gender == "Others" ? "bg-gray-900 text-white" : "text-secondary"} bg-white   hover:text-white border-primary`}>Others</a>
                            </div>
                        </div>
                        <div className="form-control  w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Height </span>
                            </label>
                            <div className='flex'>
                                <input defaultValue={ShowedProfile?.height?.split(" ")[0]} name="height" type="number" placeholder="Height" className="input input-bordered w-44 max-w-xs" />
                                <select name="heightUnit" className="select select-bordered">
                                    <option selected={ShowedProfile?.height?.split(" ")[1]=="Cms"?true:false} value="Cms">cms</option>
                                    <option  selected={ShowedProfile?.height?.split(" ")[1]=="Feet"?true:false} value="Feet">Feets</option>
                                </select>
                            </div>

                        </div>
                        <div className="form-control  w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Weight </span>
                            </label>
                            <div className="flex">
                                <input defaultValue={ShowedProfile?.weight?.split(" ")[0]} type="number" placeholder="Weight" name="weight" className="input input-bordered w-44 max-w-xs" />
                                <select name="weightUnit" className="select select-bordered">
                                    <option  selected={ShowedProfile?.weight?.split(" ")[1]=="kgs"?true:false} value="kgs">kgs</option>
                                    <option  selected={ShowedProfile?.weight?.split(" ")[1]=="Ibs"?true:false} value="Ibs">Ibs</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>
                            <select  name='bloodGroup' className="select select-bordered">
                                <option >Select</option>

                                {
                                    BloodGroups.map((data) => <option selected={data==ShowedProfile?.bloodGroup?true:false} value={data}>{data}</option>)
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