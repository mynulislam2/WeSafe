import React, { useState } from 'react';
import useForm from '../../Hooks/useForm';

const AllergyForm = ({Switcheduser}) => {
    const [state, setState] = useState({})

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value
        const notes = event.target.notes.value
        let Data = `{
            "data":{
                "Allergies Name": "${name}",
                "Allergies Notes": "${notes}"
            }
        }

        
        `
        setState(Data)

    }
    useForm(state, 'allergies',Switcheduser)

    return (
        <>
            <h1 className="text-center text-3xl font-semibold mt-5">Allergy</h1>
            <div className="flex justify-center mt-5">
                <div>
                    <form className="w-80" onSubmit={handleFormSubmit}>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Name<span className=' text-red-600'>*</span></span>
                            </label>
                            <input name='name' type="text" placeholder="medicine,aspirin" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Notes</span>
                            </label>
                            <input name='notes' type="text" placeholder="Notes" class="input input-bordered w-full max-w-xs" />
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

export default AllergyForm;