'use client'

import { useEffect, useState } from 'react'
import supabase from '@/utils/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUser(data.user)
      } else {
        console.log('No user authenticated')
      }
    }

    getUser()

    const authSubscription = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user
        setUser(currentUser || null)
      }
    )

    setSubscription(authSubscription)

    return () => {
      if (subscription) {
        subscription.data.unsubscribe()
      }
    }
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <p>User ID: {user.id}</p>
      
      {user.user_metadata.provider && (
        <p>Sign-up Provider: {user.user_metadata.provider}</p>
      )}
    </div>
  )
}