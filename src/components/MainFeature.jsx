import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns'
import ApperIcon from './ApperIcon'

export default function MainFeature() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState('log')
  const [cycleData, setCycleData] = useState({})
  const [currentEntry, setCurrentEntry] = useState({
    flowLevel: 'none',
    symptoms: [],
    mood: 'neutral',
    notes: ''
  })

  // Mock data for demonstration
  const [cycles] = useState([
    { startDate: new Date(2024, 0, 15), endDate: new Date(2024, 0, 20) },
    { startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 17) },
    { startDate: new Date(2024, 2, 10), endDate: new Date(2024, 2, 15) }
  ])

  const flowLevels = [
    { value: 'none', label: 'None', color: 'bg-gray-200', icon: 'Circle' },
    { value: 'spotting', label: 'Spotting', color: 'bg-pink-200', icon: 'Droplets' },
    { value: 'light', label: 'Light', color: 'bg-pink-400', icon: 'Droplets' },
    { value: 'medium', label: 'Medium', color: 'bg-pink-600', icon: 'Droplets' },
    { value: 'heavy', label: 'Heavy', color: 'bg-red-600', icon: 'Droplets' }
  ]

  const symptoms = [
    'Cramps', 'Headache', 'Bloating', 'Tender Breasts', 'Acne', 
    'Back Pain', 'Fatigue', 'Nausea', 'Mood Swings', 'Cravings'
  ]

  const moods = [
    { value: 'happy', label: 'Happy', icon: 'Smile', color: 'text-green-500' },
    { value: 'neutral', label: 'Neutral', icon: 'Meh', color: 'text-gray-500' },
    { value: 'sad', label: 'Sad', icon: 'Frown', color: 'text-blue-500' },
    { value: 'angry', label: 'Angry', icon: 'Angry', color: 'text-red-500' },
    { value: 'anxious', label: 'Anxious', icon: 'Zap', color: 'text-yellow-500' }
  ]

  // Generate calendar days
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Check if date is a period day
  const isPeriodDay = (date) => {
    return cycles.some(cycle => 
      date >= cycle.startDate && date <= cycle.endDate
    )
  }

  // Check if date is fertile window (approximate)
  const isFertileDay = (date) => {
    const lastCycle = cycles[cycles.length - 1]
    if (!lastCycle) return false
    
    const ovulationDate = addDays(lastCycle.startDate, 14)
    const fertileStart = addDays(ovulationDate, -5)
    const fertileEnd = addDays(ovulationDate, 1)
    
    return date >= fertileStart && date <= fertileEnd
  }

  // Predict next period
  const predictNextPeriod = () => {
    if (cycles.length < 2) return null
    
    const avgCycleLength = cycles.reduce((acc, cycle, index) => {
      if (index === 0) return 0
      const prevCycle = cycles[index - 1]
      const days = Math.round((cycle.startDate - prevCycle.startDate) / (1000 * 60 * 60 * 24))
      return acc + days
    }, 0) / (cycles.length - 1)
    
    const lastCycle = cycles[cycles.length - 1]
    return addDays(lastCycle.startDate, Math.round(avgCycleLength))
  }

  const nextPeriodDate = predictNextPeriod()

  const handleSymptomToggle = (symptom) => {
    setCurrentEntry(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handleSaveEntry = () => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd')
    setCycleData(prev => ({
      ...prev,
      [dateKey]: { ...currentEntry }
    }))
    
    toast.success('Entry saved successfully!')
    
    // Reset form
    setCurrentEntry({
      flowLevel: 'none',
      symptoms: [],
      mood: 'neutral',
      notes: ''
    })
  }

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
      >
        <div className="cycle-card p-4 sm:p-6 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <ApperIcon name="Calendar" className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-1">28</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Cycle Length</p>
        </div>

        <div className="cycle-card p-4 sm:p-6 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <ApperIcon name="TrendingUp" className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
            {nextPeriodDate ? Math.ceil((nextPeriodDate - new Date()) / (1000 * 60 * 60 * 24)) : '--'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Days to Next Period</p>
        </div>

        <div className="cycle-card p-4 sm:p-6 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <ApperIcon name="Heart" className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">{Object.keys(cycleData).length}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Days Logged</p>
        </div>

        <div className="cycle-card p-4 sm:p-6 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <ApperIcon name="Target" className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">14</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Fertile Window</p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 mb-6 sm:mb-8 border border-pink-200/50"
      >
        {[
          { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
          { id: 'log', label: 'Log Entry', icon: 'PlusCircle' },
          { id: 'insights', label: 'Insights', icon: 'BarChart3' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/60'
            }`}
          >
            <ApperIcon name={tab.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:block">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="cycle-card p-4 sm:p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
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

            <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {calendarDays.map((day) => (
                <motion.button
                  key={day.toISOString()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDateSelect(day)}
                  className={`calendar-day ${isPeriodDay(day) ? 'period' : ''} ${
                    isFertileDay(day) ? 'fertile' : ''
                  } ${isToday(day) ? 'today' : ''} ${
                    isSameDay(day, selectedDate) ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                >
                  {format(day, 'd')}
                </motion.button>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                <span className="text-sm text-gray-600">Period Days</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Fertile Window</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 ring-2 ring-primary rounded-full"></div>
                <span className="text-sm text-gray-600">Today</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'log' && (
          <motion.div
            key="log"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="cycle-card p-4 sm:p-6 lg:p-8"
          >
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Log Entry for {format(selectedDate, 'MMMM d, yyyy')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track your symptoms, flow, and mood for today
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Flow Level */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Flow Level
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {flowLevels.map((flow) => (
                    <motion.button
                      key={flow.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentEntry(prev => ({ ...prev, flowLevel: flow.value }))}
                      className={`flow-button p-4 rounded-2xl border-2 transition-all duration-200 ${
                        currentEntry.flowLevel === flow.value
                          ? 'border-primary bg-primary/10 active'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 ${flow.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                        <ApperIcon name={flow.icon} className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{flow.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Symptoms
                </h3>
                <div className="flex flex-wrap gap-3">
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
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Mood
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {moods.map((mood) => (
                    <motion.button
                      key={mood.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentEntry(prev => ({ ...prev, mood: mood.value }))}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                        currentEntry.mood === mood.value
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ApperIcon name={mood.icon} className={`w-8 h-8 mx-auto mb-2 ${mood.color}`} />
                      <span className="text-sm font-medium">{mood.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Notes
                </h3>
                <textarea
                  value={currentEntry.notes}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any additional notes about how you're feeling today..."
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 focus:outline-none resize-none"
                  rows="4"
                />
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveEntry}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Save Entry
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="cycle-card p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Cycle Insights
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Cycle Regularity</h3>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-700">Regular</p>
                        <p className="text-sm text-gray-600">Your cycles are consistent</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Common Symptoms</h3>
                    <div className="space-y-2">
                      {['Cramps', 'Bloating', 'Fatigue'].map((symptom, index) => (
                        <div key={symptom} className="flex items-center justify-between">
                          <span className="text-gray-700">{symptom}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${90 - index * 20}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{90 - index * 20}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Fertility Tracking</h3>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ApperIcon name="Flower" className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-semibold text-green-700 mb-2">Peak Fertility</p>
                      <p className="text-sm text-gray-600">
                        {nextPeriodDate ? format(addDays(nextPeriodDate, -14), 'MMM d') : 'Not available'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Wellness Score</h3>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">85</span>
                      </div>
                      <p className="font-semibold text-orange-700 mb-2">Good</p>
                      <p className="text-sm text-gray-600">Based on your recent entries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}