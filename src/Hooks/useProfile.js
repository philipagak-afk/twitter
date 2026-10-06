import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";
import { auth } from "../firebase";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setProfile(null);
          setLoading(false);
          return;
        }

        const profileRef = doc(db, "users", user.uid);
        const profileSnapshot = await getDoc(profileRef);

        if (profileSnapshot.exists()) {
          setProfile({
            id: profileSnapshot.id,
            ...profileSnapshot.data(),
          });
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Profile error:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
  };
};