import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase.init';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import Features from '../Features/Features';
import { Link } from "react-router-dom"
import { MdArrowBack } from "react-icons/md";
import swal from 'sweetalert';
import './TakenFeatures.css'

const TakenFeatures = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [profile, setProfile] = useState({})
    const [user, loading, error] = useAuthState(auth)
    const [dataChecked, setDataChecked] = useState(true)
    const navigate = useNavigate()
    const deleteDocument = (docid) => {
        swal("Are you sure To Delete?", {
            buttons: ["Cancel", true],

        })
            .then((res) => {
                if (res === true) {
                    const DeletedocRef = doc(db, `Users/${user?.uid}/ChildList/child1/data/${id}/${id}/${docid}`);
                    deleteDoc(DeletedocRef)
                        .then(() => {
                            const newData = data.filter(doc => doc.docId !== docid);
                            setData(newData)
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
    }
    if (loading) {
        return <div role="status" className=' h-screen flex justify-center items-center'>
            <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>
    }
    const getData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, `Users/${user?.uid}/ChildList/child1/data/${id}/${id}`));
            let AllData = []

            querySnapshot.forEach((doc) => {
                AllData.push(doc.data())
            });
            setData(AllData)
            setDataChecked(false)
        }
        catch (err) {
            console.error(err);
        }

    }
    if (data.length == 0) {
        getData()
        if (dataChecked) {
            return <div role="status" className=' h-screen flex justify-center items-center'>
                <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
            
        }
        else {

            return <Features></Features>
        }
    }






    if (data.length > 0) {
        return (
            <>
                <div className="bg-primary relative h-14 flex justify-center items-center">
                    <p className="absolute left-6 font-medium cursor-pointer" onClick={() => navigate('/')}><MdArrowBack color='#fff' fontSize={25} /></p>
                    <p className="text-white font-medium text-lg">
                        {id == "emergencycont" && "Emergency Contacts"}
                        {id == "mediccond" && "Medical Conditions"}
                        {id !== "emergencycont" && id !== "mediccond" && id.charAt(0).toUpperCase() + id.slice(1)}

                    </p>
                </div>
                <div className=' relative' style={{ height: "80vh" }}>

                    {
                        data?.map((data) => {
                            return <div className=' w-11/12 mx-auto bg-white p-5 rounded-xl mt-5'>
                                <h1 className="font-medium">
                                    {
                                        data['Emergency Contact Name']
                                    }
                                    {
                                        data['Medical Name']
                                    }
                                    {
                                        data['Medication Name']
                                    }
                                    {
                                        data['Allergies Name']
                                    }
                                    {
                                        data['Vaccinations Name']}
                                    {
                                        data['Procedures Name']}
                                    {
                                        data['insurancename']
                                    }
                                </h1>
                                <hr className='my-2' />
                                <div className='flex justify-between'>
                                    <div>{
                                        data['Emergency Contact Relation'] ? <p className='text-slate-500'>Relation:{
                                            data['Emergency Contact Relation']
                                        }
                                        </p> : ""

                                    }
                                        {
                                            data['Emergency Contact Number'] ? <p className=' text-slate-500'>Phone Number:{
                                                data['Emergency Contact Number']
                                            }
                                            </p> : ""
                                        }
                                        {
                                            data['Medical Notes'] ? <p className=' text-slate-500'>Notes: {data['Medical Notes']}</p> : ''
                                        }
                                        {
                                            data['Medication Notes'] ? <p className=' text-slate-500'>Notes: {data['Medication Notes']}</p> : ''
                                        }
                                        {
                                            data['Medication Dosage'] ? <p className=' text-slate-500'>Dosage: {data['Medication Dosage']}</p> : ""
                                        }
                                        {
                                            data['Medication Frequency'] ? <p className=' text-slate-500'>Frequency: {data['Medication Frequency']}</p> : ''
                                        }
                                        {
                                            data['Allergies Notes'] ? <p className=' text-slate-500'>Notes: {data['Allergies Notes']}</p> : ''
                                        }
                                        {
                                            data['Vaccinations Notes'] ? <p className=' text-slate-500'>Notes: {data['Vaccinations Notes']}</p> : ''
                                        }
                                        {
                                            data['Vaccinations Date'] ? <p className=' text-slate-500'>Date: {data['Vaccinations Date']}</p> : ''
                                        }
                                        {
                                            data['Procedures Notes'] ? <p className=' text-slate-500'>Notes: {data['Procedures Notes']}</p> : ''
                                        }
                                        {
                                            data['Procedures Status'] ? <p className=' text-slate-500'>Status: {data['Procedures Status']}</p> : ''
                                        }

                                        {
                                            data['Procedures Doctor Name'] ? <p className=' text-slate-500'>Doctor's Name: {data['Procedures Doctor Name']}</p> : ''
                                        }
                                        {
                                            data['Procedures Doctor Phone Number'] ? <p className=' text-slate-500'>Doctor's Number: {data['Procedures Doctor Phone Number']}</p> : ''
                                        }
                                        {
                                            data['Procedures Date of Procedure'] ? <p className=' text-slate-500'>Date of operation: {data['Procedures Date of Procedure']}</p> : ''
                                        }
                                        {
                                            data['insurancenotes'] ? <p className=' text-slate-500'>Notes: {data['insurancenotes']}</p> : ''
                                        }
                                        {
                                            data['policynumber'] ? <p className=' text-slate-500'>Policy Number: {data['policynumber']}</p> : ''
                                        }
                                    </div>
                                    <div className=' cursor-pointer' onClick={() => deleteDocument(data['docId'])}>
                                        <FaTrash color='#EB1D36'></FaTrash>

                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <Link to={"details"}>
                    <div style={{ width: "60px", height: "60px" }} className='w-5 cursor-pointer flex justify-center items-center rounded-full bg-primary absolute right-10 '>
                        <p className='text-white font-bold text-3xl'>+</p>
                    </div>

                </Link>
            </>
        );
    }



};

export default TakenFeatures;