"use client"

import { useState } from "react"
import GoalCard from "./goal-card"
import StatsCard from "./stats-card"

interface DashboardProps {
  setCurrentPage: (page: string) => void
}

export default function Dashboard({ setCurrentPage }: DashboardProps) {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Run 50km this week",
      category: "fitness",
      stake: 50,
      status: "active",
      progress: 35,
      target: 50,
      unit: "km",
      daysLeft: 3,
      reward: 125,
    },
    {
      id: 2,
      title: "Complete Duolingo Gold League",
      category: "learning",
      stake: 30,
      status: "active",
      progress: 8,
      target: 10,
      unit: "levels",
      daysLeft: 5,
      reward: 85,
    },
    {
      id: 3,
      title: "Gym 5 times this week",
      category: "fitness",
      stake: 40,
      status: "completed",
      progress: 5,
      target: 5,
      unit: "sessions",
      daysLeft: 0,
      reward: 120,
    },
  ])

  const stats = {
    totalStaked: 120,
    activeGoals: 2,
    completedGoals: 1,
    totalEarned: 120,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Your Accountability <span className="text-secondary">Journey</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Stake your funds on goals you believe in. Complete them to earn rewards from those who didn't.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <StatsCard label="Total Staked" value={`$${stats.totalStaked}`} icon="💰" />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <StatsCard label="Active Goals" value={stats.activeGoals} icon="🎯" />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <StatsCard label="Completed" value={stats.completedGoals} icon="✅" />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <StatsCard label="Total Earned" value={`$${stats.totalEarned}`} icon="🏆" />
        </div>
      </div>

      {/* Active Goals Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Active Goals</h2>
          <button onClick={() => setCurrentPage("create")} className="btn-secondary">
            + New Goal
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals
            .filter((g) => g.status === "active")
            .map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
        </div>
      </div>

      {/* Completed Goals Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Completed Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals
            .filter((g) => g.status === "completed")
            .map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
        </div>
      </div>
    </div>
  )
}
