import {
  Sparkles,
  Smile,
  Shield,
  Scissors,
  Heart,
  Zap,
  Stethoscope,
  Award,
  GraduationCap,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Search,
  ArrowRight,
  User,
  Star,
  Plus,
} from "lucide-react";

export const iconMap: Record<string, any> = {
  Sparkles,
  Smile,
  Shield,
  Scissors,
  Heart,
  Zap,
  Stethoscope,
  Award,
  GraduationCap,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Search,
  ArrowRight,
  User,
  Star,
  Plus,
};

export const getIcon = (iconName: string) => {
  return iconMap[iconName] || Smile;
};
