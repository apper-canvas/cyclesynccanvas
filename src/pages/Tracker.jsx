import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns'
import ApperIcon from '../components/ApperIcon'

export default function Tracker() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [cycleData, setCycleData] = useState({})
  const [currentEntry, setCurrentEntry] = useState({
    flowLevel: 'none',
    symptoms: [],
    mood: 'neutral',
    notes: ''
  })

  const navItems = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/tracker', label: 'Tracker', icon: 'Calendar' },
    { path: '/insights', label: 'Insights', icon: 'BarChart3' },
    { path: '/profile', label: 'Profile', icon: 'User' }
  ]

  const flowLevels = [
    { value: 'none', label: 'None', color: 'bg-gray-200', icon: 'Circle' },
    { value: 'spotting', label: 'Spotting', color: 'bg-pink-200', icon: 'Droplets' },
    { value: 'light', label: 'Light', color: 'bg-pink-400', icon: 'Droplets' },
    { value: 'medium', label: 'Medium', color: 'bg-pink-600', icon: 'Droplets' },
    { value: 'heavy', label: 'Heavy', color: 'bg-red-600', icon: 'Droplets' }
  ]

  const symptoms = [
    'Cramps', 'Headache', 'Bloating', 'Tender Breasts', 'Acne', 
    'Back Pain', 'Fatigue', 'Nausea', 'Mood Swings', 'Cravings',
    'Insomnia', 'Dizziness', 'Hot Flashes', 'Anxiety', 'Depression'
  ]

  const moods = [
    { value: 'happy', label: 'Happy', icon: 'Smile', color: 'text-green-500' },
    { value: 'neutral', label: 'Neutral', icon: 'Meh', color: 'text-gray-500' },
    { value: 'sad', label: 'Sad', icon: 'Frown', color: 'text-blue-500' },
    { value: 'angry', label: 'Angry', icon: 'Angry', color: 'text-red-500' },
    { value: 'anxious', label: 'Anxious', icon: 'Zap', color: 'text-yellow-500' }
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    const dateKey = format(date, 'yyyy-MM-dd')
    const existingEntry = cycleData[dateKey]
    
    if (existingEntry) {
      setCurrentEntry(existingEntry)
    } else {
      setCurrentEntry({
        flowLevel: 'none',
        symptoms: [],
        mood: 'neutral',
        notes: ''
      })
    }
  }

  const handleSymptomToggle = (symptom) => {
    setCurrentEntry(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handleSaveEntry = () => {
    if (currentEntry.flowLevel === 'none' && currentEntry.symptoms.length === 0 && !currentEntry.notes) {
      toast.warning('Please add some data before saving')
      return
    }

    const dateKey = format(selectedDate, 'yyyy-MM-dd')
    setCycleData(prev => ({
      ...prev,
      [dateKey]: { ...currentEntry, date: selectedDate }
    }))
    
    toast.success('Cycle data saved successfully!')
  }

  const hasDataForDay = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return cycleData[dateKey] && cycleData[dateKey].flowLevel !== 'none'
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
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-pink-200/50 hover:bg-white/80 transition-all duration-200"
              >
                <ApperIcon 
                  name={mobileMenuOpen ? "X" : "Menu"} 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" 
                />
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-pink-200/30 bg-white/80 backdrop-blur-sm"
              >
                <div className="px-4 py-6 space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                          : 'text-gray-700 hover:bg-pink-100 hover:text-primary'
                      }`}
                    >
                      <ApperIcon name={item.icon} className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">Cycle Tracker</h2>
            <p className="text-gray-600 dark:text-gray-300">Log your daily symptoms and track your menstrual cycle</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Calendar Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="cycle-card p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {format(currentDate, 'MMMM yyyy')}
                </h3>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentDate(addDays(currentDate, -30))}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ApperIcon name="ChevronLeft" className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentDate(addDays(currentDate, 30))}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ApperIcon name="ChevronRight" className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day) => (
                  <motion.button
                    key={day.toISOString()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDateSelect(day)}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                      hasDataForDay(day) ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-md' : ''
                    } ${isToday(day) ? 'ring-2 ring-primary ring-offset-2' : ''} ${
                      isSameDay(day, selectedDate) ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                    } ${!hasDataForDay(day) && !isToday(day) && !isSameDay(day, selectedDate) ? 'hover:bg-pink-100' : ''}`}
                  >
                    {format(day, 'd')}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded"></div>
                  <span className="text-sm text-gray-600">Days with logged data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 ring-2 ring-primary rounded"></div>
                  <span className="text-sm text-gray-600">Today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 ring-2 ring-purple-500 rounded"></div>
                  <span className="text-sm text-gray-600">Selected date</span>
                </div>
              </div>
            </motion.div>

            {/* Entry Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="cycle-card p-4 sm:p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Log Entry for {format(selectedDate, 'MMMM d, yyyy')}
              </h3>

              <div className="space-y-6">
                {/* Flow Level */}
                <div>
                  <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Flow Level
                  </h4>
                  <div className="grid grid-cols-5 gap-2">
                    {flowLevels.map((flow) => (
                      <motion.button
                        key={flow.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentEntry(prev => ({ ...prev, flowLevel: flow.value }))}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          currentEntry.flowLevel === flow.value
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-6 h-6 ${flow.color} rounded-full mx-auto mb-1`}></div>
                        <span className="text-xs">{flow.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Symptoms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => (
                      <motion.button
                        key={symptom}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSymptomToggle(symptom)}
                        className={`symptom-chip ${
                          currentEntry.symptoms.includes(symptom) ? 'selected' : ''
                        }`}
                      >
                        {symptom}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div>
                  <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Mood
                  </h4>
                  <div className="grid grid-cols-5 gap-2">
                    {moods.map((mood) => (
                      <motion.button
                        key={mood.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentEntry(prev => ({ ...prev, mood: mood.value }))}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          currentEntry.mood === mood.value
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <ApperIcon name={mood.icon} className={`w-6 h-6 mx-auto mb-1 ${mood.color}`} />
                        <span className="text-xs">{mood.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Notes
                  </h4>
                  <textarea
                    value={currentEntry.notes}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Add any additional notes..."
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none resize-none"
                    rows="3"
                  />
                </div>

                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveEntry}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Save Entry
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
          >
            <div className="cycle-card p-4 text-center">
              <ApperIcon name="Calendar" className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="text-2xl font-bold gradient-text">{Object.keys(cycleData).length}</h4>
              <p className="text-sm text-gray-600">Days Tracked</p>
            </div>
            <div className="cycle-card p-4 text-center">
              <ApperIcon name="Droplets" className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <h4 className="text-2xl font-bold text-pink-600">
                {Object.values(cycleData).filter(d => d.flowLevel !== 'none').length}
              </h4>
              <p className="text-sm text-gray-600">Period Days</p>
            </div>
            <div className="cycle-card p-4 text-center">
              <ApperIcon name="Heart" className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="text-2xl font-bold text-purple-600">
                {Object.values(cycleData).reduce((acc, d) => acc + d.symptoms.length, 0)}
              </h4>
              <p className="text-sm text-gray-600">Symptoms Logged</p>
            </div>
            <div className="cycle-card p-4 text-center">
              <ApperIcon name="FileText" className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <h4 className="text-2xl font-bold text-indigo-600">
                {Object.values(cycleData).filter(d => d.notes).length}
              </h4>
              <p className="text-sm text-gray-600">Notes Added</p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}