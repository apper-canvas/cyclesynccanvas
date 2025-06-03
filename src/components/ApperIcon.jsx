import { Calendar, Pill, Stethoscope, Heart, Plus, Trash2, X, Menu, Sun, Moon, Home, BarChart3, User, Bell, Shield, Settings, TrendingUp, UserPlus, Check, Download } from 'lucide-react'

const icons = {
  Home,
  Calendar,
  BarChart3,
  User,
  Heart,
  Moon,
  Sun,
  Menu,
  X,
  Plus,
  Trash2,
  Pill,
  Stethoscope,
  Bell,
  Shield,
  Settings,
  TrendingUp,
  UserPlus,
  Check,
  Download
}

export default function ApperIcon({ name, className = "w-6 h-6", ...props }) {
  const IconComponent = icons[name]
  
  if (!IconComponent) {
    return null
  }
  
  return <IconComponent className={className} {...props} />
}