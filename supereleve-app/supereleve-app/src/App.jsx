import React, { useState } from 'react'
import { AuthProvider, useAuth } from './lib/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Quiz from './components/Quiz'

function AppContent() {
  const { user, loading } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedChapter, setSelectedChapter] = useState(null)

  const handleStartQuiz = (chapterId) => {
    setSelectedChapter(chapterId)
    setCurrentView('quiz')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    setSelectedChapter(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  if (currentView === 'quiz' && selectedChapter) {
    return <Quiz chapterId={selectedChapter} onBack={handleBackToDashboard} />
  }

  return <Dashboard onStartQuiz={handleStartQuiz} />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
