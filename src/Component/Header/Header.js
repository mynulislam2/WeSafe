import React, { useState } from 'react';
import safe from '../../assets/safe.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase.init';
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, signOut } from 'firebase/auth';
import { FaUserPlus, FaTrash } from "react-icons/fa";
import { MdOutlineContactSupport, MdOutlineShare } from "react-icons/md";
import { HiOutlineChatAlt2, HiOutlineLogout } from "react-icons/hi";
import '../Header/Header.css'
import { collection, doc, getDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import DefaultUser from '../../assets/wesafeassets/image/defaultimage.jpg'
import { isAdmin } from '@firebase/util';
import swal from 'sweetalert';

const Header = ({ setSwitcheduser }) => {
    const [user, loading, error] = useAuthState(auth)
    const [users, setUsers] = useState([])
    const [Checked, setChecked] = useState(true)
    const [Start, setStart] = useState(false)
    const [docId, setDocId] = useState([])
    const [isOnlice, setIsOnlice] = useState('')
    const navigate = useNavigate()
    const forceUpdate = React.useReducer(bool => !bool)[1];

    const getUser = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, `Users/${user?.uid}/ChildList`));
            let AllUsers = []
            let allDocId = []
            querySnapshot.forEach(async (docs) => {
                allDocId.push(docs.id)
                const querySnapshot = await getDoc(doc(db, `Users/${user?.uid}/ChildList/${docs.id}/data`, "personal_information"));
                const data = (querySnapshot.data())
                AllUsers.push(data)
            });
            setDocId(allDocId)
            setUsers(AllUsers)
            setChecked(false)
            localStorage.setItem('allUsers', JSON.stringify(users));

        }
        catch (err) {
            console.error(err);
        }

    }
    if (Checked) {
        getUser()
        return <div role="status" className=' h-screen flex justify-center items-center'>
            <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>
    }
    const deleteUser = (docid, name) => {
        swal("Are you sure To Delete?", {
            buttons: ["Cancel", true],

        })
            .then((res) => {
                if (res === true) {
                    const DeletedocRef = doc(db, `Users/${user?.uid}/ChildList/${docid}`);
                    deleteDoc(DeletedocRef)
                        .then(() => {
                            const newData = users.filter(user => user.name !== name);
                            setUsers(newData)
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })


    }
    const SwitchUser = async (docid) => {
        setSwitcheduser(docid)
        localStorage.setItem("activeUser", JSON.stringify(docid))
        forceUpdate()
        setDoc(doc(db, `Users/${user?.uid}/ChildList/${docid}`), {
            ActiveStatus: true,
            uid: user?.uid
        });
        docId.map((data) => {
            if (data !== docid) {
                setDoc(doc(db, `Users/${user?.uid}/ChildList/${data}`), {
                    ActiveStatus: false,
                    uid: user?.uid
                });
            }

        })
        const querySnapshot = await getDocs(collection(db, `Users/${user?.uid}/ChildList`));
        const AllActiveInfo = []
        querySnapshot.forEach(async (docs) => {
            const ActiveStatus = { id: docs.id, data: docs.data() }
            AllActiveInfo.push(ActiveStatus)
        })
        const filterActiveStatus = AllActiveInfo.filter(activeStatus => activeStatus.data.ActiveStatus === true);
        setIsOnlice(filterActiveStatus[0]?.id)

    }
    console.log(users)
    const activeUser = JSON.parse(localStorage.getItem("activeUser"))
    return (
        <div className="navbar bg-primary">
            <div className="flex-1" onClick={() => navigate("/")}>
                <img className='w-12' src={safe} alt="" />
                <a className="btn btn-ghost normal-case text-xl text-white">WeSafe</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label for="my-modal-6" className="btn modal-button btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full" onClick={() => setStart(true)}>
                            <img src={user?.photoURL} alt="" />
                        </div>
                    </label>
                </div>
            </div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <label for="my-modal-6" className="modal">
                <label style={{ width: "285px" }} className="modal-box  relative bg-white" for="">
                    <ul >
                        <li className="text-center" >
                            <Link to='#' className='text-primary'>
                                WeSafe
                            </Link>
                        </li>

                        {Start ? <div className=" h-32">
                            {/* <div class="avatar flex items-center justify-around mb-5">
                                <span style={{ height: "8px", paddingLeft: "0.5rem", paddingRight: "0rem", }} class="indicator-item badge bg-green-500 border-none"></span>

                                <div class="w-10 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" />
                                </div>
                                <p>Sadika Raisa</p>
                                <div className="ml-10">
                                </div>
                            </div> */}

                            {users.map((item, i) => {
                                return <div class="avatar flex items-center  mt-3 relative">
                                    {docId[i] == activeUser ? <span style={{ height: "8px", paddingRight: "0rem", }} class="indicator-item badge bg-green-500 border-none"></span> : <span style={{ height: "8px", paddingRight: "0rem", }} class="indicator-item badge bg-white border-none"></span>}

                                    <div class="w-10 rounded-full ml-3">
                                        <img src={item?.profilePicUrl || DefaultUser} />
                                    </div>
                                    <p className="ml-3 cursor-pointer" onClick={() => SwitchUser(docId[i])}>{item?.name}</p>

                                    {i !== 0 && <div className=" w-7 ">
                                        <FaTrash color='#EB1D36' className="absolute right-5 top-3 cursor-pointer" onClick={() => deleteUser(docId[i], item?.name)} ></FaTrash>
                                    </div>}
                                </div>
                            })}
                        </div> : ""}

                        <li className=" flex items-center">
                            <FaUserPlus />
                            <Link to="/addAnotherProfile">Add another Profile</Link>
                        </li>
                        <li className="flex items-center">
                            <HiOutlineChatAlt2 />
                            <Link to="#">Contact us</Link>
                        </li>
                        <li className='flex items-center'>
                            <MdOutlineShare />

                            <Link to="#">Invite</Link>
                        </li>
                        <li className="flex items-center"><FaTrash />
                            <Link to="#">
                                Delete Account</Link>
                        </li>
                        <li className="flex items-center">
                            <MdOutlineContactSupport />
                            <Link to="#">Support FAQ'S</Link>
                        </li>
                        <li onClick={() => {
                            signOut(auth)
                        }} className="flex items-center">
                            <HiOutlineLogout />
                            <Link to="/auth">Logout</Link>
                        </li>
                        <li>
                            <span className=' font-bold'>.</span>
                            <Link to="#">Terms of Service</Link>
                        </li>
                    </ul>

                </label>
            </label>
        </div>
    );
};

export default Header;