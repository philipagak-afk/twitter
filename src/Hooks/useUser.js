import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export function useUser() {
  const [user, setUser] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth();
  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(docRef);

      setUser(userDoc.data());
    }

    fetchUser();
  }, [auth]);

  return { user, isloading, error };
}