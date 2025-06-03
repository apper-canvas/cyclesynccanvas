import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

export default function Symptoms() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedSymptoms, setSelectedSymptoms] = useState({})
  const [currentMood, setCurrentMood] = useState('')
  const [notes, setNotes] = useState('')
  
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/tracker', label: 'Tracker', icon: 'Calendar' },
    { path: '/insights', label: 'Insights', icon: 'BarChart3' },
    { path: '/profile', label: 'Profile', icon: 'User' }
  ]

  const symptomCategories = [
    {
      name: 'Physical',
      symptoms: [
        { id: 'cramps', label: 'Cramps', icon: 'Zap' },
        { id: 'bloating', label: 'Bloating', icon: 'Circle' },
        { id: 'headache', label: 'Headache', icon: 'Brain' },
        { id: 'fatigue', label: 'Fatigue', icon: 'Battery' },
        { id: 'backache', label: 'Back Pain', icon: 'ArrowUp' },
        { id: 'breast_tenderness', label: 'Breast Tenderness', icon: 'Heart' }
      ]
    },
    {
      name: 'Emotional',
      symptoms: [
        { id: 'mood_swings', label: 'Mood Swings', icon: 'Smile' },
        { id: 'anxiety', label: 'Anxiety', icon: 'AlertCircle' },
        { id: 'irritability', label: 'Irritability', icon: 'Frown' },
        { id: 'depression', label: 'Low Mood', icon: 'Cloud' },
        { id: 'stress', label: 'Stress', icon: 'Zap' },
        { id: 'crying', label: 'Crying Spells', icon: 'Droplets' }
      ]
    },
    {
      name: 'Flow',
      symptoms: [
        { id: 'spotting', label: 'Spotting', icon: 'Droplet' },
        { id: 'light_flow', label: 'Light Flow', icon: 'Droplets' },
        { id: 'medium_flow', label: 'Medium Flow', icon: 'CloudRain' },
        { id: 'heavy_flow', label: 'Heavy Flow', icon: 'CloudDrizzle' },
        { id: 'clots', label: 'Blood Clots', icon: 'Circle' },
        { id: 'irregular', label: 'Irregular', icon: 'Shuffle' }
      ]
    }
  ]

  const moods = [
    { id: 'great', label: 'Great', emoji: '😊', color: 'bg-green-500' },
    { id: 'good', label: 'Good', emoji: '🙂', color: 'bg-blue-500' },
    { id: 'okay', label: 'Okay', emoji: '😐', color: 'bg-yellow-500' },
    { id: 'bad', label: 'Bad', emoji: '😞', color: 'bg-orange-500' },
    { id: 'terrible', label: 'Terrible', emoji: '😢', color: 'bg-red-500' }
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleSymptom = (symptomId, intensity = 1) => {
    setSelectedSymptoms(prev => ({
      ...prev,
      [symptomId]: prev[symptomId] ? null : { intensity, timestamp: new Date().toISOString() }
    }))
  }

  const updateSymptomIntensity = (symptomId, intensity) => {
    setSelectedSymptoms(prev => ({
      ...prev,
      [symptomId]: { ...prev[symptomId], intensity }
    }))
  }

  const saveSymptoms = () => {
    const symptomData = {
      symptoms: selectedSymptoms,
      mood: currentMood,
      notes: notes,
      date: new Date().toISOString().split('T')[0]
    }
    
    console.log('Saving symptoms:', symptomData)
    toast.success('Symptoms logged successfully!')
    
    // Reset form
    setSelectedSymptoms({})
    setCurrentMood('')
    setNotes('')
  }

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 1: return 'bg-green-500'
      case 2: return 'bg-yellow-500'
      case 3: return 'bg-orange-500'
      case 4: return 'bg-red-500'
      case 5: return 'bg-red-700'
      default: return 'bg-gray-300'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 glass-effect border-b border-pink-200/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="Heart" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold gradient-text">CycleSync</h1>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-white/60 hover:text-primary'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 sm:p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-pink-200/50 hover:bg-white/80 transition-all duration-200"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" 
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 sm:p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-pink-200/50 hover:bg-white/80 transition-all duration-200"
              >
                <ApperIcon 
                  name={mobileMenuOpen ? "X" : "Menu"} 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" 
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">Symptom Tracker</h1>
              <p className="text-gray-600 dark:text-gray-400">Log your daily symptoms and mood</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Mood Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="cycle-card p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ApperIcon name="Smile" className="w-5 h-5 mr-2" />
              How are you feeling today?
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {moods.map((mood) => (
                <motion.button
                  key={mood.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentMood(mood.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    currentMood === mood.id
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Symptom Categories */}
          <div className="space-y-8">
            {symptomCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
                className="cycle-card p-6"
              >
                <h2 className="text-xl font-semibold mb-4">{category.name} Symptoms</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.symptoms.map((symptom) => (
                    <div key={symptom.id} className="space-y-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleSymptom(symptom.id)}
                        className={`w-full p-3 rounded-xl border-2 transition-all ${
                          selectedSymptoms[symptom.id]
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <ApperIcon name={symptom.icon} className="w-4 h-4" />
                          <span className="text-sm font-medium">{symptom.label}</span>
                        </div>
                      </motion.button>
                      
                      {selectedSymptoms[symptom.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex justify-between text-xs"
                        >
                          <span>Intensity:</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <button
                                key={level}
                                onClick={() => updateSymptomIntensity(symptom.id, level)}
                                className={`w-3 h-3 rounded-full border ${
                                  selectedSymptoms[symptom.id]?.intensity >= level
                                    ? `${getIntensityColor(level)} border-transparent`
                                    : 'border-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Notes Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="cycle-card p-6 mt-8"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ApperIcon name="FileText" className="w-5 h-5 mr-2" />
              Additional Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional symptoms, observations, or notes..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <button
              onClick={saveSymptoms}
              disabled={Object.keys(selectedSymptoms).length === 0 && !currentMood}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Today's Symptoms
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="cycle-card p-4 text-center">
              <div className="text-2xl font-bold text-primary">{Object.keys(selectedSymptoms).length}</div>
              <div className="text-sm text-gray-600">Symptoms Today</div>
            </div>
            <div className="cycle-card p-4 text-center">
              <div className="text-2xl font-bold text-secondary">
                {currentMood ? moods.find(m => m.id === currentMood)?.emoji : '😐'}
              </div>
              <div className="text-sm text-gray-600">Current Mood</div>
            </div>
            <div className="cycle-card p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">7</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}