import { info } from 'daisyui/src/colors';
import React from 'react';
import { FaProcedures, FaSyringe, FaMedkit, FaAllergies, FaPills, FaAddressCard, FaStethoscope } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";
import plusIcons from "../../assets/wesafeassets/image/plusIcons.png"

const Features = () => {
    const navigate = useNavigate()

    const FeatureData = [
        {
            icon: FaAddressCard,
            tittle: "Emergency Contacts",
            Description: "emergency contacts details such as Name, Relation, Phone Number",
            link: "emergencycont",
            formLink: "details"
        },
        {
            icon: FaStethoscope,
            tittle: "Medical Conditions",
            Description: "medical condition details such as Name and Note",
            link: "mediccond",
            formLink: "details"
        },
        {
            icon: FaPills,
            tittle: "Medications",
            Description: "medications details such as Name, Notes, Dosage",
            link: "medications",
            formLink: "details"
        },
        {
            icon: FaAllergies,
            tittle: "Allergies",
            Description: "allergies details such as Name, Notes",
            link: "allergies",
            formLink: "details"
        },
        {
            icon: FaSyringe,
            tittle: "Vaccination",
            Description: "vaccination details such as Name, Notes, Date",
            link: "vaccinations",
            formLink: "details"
        },
        {
            icon: FaProcedures,
            tittle: "Procedures",
            Description: "procedures details such as Name, Notes, Doctor's Name, Doctor's Number, Status, Date of Operation",
            link: "procedures",
            formLink: "details"
        },
        {
            icon: FaMedkit,
            tittle: "Insurances",
            Description: "Insurance Name and policy Number",
            link: "insurance",
            formLink: "details"
        }
    ]
    const { id } = useParams()

    return (
        <div className='relative'>
            {
                FeatureData.map((data) => {
                    if (data.link == id) {
                        return <div>
                            <div className="bg-primary relative h-14 flex justify-center items-center">
                                <p className=" absolute left-6 font-medium cursor-pointer" onClick={() => navigate('/')}><MdArrowBack color='#fff' fontSize={25} /></p>
                                <p className="text-white font-medium text-lg">
                                    {id == "emergencycont" && "Emergency Contacts"}
                                    {id == "mediccond" && "Medical Conditions"}
                                    {id !== "emergencycont" && id !== "mediccond" && id.charAt(0).toUpperCase() + id.slice(1)}

                                </p>
                                <img  width= "28px" onClick={() => navigate(`${data.formLink}`)} className=' cursor-pointer flex justify-center items-center   absolute right-6  ' src={plusIcons} alt="" />
                            </div>
                            <div className='flex justify-center items-center' style={{ height: "80vh" }}>
                                <div>
                                    <div className='flex justify-center'><data.icon color='#6574cf' size={200} /></div>
                                    <p className='text-center mt-5'>
                                        Click on + icon to add +{data.Description}
                                    </p>
                                </div>

                            </div>

                        </div>
                    }
                })
            }

        </div>

    );





};

export default Features;