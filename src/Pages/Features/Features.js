import { info } from 'daisyui/src/colors';
import React from 'react';
import { FaProcedures, FaSyringe, FaMedkit, FaAllergies, FaPills, FaAddressCard, FaStethoscope } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';

const Features = () => {
    const FeatureData = [
        {
            icon: FaAddressCard,
            tittle: "Emergency Contacts",
            Description: "emergency contacts details such as Name,Relation ,Phone Number",
            link: "emergency-contact",
            formLink: "emergency-contact-details"
        },
        {
            icon: FaStethoscope,
            tittle: "Medical Conditions",
            Description: "medical condition details such as Name and Note",
            link: "medical-condition",
            formLink: "medical-condition-details"
        },
        {
            icon: FaPills,
            tittle: "Medications",
            Description: "medications details such as Name,Notes, Dosage",
            link: "medications",
            formLink: "medications-details"
        },
        {
            icon: FaAllergies,
            tittle: "Allergies",
            Description: "allergies details such as Name,Notes",
            link: "allergies",
            formLink: "allergies-details"
        },
        {
            icon: FaSyringe,
            tittle: "Vaccination",
            Description: "vaccination details such as Name,Notes, Date",
            link: "vaccination",
            formLink: "vaccination-details"
        },
        {
            icon: FaProcedures,
            tittle: "Procedures",
            Description: "procedures details such as Name,Notes, Doctor's Name,Doctor's Number,Status,Date of Operation",
            link: "procedures",
            formLink: "procedures-details"
        },
        {
            icon: FaMedkit,
            tittle: "Insurances",
            Description: "Insurance Name and policy Number",
            link: "insurance",
            formLink: "insurance-details"
        }
    ]
    const { id } = useParams()

    return (
        <div className='relative'>
            {
                FeatureData.map((data) => {
                    if (data.link == id) {
                        return <div><div className='flex justify-center items-center' style={{ height: "80vh" }}>
                            <div>
                                <div className='flex justify-center'><data.icon color='#6574cf'  size={200} /></div>
                                <p className='text-center mt-5'>
                                    click on + icon to add +{data.Description}
                                </p>
                            </div>

                        </div>
                            <Link to={`${data.formLink}`}>
                                <div style={{ width: "60px", height: "60px" }} className='w-5 cursor-pointer flex justify-center items-center rounded-full bg-primary absolute right-10 '>
                                    <p className='text-white font-bold text-3xl'>+</p>
                                </div>

                            </Link>
                        </div>
                    }
                })
            }

        </div>

    );





};

export default Features;