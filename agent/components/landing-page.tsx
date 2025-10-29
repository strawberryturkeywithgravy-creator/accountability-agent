"use client"

import { useEffect, useState } from "react"

interface LandingPageProps {
  setCurrentPage: (page: string) => void
}

export default function LandingPage({ setCurrentPage }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: "💪",
      title: "Stake Your Commitment",
      description: "Put real money on the line. Your stake shows you're serious about your goals.",
    },
    {
      icon: "🎯",
      title: "Track Progress",
      description: "Monitor your journey with real-time tracking and visual progress indicators.",
    },
    {
      icon: "💰",
      title: "Earn Rewards",
      description: "Complete your goals and earn from the pool of failed commitments.",
    },
    {
      icon: "🏆",
      title: "Compete & Win",
      description: "Climb the leaderboard and prove you're the most accountable.",
    },
  ]

  const stats = [
    { value: "$127K", label: "Total Staked" },
    { value: "2,847", label: "Active Users" },
    { value: "68%", label: "Success Rate" },
    { value: "$89K", label: "Rewards Paid" },
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Logo Animation */}
          <div
            className={`inline-flex items-center gap-3 mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
              <span className="text-white font-bold text-2xl">AA</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-foreground">Accountability</h1>
              <p className="text-sm text-muted-foreground">Agent</p>
            </div>
          </div>

          {/* Main Headline */}
          <h2
            className={`text-5xl md:text-7xl font-bold text-foreground mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Turn Your Goals Into
            <br />
            <span className="text-secondary">Real Commitments</span>
          </h2>

          {/* Subheadline */}
          <p
            className={`text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Stake money on your fitness and learning goals. Complete them to earn rewards from those who didn't follow
            through.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-all"
            >
              How It Works
            </button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:scale-105 transition-all hover:shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">How It Works</h3>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Simple, transparent, and designed to keep you accountable
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
            Join Thousands of <span className="text-secondary">Achievers</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Fitness Enthusiast",
                quote: "Lost 15kg in 3 months. The stake made me show up every single day.",
                avatar: "SJ",
              },
              {
                name: "Mike Chen",
                role: "Software Engineer",
                quote: "Completed 5 coding courses. Earned $340 while learning. Win-win!",
                avatar: "MC",
              },
              {
                name: "Emma Davis",
                role: "Marathon Runner",
                quote: "Ran my first marathon. The accountability kept me training consistently.",
                avatar: "ED",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Commit?</h3>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Start your accountability journey today. Your future self will thank you.
          </p>
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="btn-primary text-lg px-12 py-5 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  )
}
