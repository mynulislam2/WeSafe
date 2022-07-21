import React from 'react';

const EmergencyContactForm = () => {
    const handleFormSubmit = (event) => {
        const name = event.target.name.value
        const relation = event.target.relation.value
        const check = event.target.check.value
    }

    return (
        <>
            <h1 className="text-center text-3xl font-semibold mt-5">Emergency Contacts</h1>
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
                            <input type="text" placeholder="eg 967473469" class="input input-bordered w-full max-w-xs" />
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