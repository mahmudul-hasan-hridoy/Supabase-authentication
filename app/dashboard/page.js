"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex flex-col items-center">
        {user.user_metadata.picture && (
          <Image
            className="rounded-full"
            src={user.user_metadata.picture}
            alt="User Avatar"
            width={150}
            height={150}
          />
        )}
        <p className="mt-2">Welcome, {user.email}</p>
        {user.user_metadata.provider && (
          <p>Sign-up Provider: {user.user_metadata.provider}</p>
        )}
      </div>
      <Button onClick={handleLogout} variant="destructive" className="mt-3">
        Logout
      </Button>
    </div>
  );
}
