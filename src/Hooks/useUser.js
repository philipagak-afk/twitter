import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export function useUser(userId) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUser() {
            if (!userId) return;

            try {
                setIsLoading(true);
                setError("");

                const docRef = doc(db, "users", userId);
                const userDoc = await getDoc(docRef);

                if (userDoc.exists()) {
                    setUser(userDoc.data());
                } else {
                    setError("User not found");
                }
            } catch (err) {
                setError("Failed to fetch user");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [userId]);

    return { user, isLoading, error };
}