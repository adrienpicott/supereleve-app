import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, auth, profiles } from './supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier la session au chargement
    auth.getSession().then(({ session }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProfile(session.user.id)
      }
      setLoading(false)
    })

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await loadProfile(session.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const loadProfile = async (userId) => {
    const { data, error } = await profiles.get(userId)
    if (data && !error) {
      setProfile(data)
    }
  }

  const signUp = async (email, password, userData) => {
    const { data, error } = await auth.signUp(email, password, userData)
    if (data.user && !error) {
      // Créer le profil
      await profiles.create(data.user.id, {
        full_name: userData.full_name,
        xp: 0,
        level: 1,
        crystals: 0,
        gold: 0
      })
    }
    return { data, error }
  }

  const signIn = async (email, password) => {
    return await auth.signIn(email, password)
  }

  const signOut = async () => {
    const { error } = await auth.signOut()
    if (!error) {
      setUser(null)
      setProfile(null)
    }
    return { error }
  }

  const updateProfile = async (updates) => {
    if (!user) return { error: 'No user' }
    const { data, error } = await profiles.update(user.id, updates)
    if (data && !error) {
      setProfile(data[0])
    }
    return { data, error }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
