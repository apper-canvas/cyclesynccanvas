import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { format, subMonths, addDays } from 'date-fns'
import ApperIcon from '../components/ApperIcon'

export default function Insights() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const [selectedPeriod, setSelectedPeriod] = useState('3months')

  const navItems = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/tracker', label: 'Tracker', icon: 'Calendar' },
    { path: '/insights', label: 'Insights', icon: 'BarChart3' },
    { path: '/profile', label: 'Profile', icon: 'User' }
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Mock data for demonstration
  const cycleStats = {
    averageLength: 28,
    shortestCycle: 26,
    longestCycle: 30,
    averagePeriodLength: 5,
    nextPeriodDate: addDays(new Date(), 14),
    fertileWindowStart: addDays(new Date(), 10),
    fertileWindowEnd: addDays(new Date(), 16)
  }

  const symptomFrequency = [
    { symptom: 'Cramps', frequency: 85, severity: 'moderate' },
    { symptom: 'Bloating', frequency: 70, severity: 'mild' },
    { symptom: 'Headache', frequency: 60, severity: 'mild' },
    { symptom: 'Fatigue', frequency: 75, severity: 'moderate' },
    { symptom: 'Mood Swings', frequency: 65, severity: 'moderate' }
  ]

  const cycleHistory = [
    { month: 'Jan', length: 28, periodLength: 5 },
    { month: 'Feb', length: 27, periodLength: 6 },
    { month: 'Mar', length: 29, periodLength: 5 },
    { month: 'Apr', length: 28, periodLength: 5 },
    { month: 'May', length: 30, periodLength: 4 },
    { month: 'Jun', length: 28, periodLength: 5 }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return 'text-green-600'
      case 'moderate': return 'text-yellow-600'
      case 'severe': return 'text-red-600'
      default: return 'text-gray-600'
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
<ApperIcon 
                  name={mobileMenuOpen ? "X" : "Menu"} 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" 
                />
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
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
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">Your Personal Patterns</h2>
            <p className="text-gray-600 dark:text-gray-300">Discover your unique rhythm and celebrate your body's wisdom</p>
          </motion.div>
          {/* Period Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex space-x-2 mb-8"
          >
            {[
              { value: '3months', label: '3 Months' },
              { value: '6months', label: '6 Months' },
              { value: '1year', label: '1 Year' }
            ].map((period) => (
              <motion.button
                key={period.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  selectedPeriod === period.value
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-pink-200/50'
                }`}
              >
                {period.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="cycle-card p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Calendar" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-1">{cycleStats.averageLength}</h3>
              <p className="text-sm text-gray-600">Average Cycle Length</p>
              <p className="text-xs text-gray-500 mt-1">{cycleStats.shortestCycle}-{cycleStats.longestCycle} days range</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="cycle-card p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Droplets" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-pink-600 mb-1">{cycleStats.averagePeriodLength}</h3>
              <p className="text-sm text-gray-600">Average Period Length</p>
              <p className="text-xs text-gray-500 mt-1">days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="cycle-card p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="TrendingUp" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-purple-600 mb-1">
                {Math.ceil((cycleStats.nextPeriodDate - new Date()) / (1000 * 60 * 60 * 24))}
              </h3>
              <p className="text-sm text-gray-600">Days to Next Period</p>
              <p className="text-xs text-gray-500 mt-1">{format(cycleStats.nextPeriodDate, 'MMM d')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="cycle-card p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Flower" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-green-600 mb-1">
                {Math.ceil((cycleStats.fertileWindowStart - new Date()) / (1000 * 60 * 60 * 24))}
              </h3>
              <p className="text-sm text-gray-600">Days to Fertile Window</p>
              <p className="text-xs text-gray-500 mt-1">
                {format(cycleStats.fertileWindowStart, 'MMM d')} - {format(cycleStats.fertileWindowEnd, 'MMM d')}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Cycle History Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="cycle-card p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Cycle History</h3>
              <div className="space-y-4">
                {cycleHistory.map((cycle, index) => (
                  <div key={cycle.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 w-12">{cycle.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${(cycle.length / 35) * 100}%` }}
                          >
                            <span className="text-xs text-white font-medium">{cycle.length}d</span>
                          </div>
                        </div>
                        <div 
                          className="absolute top-0 left-0 bg-red-500 h-6 rounded-l-full"
                          style={{ width: `${(cycle.periodLength / 35) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-600">Period</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded"></div>
                  <span className="text-sm text-gray-600">Cycle Length</span>
                </div>
              </div>
            </motion.div>

            {/* Symptom Analysis */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="cycle-card p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Common Symptoms</h3>
              <div className="space-y-4">
                {symptomFrequency.map((item) => (
                  <div key={item.symptom}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.symptom}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium ${getSeverityColor(item.severity)}`}>
                          {item.severity}
                        </span>
                        <span className="text-sm text-gray-600">{item.frequency}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.frequency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Predictions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 cycle-card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Upcoming Predictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 text-center">
                <ApperIcon name="Calendar" className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Next Period</h4>
                <p className="text-2xl font-bold text-pink-600 mb-1">
                  {format(cycleStats.nextPeriodDate, 'MMM d')}
                </p>
                <p className="text-sm text-gray-600">Expected start date</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                <ApperIcon name="Flower" className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Fertile Window</h4>
                <p className="text-2xl font-bold text-green-600 mb-1">
                  {format(cycleStats.fertileWindowStart, 'MMM d-')}
                  {format(cycleStats.fertileWindowEnd, 'd')}
                </p>
                <p className="text-sm text-gray-600">Peak fertility period</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 text-center">
                <ApperIcon name="Moon" className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Ovulation</h4>
                <p className="text-2xl font-bold text-purple-600 mb-1">
                  {format(addDays(cycleStats.fertileWindowStart, 3), 'MMM d')}
                </p>
                <p className="text-sm text-gray-600">Estimated ovulation day</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}