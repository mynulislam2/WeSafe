import React, { useState } from 'react';
import { FaPen } from "react-icons/fa";

const PersonalProfile = () => {
    const [Date, setDate] = useState("")
    const [Gender, setGender] = useState("")
    return (
        <div className="">
            <h1 className='text-center text-3xl mt-2 font-semibold'>Personal Profile</h1>
            <div className="flex justify-center">
                <div className="mb-2">
                    <div className="flex justify-center mt-10">
                        <div className="relative">
                            <div class="avatar ">
                                <div class="w-24 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" />
                                </div>
                            </div>
                            <div onClick={PersonalProfile} className="cursor-pointer flex justify-center absolute top-14 left-14 ">
                                <div className="bg-primary rounded-full w-10 h-10 relative border-white border-solid border-2">
                                    <p className="absolute top-2 left-3">
                                        <FaPen style={{ color: 'white' }}></FaPen>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">name <span className=' text-red-600'>*</span></span>
                        </label>
                        <input type="text" placeholder="Mynul" class="input input-bordered w-full max-w-xs" />
                        <label class="label">
                        </label>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Phone Number <span className=' text-red-600'>*</span></span>
                        </label>
                        <input type="number" placeholder="ex. 790 340 8392" class="input input-bordered w-full max-w-xs" />
                        <label class="label">
                        </label>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Email <span className=' text-red-600'>*</span></span>
                        </label>
                        <input type="number" placeholder="ex. abc@gmail.com" class="input input-bordered w-full max-w-xs" />
                        <label class="label">
                        </label>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Date of Birth <span className=' text-red-600'>*</span></span>
                        </label>
                        <input onChange={(e) => setDate(e.target.value)} type="date" placeholder="ex. 02/03/2004" class="input input-bordered w-full max-w-xs" />
                        <label class="label">
                        </label>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Address <span className=' text-red-600'>*</span></span>
                        </label>
                        <input type="text" placeholder="House no/Flat no" class="input input-bordered w-full max-w-xs" />
                        <input type="text" placeholder="Locality" class="input input-bordered w-full max-w-xs mt-2" />
                        <div className='flex gap-2'>
                            <input type="text" placeholder="Country" class="input input-bordered w-full max-w-xs mt-2" />
                            <input type="text" placeholder="State" class="input input-bordered w-full max-w-xs mt-2" />
                        </div>
                        <div className='flex gap-2'>
                            <input type="text" placeholder="City" class="input input-bordered w-full max-w-xs mt-2" />
                            <input type="text" placeholder="Pin Code" class="input input-bordered w-full max-w-xs mt-2" />

                        </div>
                        <label class="label">
                        </label>
                    </div>
                    <div>
                        <label class="label">
                            <span class="label-text">Gender </span>
                        </label>
                        <div className='flex gap-x-2'>

                            <button onClick={() => setGender("Female")} className="btn bg-base-100 text-secondary hover:text-white border-primary">Female</button>
                            <button onClick={() => setGender("Male")} className="btn bg-base-100 text-secondary hover:text-white border-primary">Male</button>
                            <button onClick={() => setGender("Others")} className="btn bg-base-100 text-secondary hover:text-white border-primary">Others</button>

                        </div>
                    </div>
                    <div class="form-control  w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Height </span>
                        </label>
                        <div class="input-group">
                            <input type="text" placeholder="Pin Code" class="input input-bordered w-44 max-w-xs" />

                            <select class="select select-bordered">
                                <option disabled selected>Pick category</option>
                                <option>cms</option>
                                <option>Mugs</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-control  w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Weight </span>
                        </label>
                        <div class="input-group">
                            <input type="text" placeholder="Pin Code" class="input input-bordered w-44 max-w-xs" />

                            <select class="select select-bordered">
                                <option disabled selected>Pick category</option>
                                <option>kgs</option>
                                <option>Mugs</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Blood Group</span>
                        </label>
                        <select class="select select-bordered">
                            <option selected>A+</option>

                        </select>

                    </div>
                </div>

            </div>
            <div className="flex justify-center mb-5">
                <button class="btn btn-primary px-36 ">Save</button>
            </div>
        </div>

    );
};

export default PersonalProfile;