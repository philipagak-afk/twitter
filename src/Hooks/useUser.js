import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

export function useUser(userId){
    const [user,setUser] = useState({})
    const [isloading,setIsloading]= useState(false)
    const [error,setError] = useState("")
    useEffect(()=>{
        async function fetchUser(){
            const docRef = doc(db,"users", userId)
            const userDoc = await getDoc(docRef)

            setUser(userDoc.data())

        }

        fetchUser()
    },[auth])

    return {user,isloading, error}
}