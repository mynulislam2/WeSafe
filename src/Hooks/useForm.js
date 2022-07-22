import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import uniqid from 'uniqid';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,db } from "../firebase.init";
const useForm = (data, path) => {
    const [user, loading, error] = useAuthState(auth)
    if (data) {
        try {
            const result = JSON.parse(data);
            const CollectionRef = doc(db, `Users/${user?.uid}/ChildList/child1/data/${path}/${path}`, `${uniqid()+user.displayName}`);

            setDoc(CollectionRef, {
                ...result.data,
                docId: CollectionRef.id
            });
        } catch (err) {
            console.log('error');
        }
    }


}
export default useForm