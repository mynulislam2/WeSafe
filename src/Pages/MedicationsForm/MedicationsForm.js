import React, { useState } from 'react';
import useForm from '../../Hooks/useForm';

const MedicationsForm = () => {
    const [state, setState] = useState({})

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const notes = event.target.notes.value
        const frequency = event.target.frequency.value
        const dosage = event.target.dosage.value

        let Data = `
        {
            "data":{
                "Medication Name": "${name}",
                "Medication Dosage": "${dosage}",
                "Medication Notes": "${frequency}",
                "Medication Frequency": "${notes}"
            }
        }

        
        `
        setState(Data)
    }
    useForm(state, "vaccinations")

    return (
        <>
            <h1 className="text-center text-3xl font-semibold mt-5">Medications</h1>
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
                                <span class="label-text">Notes</span>
                            </label>
                            <input name="notes" type="text" placeholder="ex Diagnosed at XYZ hospital" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Frequency</span>
                            </label>
                            <input name="frequency" type="text" placeholder="ex 3 times a day" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Dosage</span>
                            </label>
                            <input name="dosage" type="text" placeholder="eg 200mg 10ml" class="input input-bordered w-full max-w-xs" />
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

export default MedicationsForm;