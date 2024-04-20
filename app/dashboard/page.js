"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import Image from 'next/image';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      } else {
        console.log("No user authenticated");
      }
    };

    getUser();

    const authSubscription = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser || null);
      },
    );

    setSubscription(authSubscription);

    return () => {
      if (subscription) {
        subscription.data.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("Signed out successfully");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {user.user_metadata.picture && (
          <Image
            src={user.user_metadata.picture || user.user_metadata.avatar_url}
            alt="User Avatar"
            width={500}
            height={500}
          />
        )}
        <p>Welcome, {user.email}</p>
        <p>User ID: {user.id}</p>
        {user.user_metadata.provider && (
          <p>Sign-up Provider: {user.user_metadata.provider}</p>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
} 