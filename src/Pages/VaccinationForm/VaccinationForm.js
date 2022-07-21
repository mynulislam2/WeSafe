import React from 'react';

const VaccinationForm = () => {
    const handleFormSubmit = (event) => {
        const name = event.target.name.value
        const notes = event.target.notes.value
        const date = event.target.date.value
    }
    return (
        <div>
            <>
            <h1 className="text-center text-3xl font-semibold mt-5">Vaccination</h1>
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
                            <input name='notes' type="text" placeholder="ex Diagnosed at XYZ hospital" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Date</span>
                            </label>
                            <input type="date" name="date"  class="input input-bordered w-full max-w-xs" />
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

export default VaccinationForm;