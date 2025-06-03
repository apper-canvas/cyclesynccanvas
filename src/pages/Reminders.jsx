import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

export default function Reminders() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [reminders, setReminders] = useState([
    {
      id: 1,
      type: 'period',
      title: 'Period Starting Soon',
      description: 'Your period is expected to start in 2 days',
      time: '09:00 AM',
      days: ['Monday', 'Tuesday'],
      enabled: true,
      icon: 'Calendar'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Birth Control Pill',
      description: 'Take your daily birth control pill',
      time: '08:00 PM',
      days: ['Daily'],
      enabled: true,
      icon: 'Pill'
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Gynecologist Appointment',
      description: 'Annual checkup with Dr. Smith',
      time: '02:30 PM',
      days: ['March 15'],
      enabled: true,
      icon: 'Stethoscope'
    }
  ])
  
  const location = useLocation()
  
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ))
    const reminder = reminders.find(r => r.id === id)
    toast.success(`${reminder.title} ${!reminder.enabled ? 'enabled' : 'disabled'}`)
  }

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
    toast.success('Reminder deleted successfully')
  }

  const addReminder = () => {
    setShowAddModal(true)
  }

  const handleAddReminderSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newReminder = {
      id: Date.now(),
      type: formData.get('type'),
      title: formData.get('title'),
      description: formData.get('description'),
      time: formData.get('time'),
      days: [formData.get('frequency')],
      enabled: true,
      icon: formData.get('type') === 'period' ? 'Calendar' : 
             formData.get('type') === 'medication' ? 'Pill' : 'Stethoscope'
    }
    
    setReminders([...reminders, newReminder])
    setShowAddModal(false)
    toast.success('Reminder added successfully!')
  }

  const reminderTypes = [
    { 
      id: 'period', 
      label: 'Period Reminders', 
      description: 'Get notified about upcoming periods',
      icon: 'Calendar',
      color: 'from-red-500 to-pink-500'
    },
    { 
      id: 'medication', 
      label: 'Medication Alerts', 
      description: 'Never miss your birth control or supplements',
      icon: 'Pill',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      id: 'appointment', 
      label: 'Medical Appointments', 
      description: 'Schedule and track healthcare visits',
      icon: 'Stethoscope',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'fertility', 
      label: 'Fertility Windows', 
      description: 'Track your most fertile days',
      icon: 'Heart',
      color: 'from-purple-500 to-violet-500'
    }
  ]

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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">Reminders</h1>
              <p className="text-gray-600 dark:text-gray-400">Stay on top of your health routine</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addReminder}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Reminder</span>
            </motion.button>
          </div>

          {/* Reminder Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {reminderTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cycle-card p-4 text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <ApperIcon name={type.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{type.label}</h3>
                <p className="text-xs text-gray-600">{type.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Active Reminders */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Reminders</h2>
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cycle-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${
                      reminder.type === 'period' ? 'from-red-500 to-pink-500' :
                      reminder.type === 'medication' ? 'from-blue-500 to-indigo-500' :
                      'from-green-500 to-emerald-500'
                    } rounded-xl flex items-center justify-center`}>
                      <ApperIcon name={reminder.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{reminder.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">{reminder.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>⏰ {reminder.time}</span>
                        <span>📅 {reminder.days.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleReminder(reminder.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        reminder.enabled ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          reminder.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteReminder(reminder.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Add Reminder Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Add New Reminder</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddReminderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select name="type" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="period">Period</option>
                    <option value="medication">Medication</option>
                    <option value="appointment">Appointment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter reminder title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Optional description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select name="frequency" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Add Reminder
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}