"use client"

import { useState } from "react"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "create", label: "New Goal", icon: "🎯" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-border shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage("landing")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Accountability</h1>
              <p className="text-xs text-muted-foreground">Agent</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === item.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">Alex Chen</p>
              <p className="text-xs text-muted-foreground">$245 staked</p>
            </div>
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
              AC
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setIsMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 flex items-center gap-2 rounded-lg font-medium transition-all ${
                  currentPage === item.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
