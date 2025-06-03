import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
const [activeTab, setActiveTab] = useState('personal')
  const [isNewUser, setIsNewUser] = useState(false)
  
  const [createProfileData, setCreateProfileData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    cycleLength: 28,
    periodLength: 5,
    healthGoals: []
  })
  
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    dateOfBirth: '1995-06-15',
    cycleLength: 28,
    periodLength: 5
  })

  const [notifications, setNotifications] = useState({
    periodReminder: true,
    fertileWindow: true,
    symptomReminder: false,
    medicationReminder: true,
    emailNotifications: false,
    pushNotifications: true
  })

  const [privacy, setPrivacy] = useState({
    shareData: false,
    analyticsTracking: true,
    backupEnabled: true
  })

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

  const handlePersonalInfoSave = () => {
    // Validate input
    if (!personalInfo.name || !personalInfo.email) {
      toast.error('Please fill in all required fields')
      return
    }

    // Save personal info
    toast.success('Personal information updated successfully!')
  }

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    toast.success('Notification preferences updated')
  }

  const handlePrivacyToggle = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    toast.success('Privacy settings updated')
  }

  const handleExportData = () => {
    // Mock data export
    const data = {
      personalInfo,
      cycleData: {},
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cyclesync-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    
    toast.success('Data exported successfully!')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.success('Account deletion request submitted. You will receive a confirmation email.')
    }
}

  const handleCreateProfile = () => {
    // Validate required fields
    if (!createProfileData.name || !createProfileData.email || !createProfileData.dateOfBirth) {
      toast.error('Please fill in all required fields')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(createProfileData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Validate cycle data
    if (createProfileData.cycleLength < 21 || createProfileData.cycleLength > 45) {
      toast.error('Cycle length should be between 21-45 days')
      return
    }

    if (createProfileData.periodLength < 2 || createProfileData.periodLength > 10) {
      toast.error('Period length should be between 2-10 days')
      return
    }

    // Save profile data
    setPersonalInfo({
      name: createProfileData.name,
      email: createProfileData.email,
      dateOfBirth: createProfileData.dateOfBirth,
      cycleLength: createProfileData.cycleLength,
      periodLength: createProfileData.periodLength
    })

    setIsNewUser(false)
    setActiveTab('personal')
    toast.success('Profile created successfully! Welcome to CycleSync!')
  }

  const handleHealthGoalToggle = (goal) => {
    setCreateProfileData(prev => ({
      ...prev,
      healthGoals: prev.healthGoals.includes(goal)
        ? prev.healthGoals.filter(g => g !== goal)
        : [...prev.healthGoals, goal]
    }))
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
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">Profile Settings</h2>
            <p className="text-gray-600 dark:text-gray-300">Manage your account and preferences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="cycle-card p-4">
                <nav className="space-y-2">
{[
                    { id: 'create', label: 'Create Profile', icon: 'UserPlus' },
                    { id: 'personal', label: 'Personal Info', icon: 'User' },
                    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
                    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
                    { id: 'account', label: 'Account', icon: 'Settings' }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                          : 'text-gray-700 hover:bg-pink-100 hover:text-primary'
                      }`}
                    >
                      <ApperIcon name={tab.icon} className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
className="lg:col-span-3"
            >
              <div className="cycle-card p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'create' && (
                    <motion.div
                      key="create"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                          <ApperIcon name="UserPlus" className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold gradient-text mb-2">Welcome to CycleSync!</h3>
                        <p className="text-gray-600">Let's set up your profile to get personalized cycle tracking</p>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                            <input
                              type="text"
                              value={createProfileData.name}
                              onChange={(e) => setCreateProfileData(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Enter your full name"
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                            <input
                              type="email"
                              value={createProfileData.email}
                              onChange={(e) => setCreateProfileData(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="Enter your email"
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                          <input
                            type="date"
                            value={createProfileData.dateOfBirth}
                            onChange={(e) => setCreateProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                          />
                        </div>

                        <div className="bg-pink-50 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-800 mb-4">Cycle Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Average Cycle Length (days)</label>
                              <input
                                type="number"
                                min="21"
                                max="45"
                                value={createProfileData.cycleLength}
                                onChange={(e) => setCreateProfileData(prev => ({ ...prev, cycleLength: parseInt(e.target.value) }))}
                                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                              />
                              <p className="text-xs text-gray-500 mt-1">Typically 21-45 days</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Average Period Length (days)</label>
                              <input
                                type="number"
                                min="2"
                                max="10"
                                value={createProfileData.periodLength}
                                onChange={(e) => setCreateProfileData(prev => ({ ...prev, periodLength: parseInt(e.target.value) }))}
                                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                              />
                              <p className="text-xs text-gray-500 mt-1">Typically 2-10 days</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-4">Health Goals (Optional)</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              'Track Fertility',
                              'Monitor Symptoms',
                              'Plan Pregnancy',
                              'Manage PMS',
                              'Track Mood',
                              'General Health'
                            ].map((goal) => (
                              <motion.button
                                key={goal}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleHealthGoalToggle(goal)}
                                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                  createProfileData.healthGoals.includes(goal)
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {goal}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCreateProfile}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            <ApperIcon name="Check" className="w-5 h-5 inline mr-2" />
                            Create My Profile
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('personal')}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary hover:text-primary transition-all duration-200"
                          >
                            Skip for Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'personal' && (
                    <motion.div
                      key="personal"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Personal Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={personalInfo.name}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                          <input
                            type="date"
                            value={personalInfo.dateOfBirth}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Average Cycle Length</label>
                            <input
                              type="number"
                              value={personalInfo.cycleLength}
                              onChange={(e) => setPersonalInfo(prev => ({ ...prev, cycleLength: parseInt(e.target.value) }))}
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Average Period Length</label>
                            <input
                              type="number"
                              value={personalInfo.periodLength}
                              onChange={(e) => setPersonalInfo(prev => ({ ...prev, periodLength: parseInt(e.target.value) }))}
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 focus:outline-none"
                            />
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePersonalInfoSave}
                          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Save Changes
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'notifications' && (
                    <motion.div
                      key="notifications"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Notification Preferences</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'periodReminder', label: 'Period Reminders', desc: 'Get notified before your period starts' },
                          { key: 'fertileWindow', label: 'Fertile Window Alerts', desc: 'Know when you\'re most fertile' },
                          { key: 'symptomReminder', label: 'Daily Symptom Reminders', desc: 'Remember to log your symptoms' },
                          { key: 'medicationReminder', label: 'Medication Reminders', desc: 'Never miss your medications' },
                          { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                          { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get instant app notifications' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <h4 className="font-medium text-gray-800">{item.label}</h4>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleNotificationToggle(item.key)}
                              className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                                notifications[item.key] ? 'bg-primary' : 'bg-gray-300'
                              }`}
                            >
                              <motion.div
                                className="w-5 h-5 bg-white rounded-full shadow-md"
                                animate={{ x: notifications[item.key] ? 24 : 2 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'privacy' && (
                    <motion.div
                      key="privacy"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Privacy Settings</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'shareData', label: 'Share Anonymous Data', desc: 'Help improve the app by sharing anonymous usage data' },
                          { key: 'analyticsTracking', label: 'Analytics Tracking', desc: 'Allow us to track app usage for improvements' },
                          { key: 'backupEnabled', label: 'Cloud Backup', desc: 'Automatically backup your data to the cloud' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <h4 className="font-medium text-gray-800">{item.label}</h4>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handlePrivacyToggle(item.key)}
                              className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                                privacy[item.key] ? 'bg-primary' : 'bg-gray-300'
                              }`}
                            >
                              <motion.div
                                className="w-5 h-5 bg-white rounded-full shadow-md"
                                animate={{ x: privacy[item.key] ? 24 : 2 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'account' && (
                    <motion.div
                      key="account"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Account Management</h3>
                      <div className="space-y-6">
                        <div className="p-6 bg-blue-50 rounded-xl">
                          <h4 className="font-semibold text-gray-800 mb-2">Export Your Data</h4>
                          <p className="text-sm text-gray-600 mb-4">Download all your cycle data in JSON format</p>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleExportData}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                          >
                            <ApperIcon name="Download" className="w-4 h-4 inline mr-2" />
                            Export Data
                          </motion.button>
                        </div>

                        <div className="p-6 bg-red-50 rounded-xl">
                          <h4 className="font-semibold text-gray-800 mb-2">Delete Account</h4>
                          <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all associated data</p>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDeleteAccount}
                            className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4 inline mr-2" />
                            Delete Account
                          </motion.button>
</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}