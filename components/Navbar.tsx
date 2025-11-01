'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { Moon, Sun, BookOpen, Plus, Home, Menu, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { darkMode, toggleDarkMode } = useAppStore()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    { href: '/', label: 'N5 Kanjis', icon: Home },
    { href: '/my-flashcards', label: 'My Flashcards', icon: BookOpen },
    { href: '/add-new', label: 'Add New', icon: Plus },
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-xl sm:text-2xl font-bold text-japanese-red">漢字</span>
            <span className="text-sm sm:text-lg font-semibold dark:text-white">JLPT N5</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-md transition-colors text-sm sm:text-base ${
                    isActive
                      ? 'bg-japanese-red text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {loading ? (
              <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-japanese-red rounded-full animate-spin" />
            ) : user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 hidden lg:inline truncate max-w-[120px]">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors touch-manipulation"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-japanese-red text-white rounded-md hover:bg-japanese-red-light transition-colors touch-manipulation"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-2 animate-in slide-in-from-top">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors mx-2 my-1 ${
                    isActive
                      ? 'bg-japanese-red text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
            
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              {loading ? (
                <div className="w-6 h-6 border-2 border-gray-300 border-t-japanese-red rounded-full animate-spin mx-auto" />
              ) : user ? (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 px-2 truncate">{user.email}</p>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors touch-manipulation"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-2 text-sm bg-japanese-red text-white rounded-md hover:bg-japanese-red-light transition-colors text-center touch-manipulation"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

