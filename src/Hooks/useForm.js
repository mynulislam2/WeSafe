import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase.init";
import { useNavigate } from "react-router-dom";
const useForm = (data, path) => {
    const generateUniqueId = require('generate-unique-id');
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    if (data) {
        try {
            const result = JSON.parse(data);
            const id = generateUniqueId({
                length: 20,
                useLetters: true
              });
            const docUrl = id
            const CollectionRef = doc(db, `Users/${user?.uid}/ChildList/child1/data/${path}/${path}`, docUrl);

            setDoc(CollectionRef, {
                ...result.data,
                docId: CollectionRef.id
            });

            navigate(`/${path}`)
        } catch (err) {
            console.log('error');
        }
    }
    return path

}
export default useForm