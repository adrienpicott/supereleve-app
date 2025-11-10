import { createClient } from '@supabase/supabase-js'

// Ces valeurs seront à remplacer par vos vraies clés Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fonctions utilitaires pour l'authentification
export const auth = {
  // Inscription
  signUp: async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Connexion
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Déconnexion
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obtenir la session actuelle
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Obtenir l'utilisateur actuel
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
}

// Fonctions pour gérer les profils élèves
export const profiles = {
  // Créer un profil élève
  create: async (userId, profileData) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ 
        user_id: userId,
        ...profileData
      }])
      .select()
    return { data, error }
  },

  // Récupérer un profil
  get: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  // Mettre à jour un profil
  update: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
    return { data, error }
  }
}

// Fonctions pour gérer les résultats de quiz
export const results = {
  // Sauvegarder un résultat
  save: async (resultData) => {
    const { data, error } = await supabase
      .from('quiz_results')
      .insert([resultData])
      .select()
    return { data, error }
  },

  // Récupérer les résultats d'un élève
  getByUser: async (userId, limit = 10) => {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // Récupérer les statistiques
  getStats: async (userId) => {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('score, total_questions, chapter, difficulty')
      .eq('user_id', userId)
    return { data, error }
  }
}
