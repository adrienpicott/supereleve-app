import React, { useState, useEffect } from 'react'
import { useAuth } from '../lib/AuthContext'
import { results } from '../lib/supabase'
import {
  ArrowLeft, Check, X, Lightbulb, Trophy, Star,
  Zap, Gem, ChevronRight
} from 'lucide-react'

// Questions de démonstration (seront générées par l'agent plus tard)
const DEMO_QUESTIONS = {
  suites: [
    {
      id: 1,
      question: "Soit (uₙ) une suite arithmétique de premier terme u₁ = 3 et de raison r = 5. Quelle est la valeur de u₁₀ ?",
      options: ["48", "53", "50", "45"],
      correct: 0,
      explanation: "Pour une suite arithmétique : uₙ = u₁ + (n-1)r. Donc u₁₀ = 3 + 9×5 = 48.",
      difficulty: 1,
      xp: 10
    },
    {
      id: 2,
      question: "Une suite géométrique a pour premier terme v₁ = 2 et pour raison q = 3. Que vaut v₅ ?",
      options: ["162", "243", "81", "54"],
      correct: 0,
      explanation: "Pour une suite géométrique : vₙ = v₁ × q^(n-1). Donc v₅ = 2 × 3⁴ = 2 × 81 = 162.",
      difficulty: 1,
      xp: 10
    },
    {
      id: 3,
      question: "Quelle est la somme des 10 premiers termes d'une suite arithmétique de premier terme 5 et de raison 3 ?",
      options: ["185", "190", "180", "195"],
      correct: 0,
      explanation: "Formule : S = n(u₁ + uₙ)/2. Avec u₁₀ = 5 + 9×3 = 32, donc S = 10(5+32)/2 = 185.",
      difficulty: 2,
      xp: 15
    }
  ],
  fonctions: [
    {
      id: 1,
      question: "Quelle est la forme canonique de f(x) = x² + 6x + 5 ?",
      options: ["(x+3)² - 4", "(x+3)² + 4", "(x-3)² - 4", "(x+6)² + 5"],
      correct: 0,
      explanation: "x² + 6x + 5 = (x+3)² - 9 + 5 = (x+3)² - 4",
      difficulty: 1,
      xp: 10
    }
  ],
  derivation: [
    {
      id: 1,
      question: "Quelle est la dérivée de f(x) = 3x² + 2x - 1 ?",
      options: ["6x + 2", "3x + 2", "6x - 2", "3x - 1"],
      correct: 0,
      explanation: "f'(x) = 3×2x + 2×1 - 0 = 6x + 2",
      difficulty: 1,
      xp: 10
    }
  ],
  probas: [
    {
      id: 1,
      question: "On lance un dé équilibré. Quelle est la probabilité d'obtenir un nombre pair ?",
      options: ["1/2", "1/3", "2/3", "1/6"],
      correct: 0,
      explanation: "Les nombres pairs sont 2, 4, 6. Il y a 3 cas favorables sur 6 possibles : 3/6 = 1/2",
      difficulty: 1,
      xp: 10
    }
  ]
}

export default function Quiz({ chapterId, onBack }) {
  const { user, profile, updateProfile } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [quizComplete, setQuizComplete] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)
  const [earnedCrystals, setEarnedCrystals] = useState(0)

  const questions = DEMO_QUESTIONS[chapterId] || []
  const question = questions[currentQuestion]

  const handleAnswer = (answerIndex) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    const isCorrect = answerIndex === question.correct
    const newAnswers = [...answers, { questionId: question.id, correct: isCorrect }]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
      setEarnedXP(earnedXP + question.xp)
    } else {
      // Gagner des cristaux même en cas d'erreur (pour encourager)
      setEarnedCrystals(earnedCrystals + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = async () => {
    setQuizComplete(true)

    // Mettre à jour le profil avec les nouveaux XP et cristaux
    const newXP = (profile?.xp || 0) + earnedXP
    const newCrystals = (profile?.crystals || 0) + earnedCrystals
    
    await updateProfile({
      xp: newXP,
      crystals: newCrystals
    })

    // Sauvegarder les résultats
    await results.save({
      user_id: user.id,
      chapter: getChapterName(),
      score: score,
      total_questions: questions.length,
      xp_earned: earnedXP,
      crystals_earned: earnedCrystals,
      difficulty: 'medium'
    })
  }

  const getChapterName = () => {
    const names = {
      suites: 'Suites Numériques',
      fonctions: 'Fonctions du 2nd Degré',
      derivation: 'Dérivation',
      probas: 'Probabilités'
    }
    return names[chapterId] || chapterId
  }

  const getPercentage = () => {
    return Math.round((score / questions.length) * 100)
  }

  const getEncouragement = () => {
    const percentage = getPercentage()
    if (percentage >= 90) return { text: "🏆 Parfait ! Tu maîtrises ce chapitre !", color: "text-green-600" }
    if (percentage >= 70) return { text: "⭐ Très bien ! Continue comme ça !", color: "text-blue-600" }
    if (percentage >= 50) return { text: "💪 Bon travail ! Encore un peu d'entraînement !", color: "text-yellow-600" }
    return { text: "📚 N'abandonne pas ! Révise et recommence !", color: "text-purple-600" }
  }

  if (quizComplete) {
    const encouragement = getEncouragement()
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz terminé !</h2>
            <p className={`text-xl font-medium mb-8 ${encouragement.color}`}>
              {encouragement.text}
            </p>

            {/* Score */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
              <p className="text-6xl font-bold text-gray-800 mb-2">{getPercentage()}%</p>
              <p className="text-gray-600">
                {score} bonnes réponses sur {questions.length}
              </p>
            </div>

            {/* Récompenses */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-yellow-50 rounded-xl p-4">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">+{earnedXP}</p>
                <p className="text-sm text-gray-600">Points XP</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <Gem className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">+{earnedCrystals}</p>
                <p className="text-sm text-gray-600">Cristaux</p>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Retour au dashboard
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Recommencer
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Aucune question disponible pour ce chapitre.</p>
          <button
            onClick={onBack}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-600">Question {currentQuestion + 1}/{questions.length}</p>
              <div className="w-48 h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-gray-700">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {question.question}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                {[...Array(question.difficulty)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-600 ml-2">+{question.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correct
              const showResult = showExplanation

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-100 border-2 border-green-500'
                        : isSelected
                        ? 'bg-red-100 border-2 border-red-500'
                        : 'bg-gray-50 border-2 border-gray-200'
                      : isSelected
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-purple-300'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{option}</span>
                    {showResult && isCorrect && (
                      <Check className="w-6 h-6 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <X className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-blue-900 mb-1">Explication :</p>
                  <p className="text-blue-800">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Button */}
        {showExplanation && (
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Question suivante
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Voir les résultats
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
