"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/signin");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, [router]);

  return isAuthenticated ? children : null;
}
