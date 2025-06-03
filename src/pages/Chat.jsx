import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm here to help you with any questions about your cycle tracking journey. How can I support you today?",
      sender: 'support',
      timestamp: new Date(Date.now() - 60000)
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showFloatingChat, setShowFloatingChat] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef(null)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/tracker', label: 'Tracker', icon: 'Calendar' },
    { path: '/insights', label: 'Insights', icon: 'BarChart3' },
    { path: '/profile', label: 'Profile', icon: 'User' },
    { path: '/chat', label: 'Support', icon: 'MessageCircle' }
  ]

  const quickResponses = [
    "How do I track my cycle?",
    "What do the different flow levels mean?",
    "How accurate are the predictions?",
    "Can I export my data?",
    "Is my data secure?",
    "How do I set reminders?"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Show floating chat button on other pages
    setShowFloatingChat(location.pathname !== '/chat')
  }, [location.pathname])

  const handleSendMessage = (messageText = newMessage) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate support response
    setTimeout(() => {
      const supportMessage = {
        id: Date.now() + 1,
        text: getSupportResponse(messageText),
        sender: 'support',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, supportMessage])
      setIsTyping(false)
    }, 1500)

    toast.success('Message sent!')
  }

  const getSupportResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('track') || lowerMessage.includes('cycle')) {
      return "Great question! To track your cycle, simply go to the Tracker page and log your flow level, symptoms, and mood daily. The app will help you identify patterns and predict your next period. 📊"
    } else if (lowerMessage.includes('flow') || lowerMessage.includes('level')) {
      return "Flow levels help us understand your period intensity: None (no flow), Spotting (very light), Light (comfortable), Medium (regular), and Heavy (frequent changes needed). This helps track your cycle patterns! 🌸"
    } else if (lowerMessage.includes('prediction') || lowerMessage.includes('accurate')) {
      return "Our predictions become more accurate as you log more cycles! With 3+ cycles, we can predict your next period within 1-2 days. The more data you provide, the better our predictions become. ✨"
    } else if (lowerMessage.includes('export') || lowerMessage.includes('data')) {
      return "Yes! You can export your cycle data from the Profile page. We support PDF reports and CSV files so you can share with your healthcare provider or keep personal backups. 📄"
    } else if (lowerMessage.includes('secure') || lowerMessage.includes('privacy')) {
      return "Your privacy is our priority! All data is encrypted and stored securely on your device. We never share your personal health information with third parties. Your data belongs to you! 🔒"
    } else if (lowerMessage.includes('reminder') || lowerMessage.includes('notification')) {
      return "Setting reminders is easy! Visit the Reminders page to set up notifications for period predictions, pill reminders, appointment alerts, and daily logging. Stay on top of your health journey! ⏰"
    } else {
      return "Thank you for reaching out! I'm here to help with any questions about cycle tracking, app features, or general wellness support. Feel free to ask me anything or check out our quick response options below. 💕"
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(timestamp)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 glass-effect border-b border-pink-200/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="Heart" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold gradient-text">CycleSync</h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/60 hover:text-primary'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
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

      {/* Main Chat Interface */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-200/50 overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <ApperIcon name="MessageCircle" className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Chat Support</h1>
                <p className="text-pink-100">We're here to help with your wellness journey</p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-96 sm:h-[500px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                      : 'bg-gray-100 text-gray-800'
                  } rounded-2xl px-4 py-3`}>
                    <p className="text-sm sm:text-base">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSendMessage(response)}
                  className="text-xs sm:text-sm px-3 py-2 bg-pink-100 text-primary rounded-full hover:bg-pink-200 transition-colors"
                >
                  {response}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage()}
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ApperIcon name="Send" className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Floating Chat Button (for other pages) */}
      <AnimatePresence>
        {showFloatingChat && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Link to="/chat">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center"
              >
                <ApperIcon name="MessageCircle" className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}