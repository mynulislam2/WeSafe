import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import { MdArrowBack } from "react-icons/md";

const Procedures = ({Switcheduser}) => {
    const [state, setState] = useState("")
    const navigate = useNavigate()

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const notes = event.target.notes.value
        const doctorName = event.target.doctorName.value
        const status = event.target.status.value
        const operationDate = event.target.operation.value
        const doctorNumber = event.target.doctorNumber.value
        let Data = `
{        "data":
            {
                "Procedures Date of Procedure": "${operationDate}",
                "Procedures Status": "${status}",
                "Procedures Notes": "${notes}",
                "Procedures Name": "${name}",
                "Procedures Doctor Phone Number": "${doctorNumber}",
                "Procedures Doctor Name": "${doctorName}"
            }
        }
        

        
        `
        setState(Data)
    }
    useForm(state, "procedures",Switcheduser)

    return (
        <div>
            <>
            <div className="bg-primary relative h-14 flex justify-center items-center">
                <p className=" absolute left-6 font-medium cursor-pointer" onClick={() => navigate('/')}><MdArrowBack color='#fff' fontSize={25} /></p>
                <p className="text-white font-medium text-lg">

                Procedure
                </p>
                {/* <Link to={`${data.formLink}`}>
                    <div style={{ width: "40px", height: "40px", marginTop: "-20px", border: "1px solid white" }} className='w-5 cursor-pointer flex justify-center items-center rounded-full bg-primary  absolute right-6  border-sky-100 border-1'>
                        <p className='text-white font-bold text-3xl  ' style={{ marginTop: "-6px" }}>+</p>
                    </div>

                </Link> */}
            </div>
                <div className="flex justify-center mt-5">
                    <div>
                        <form className="w-80" onSubmit={handleFormSubmit}>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Name<span className=' text-red-600'>*</span></span>
                                </label>
                                <input name='name' type="text" placeholder="Name" class="input input-bordered w-full max-w-xs" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Notes</span>
                                </label>
                                <input name='notes' type="text" placeholder="ex Diagnosed at XYZ hospital" class="input input-bordered w-full max-w-xs" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Doctor's Name</span>
                                </label>
                                <input name='doctorName' type="text" placeholder="ex john" class="input input-bordered w-full max-w-xs" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Doctor's Number</span>
                                </label>
                                <input name="doctorNumber" type="text" placeholder="ex 977453455" class="input input-bordered w-full max-w-xs" />
                            </div>

                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Status</span>
                                </label>
                                <input name="status" type="text" placeholder="Ongoing/Completed" class="input input-bordered w-full max-w-xs" />
                            </div>




                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Date of Operation</span>
                                </label>
                                <input type="date" name="operation" class="input input-bordered w-full max-w-xs" />
                            </div>


                            <div className="flex justify-center mb-5 mt-5">
                                <input type="submit" value="Save" className="btn btn-primary px-36 " />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </div>);
};

export default Procedures;