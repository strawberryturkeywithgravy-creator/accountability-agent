"use client"

import { useState } from "react"

interface LeaderboardUser {
  rank: number
  name: string
  avatar: string
  totalStaked: number
  completedGoals: number
  successRate: number
  totalEarned: number
}

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState("week")

  const leaderboardData: LeaderboardUser[] = [
    {
      rank: 1,
      name: "Alex Chen",
      avatar: "AC",
      totalStaked: 450,
      completedGoals: 12,
      successRate: 92,
      totalEarned: 680,
    },
    {
      rank: 2,
      name: "Jordan Smith",
      avatar: "JS",
      totalStaked: 380,
      completedGoals: 10,
      successRate: 85,
      totalEarned: 520,
    },
    {
      rank: 3,
      name: "Taylor Brown",
      avatar: "TB",
      totalStaked: 320,
      completedGoals: 9,
      successRate: 88,
      totalEarned: 450,
    },
    {
      rank: 4,
      name: "Morgan Lee",
      avatar: "ML",
      totalStaked: 290,
      completedGoals: 8,
      successRate: 80,
      totalEarned: 380,
    },
    {
      rank: 5,
      name: "Casey Wilson",
      avatar: "CW",
      totalStaked: 250,
      completedGoals: 7,
      successRate: 78,
      totalEarned: 320,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Leaderboard</h1>
        <p className="text-lg text-muted-foreground">See who's crushing their accountability goals</p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-3 mb-8">
        {["week", "month", "all-time"].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              timeframe === tf ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {tf === "week" ? "This Week" : tf === "month" ? "This Month" : "All Time"}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Completed</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Success Rate</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Total Staked</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Earned</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, idx) => (
                <tr
                  key={user.rank}
                  className={`border-b border-border transition-colors ${
                    idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                  } hover:bg-muted/40`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.rank}
                      </div>
                      {user.rank === 1 && <span className="text-xl">🥇</span>}
                      {user.rank === 2 && <span className="text-xl">🥈</span>}
                      {user.rank === 3 && <span className="text-xl">🥉</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                        {user.avatar}
                      </div>
                      <span className="font-semibold text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-foreground">{user.completedGoals}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${user.successRate}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{user.successRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-foreground">${user.totalStaked}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-lg text-primary">${user.totalEarned}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Pool</p>
          <p className="text-3xl font-bold text-primary">$2,690</p>
          <p className="text-xs text-muted-foreground mt-2">Staked this week</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Avg Success Rate</p>
          <p className="text-3xl font-bold text-secondary">84.6%</p>
          <p className="text-xs text-muted-foreground mt-2">Across all users</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Distributed</p>
          <p className="text-3xl font-bold text-accent-foreground">$2,350</p>
          <p className="text-xs text-muted-foreground mt-2">In rewards</p>
        </div>
      </div>
    </div>
  )
}
