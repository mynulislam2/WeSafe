import React from 'react';
import { FaAngleRight } from "react-icons/fa";
import Header from '../../Component/Header/Header';
import { Link } from "react-router-dom"
import { FaProcedures, FaSyringe, FaMedkit, FaAllergies, FaPills, FaAddressCard, FaStethoscope, FaUserCircle } from "react-icons/fa";
const Mainpage = () => {
    const Features = [
        {
            icon: FaAddressCard,
            tittle: "Emergency Contacts",
            Description: "Your Emergency Contacts",
            link: "emergency-contact"
        },
        {
            icon: FaStethoscope,
            tittle: "Medical Conditions",
            Description: "Temporary ,BP,Glucose etc",
            link: "medical-condition"
        },
        {
            icon: FaPills,
            tittle: "Medications",
            Description: "Pill that you take",
            link: "medications"
        },
        {
            icon: FaAllergies,
            tittle: "Allergies",
            Description: "With food ,medicine,climate,weather",
            link: "allergies"
        },
        {
            icon: FaSyringe,
            tittle: "Vaccination",
            Description: "immunization and vaccines",
            link: "vaccination"
        },
        {
            icon: FaProcedures,
            tittle: "Procedures",
            Description: "Operation and procedures",
            link: "procedures",
        },
        {
            icon: FaMedkit,
            tittle: "Insurances",
            Description: "Insurance detail",
            link: "insurance"
        }
    ]

    return (
        <div className='bg-accent'>
            <Header></Header>
            <Link to='/personalProfile'>
                <div className=" bg-white w-1/2 p-3 rounded-xl mx-auto mt-5">
                    <div className='flex justify-center mx-auto justify-between  items-center'>
                        <div className='flex items-center'>
                            <div class="text-center bg-accent p-3 rounded-xl mr-2">
                                <FaUserCircle></FaUserCircle>
                            </div>
                            <h1 className="text-xl font-semibold ">Personal Profile</h1>
                        </div>
                        <p className="text-primary">
                            <FaAngleRight></FaAngleRight>
                        </p>
                    </div>
                </div>
            </Link>
            <div className="grid grid-cols-2 w-1/2 mx-auto mb-5">           {
                Features.map((Feature) => {
                    return <Link to={`mainpage/${Feature.link}`} >
                        <div className=" bg-white cursor-pointer  w-64 p-3 rounded-xl mx-auto mt-5">
                            <div className=' justify-center mx-auto   items-center'>
                                <div className='flex items-center'>
                                    <div class="text-center bg-accent p-3 rounded-xl mr-2">
                                        <Feature.icon />
                                    </div>
                                </div>
                                <h1 className="text-xl font-semibold ">{Feature.tittle}</h1>
                                <p>{Feature.Description}</p>
                            </div>
                        </div>
                    </Link>
                })
            }</div>


        </div>
    );
};

export default Mainpage;