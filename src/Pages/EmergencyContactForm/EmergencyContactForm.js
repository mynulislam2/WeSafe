import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import { MdArrowBack } from "react-icons/md";

const EmergencyContactForm = ({Switcheduser}) => {
    const navigate = useNavigate()

    const [state, setState] = useState({})
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value
        const relation = event.target.relation.value
        const phone = event.target.phone.value
        let check = event.target.check.value
        if (check == 'on') {
            check = true
        }
        else {
            check = false
        }
        let Data = `{
            "data":{
                "Emergency Contact Name": "${name}",
                "Emergency Contact Number": "${phone}",
                "Emergency Contact Relation": "${relation}",
                "trusted": "${check}"
            }
        }
        `
        setState(Data)
    }
    useForm(state, "emergencycont",Switcheduser)

    return (
        <>            <div className="bg-primary relative h-14 flex justify-center items-center">
        <p className=" absolute left-6 font-medium cursor-pointer" onClick={() => navigate('/')}><MdArrowBack color='#fff' fontSize={25} /></p>
        <p className="text-white font-medium text-lg">

        Emergency Contacts
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
                            <input name="name" type="text" placeholder="Name" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Relation</span>
                            </label>
                            <input name="relation" type="text" placeholder="eg. Brother,Father..." class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Phone Number</span>
                            </label>
                            <input type="text" name="phone" placeholder="eg 967473469" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control">
                            <label class="label cursor-pointer w-64">
                                <input name='check' type="checkbox" class="checkbox checkbox-primary" />
                                <span class="label-text">Send my SOS alert to this contact</span>

                            </label>
                        </div>
                        <div className="flex justify-center mb-5 mt-5">
                            <input type="submit" value="Save" className="btn btn-primary px-36 " />
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default EmergencyContactForm;