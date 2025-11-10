import React, { useState, useEffect } from 'react'
import { useAuth } from '../lib/AuthContext'
import { results } from '../lib/supabase'
import {
  LogOut, Trophy, Zap, Gem, Coins, Star, TrendingUp,
  BookOpen, Target, Award, Flame, ChevronRight
} from 'lucide-react'

export default function Dashboard({ onStartQuiz }) {
  const { user, profile, signOut, updateProfile } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentResults, setRecentResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [user])

  const loadData = async () => {
    if (!user) return
    
    setLoading(true)
    const { data: statsData } = await results.getStats(user.id)
    const { data: recentData } = await results.getByUser(user.id, 5)
    
    setStats(statsData || [])
    setRecentResults(recentData || [])
    setLoading(false)
  }

  const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1
  }

  const getXPForNextLevel = (xp) => {
    const currentLevel = calculateLevel(xp)
    const nextLevelXP = currentLevel * 100
    return nextLevelXP - xp
  }

  const getProgressPercentage = (xp) => {
    const currentLevel = calculateLevel(xp)
    const previousLevelXP = (currentLevel - 1) * 100
    const nextLevelXP = currentLevel * 100
    const currentLevelProgress = xp - previousLevelXP
    return (currentLevelProgress / 100) * 100
  }

  const chaptersAvailable = [
    {
      id: 'suites',
      name: 'Suites Numériques',
      icon: '📈',
      color: 'blue',
      description: 'Maîtrise les suites arithmétiques et géométriques',
      xpReward: 50
    },
    {
      id: 'fonctions',
      name: 'Fonctions du 2nd Degré',
      icon: '📐',
      color: 'purple',
      description: 'Explore les paraboles et leurs propriétés',
      xpReward: 60
    },
    {
      id: 'derivation',
      name: 'Dérivation',
      icon: '∫',
      color: 'pink',
      description: 'Calcule des dérivées et étudie les variations',
      xpReward: 70
    },
    {
      id: 'probas',
      name: 'Probabilités',
      icon: '🎲',
      color: 'green',
      description: 'Résous des problèmes de probabilités conditionnelles',
      xpReward: 55
    }
  ]

  const getColorClass = (color, type = 'bg') => {
    const colors = {
      blue: type === 'bg' ? 'bg-blue-500' : 'text-blue-600',
      purple: type === 'bg' ? 'bg-purple-500' : 'text-purple-600',
      pink: type === 'bg' ? 'bg-pink-500' : 'text-pink-600',
      green: type === 'bg' ? 'bg-green-500' : 'text-green-600'
    }
    return colors[color] || colors.blue
  }

  const totalQuizzes = recentResults.length
  const averageScore = stats?.length > 0
    ? Math.round(stats.reduce((acc, r) => acc + (r.score / r.total_questions) * 100, 0) / stats.length)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de ton espace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {profile?.full_name?.[0] || 'S'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {profile?.full_name || 'Super Élève'}
                </h2>
                <p className="text-sm text-gray-600">Niveau {calculateLevel(profile?.xp || 0)}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-yellow-500" />
              <span className="text-3xl font-bold text-gray-800">{profile?.xp || 0}</span>
            </div>
            <p className="text-gray-600 text-sm">Points XP</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
                style={{ width: `${getProgressPercentage(profile?.xp || 0)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {getXPForNextLevel(profile?.xp || 0)} XP pour le niveau suivant
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Gem className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-gray-800">{profile?.crystals || 0}</span>
            </div>
            <p className="text-gray-600 text-sm">Cristaux</p>
            <p className="text-xs text-gray-500 mt-1">Pour débloquer des indices</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-purple-500" />
              <span className="text-3xl font-bold text-gray-800">{totalQuizzes}</span>
            </div>
            <p className="text-gray-600 text-sm">Quiz complétés</p>
            <p className="text-xs text-gray-500 mt-1">Continue comme ça !</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-gray-800">{averageScore}%</span>
            </div>
            <p className="text-gray-600 text-sm">Score moyen</p>
            <p className="text-xs text-gray-500 mt-1">Excellent travail !</p>
          </div>
        </div>

        {/* Chapters Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-purple-600" />
            Chapitres disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chaptersAvailable.map((chapter) => (
              <div
                key={chapter.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
                onClick={() => onStartQuiz(chapter.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`text-4xl`}>{chapter.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{chapter.name}</h4>
                      <p className="text-sm text-gray-600">{chapter.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">+{chapter.xpReward} XP</span>
                  </div>
                  <button
                    className={`${getColorClass(chapter.color)} text-white px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity`}
                  >
                    Commencer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {recentResults.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-7 h-7 text-green-600" />
              Activité récente
            </h3>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-3">
                {recentResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${
                        result.score / result.total_questions >= 0.8 ? 'bg-green-100' :
                        result.score / result.total_questions >= 0.6 ? 'bg-yellow-100' :
                        'bg-red-100'
                      } rounded-full flex items-center justify-center`}>
                        {result.score / result.total_questions >= 0.8 ? (
                          <Trophy className="w-6 h-6 text-green-600" />
                        ) : result.score / result.total_questions >= 0.6 ? (
                          <Star className="w-6 h-6 text-yellow-600" />
                        ) : (
                          <Target className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{result.chapter}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(result.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">
                        {Math.round((result.score / result.total_questions) * 100)}%
                      </p>
                      <p className="text-sm text-gray-600">
                        {result.score}/{result.total_questions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
