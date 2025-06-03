import { 
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
  Stethoscope
} from 'lucide-react'

const icons = {
  Home,
  Calendar,
  BarChart3,
  User,
User,
  Heart,
  Moon,
  Sun,
  Menu,
  X,
  Plus,
  Trash2,
  Pill,
  Stethoscope
}

export default function ApperIcon({ name, className = "w-6 h-6", ...props }) {
  const IconComponent = icons[name]
  
  if (!IconComponent) {
    return null
  }
  
  return <IconComponent className={className} {...props} />
}