import React, { useState } from 'react';
import useForm from '../../Hooks/useForm';

const InsuranceForm = () => {
    const [state, setState] = useState({})

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const policyNumber = event.target.policyNumber.value
        const insuranceName = event.target.insuranceName.value
        const notes = event.target.notes.value
        let Data = `{
            "data":{
    "policynumber": "${policyNumber}",
    "insurancename": "${insuranceName}",
    "insurancenotes": "${notes}"
}
        }

        
        `
        setState(Data)

    }
    useForm(state, "insurance")
    return (
        <div>
            <>
                <h1 className="text-center text-3xl font-semibold mt-5">Insurance</h1>
                <div className="flex justify-center mt-5">
                    <div>
                        <form className="w-80" onSubmit={handleFormSubmit}>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Insurance Name<span className=' text-red-600'>*</span></span>
                                </label>
                                <input name="insuranceName" type="text" placeholder="Aristocrat Insurance" class="input input-bordered w-full max-w-xs" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Policy Number<span className=' text-red-600'>*</span></span>
                                </label>
                                <input name="policyNumber" type="text" placeholder="99999999-2" class="input input-bordered w-full max-w-xs" />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Notes</span>
                                </label>
                                <input name='notes' type="text" placeholder="ex Diagnosed at XYZ hospital" class="input input-bordered w-full max-w-xs" />
                            </div>


                            <div className="flex justify-center mb-5 mt-5">
                                <input type="submit" value="Save" className="btn btn-primary px-36 " />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </div>
    );
};

export default InsuranceForm;