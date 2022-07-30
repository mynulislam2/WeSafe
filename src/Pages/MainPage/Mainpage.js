import React from 'react';
import { FaAngleRight } from "react-icons/fa";
import Header from '../../Component/Header/Header';
import { Link } from "react-router-dom"
import { FaProcedures, FaSyringe, FaMedkit, FaAllergies, FaPills, FaAddressCard, FaStethoscope, FaUserCircle } from "react-icons/fa";
import { Slide } from 'react-reveal';
const Mainpage = () => {
    const Features = [
        {
            icon: FaAddressCard,
            tittle: "Emergency Contacts",
            Description: "Your Emergency Contacts",
            link: "emergencycont"
        },
        {
            icon: FaStethoscope,
            tittle: "Medical Conditions",
            Description: "Temperature, BP, Glucose etc",
            link: "mediccond"
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
            Description: "With food, medicine and climate",
            link: "allergies"
        },
        {
            icon: FaSyringe,
            tittle: "Vaccination",
            Description: "Immunization and Vaccines",
            link: "vaccinations"
        },
        {
            icon: FaProcedures,
            tittle: "Procedures",
            Description: "Operation and Procedures",
            link: "procedures",
        },
        {
            icon: FaMedkit,
            tittle: "Insurances",
            Description: "Insurance details",
            link: "insurance"
        }
    ]

    return (
       
        <div className='bg-accent'>
            <Header></Header>
            <Slide right>
                 <Link to='/personalProfile'>
                <div className=" bg-white w-11/12 lg:w-1/2 p-3 rounded-xl mx-auto mt-5">
                    <div className='flex justify-center mx-auto justify-between  items-center'>
                        <div className='flex items-center'>
                            <div class="text-center bg-accent p-3 text-primary rounded-xl mr-2">
                                <FaUserCircle></FaUserCircle>
                            </div>
                            <h1 className="text-base font-medium ">Personal Profile</h1>
                        </div>
                        <p className="text-primary ">
                            <FaAngleRight></FaAngleRight>
                        </p>
                    </div>
                </div>
              </Link>
             <div className="grid grid-cols-2 gap-x-2 px-2 w-full lg:w-1/2 mx-auto mb-5">           {
                Features.map((Feature) => {
                    return <Link to={`/${Feature.link}`} >
                        <div className=" bg-white cursor-pointer h-44  p-2   rounded-xl mx-auto mt-5">
                            <div className=' justify-center mx-auto   items-center'>
                                <div className='flex items-center'>
                                    <div class="text-center text-primary bg-accent p-3 rounded-xl">
                                        <Feature.icon />
                                    </div>
                                </div>
                                <h1 style={{fontSize:"15px"}} className=" font-medium mt-4">{Feature.tittle}</h1>
                                <p className="mt-2 text-sm">{Feature.Description}</p>
                            </div>
                        </div>
                    </Link>
                })
            }</div>

        </Slide>

        </div>            

    );
};

export default Mainpage;