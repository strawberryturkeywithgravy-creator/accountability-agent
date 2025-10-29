"use client"

import type React from "react"

import { useState } from "react"

interface GoalCreationProps {
  setCurrentPage: (page: string) => void
}

export default function GoalCreation({ setCurrentPage }: GoalCreationProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "fitness",
    stake: "",
    target: "",
    unit: "km",
    daysToComplete: "7",
  })

  const categories = [
    { id: "fitness", label: "Fitness", icon: "💪" },
    { id: "learning", label: "Learning", icon: "📚" },
    { id: "health", label: "Health", icon: "🏥" },
    { id: "career", label: "Career", icon: "💼" },
  ]

  const units = {
    fitness: ["km", "miles", "sessions", "hours", "reps"],
    learning: ["levels", "lessons", "hours", "books"],
    health: ["days", "hours", "sessions", "meals"],
    career: ["hours", "projects", "tasks", "meetings"],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Goal created:", formData)
    setCurrentPage("dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Create New Goal</h1>
        <p className="text-lg text-muted-foreground">
          Stake your funds and commit to your goal. Complete it to earn rewards.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8">
        {/* Goal Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">Goal Title</label>
          <input
            type="text"
            placeholder="e.g., Run 50km this week"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-3">Category</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat.id })}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  formData.category === cat.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="text-2xl block mb-1">{cat.icon}</span>
                <span className="text-sm font-semibold text-foreground">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stake Amount */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">Stake Amount ($)</label>
          <input
            type="number"
            placeholder="50"
            value={formData.stake}
            onChange={(e) => setFormData({ ...formData, stake: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            This amount will be locked until you complete or fail the goal.
          </p>
        </div>

        {/* Target & Unit */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Target</label>
            <input
              type="number"
              placeholder="50"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Unit</label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {units[formData.category as keyof typeof units]?.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Days to Complete */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-foreground mb-2">Days to Complete</label>
          <select
            value={formData.daysToComplete}
            onChange={(e) => setFormData({ ...formData, daysToComplete: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="1">1 day</option>
            <option value="3">3 days</option>
            <option value="7">7 days (1 week)</option>
            <option value="14">14 days (2 weeks)</option>
            <option value="30">30 days (1 month)</option>
          </select>
        </div>

        {/* Summary */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8">
          <p className="text-sm text-muted-foreground mb-2">Summary</p>
          <div className="space-y-1">
            <p className="text-foreground">
              <span className="font-semibold">Goal:</span> {formData.title || "Not set"}
            </p>
            <p className="text-foreground">
              <span className="font-semibold">Stake:</span> ${formData.stake || "0"}
            </p>
            <p className="text-foreground">
              <span className="font-semibold">Target:</span> {formData.target || "0"} {formData.unit}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button type="submit" className="flex-1 btn-primary">
            Create Goal
          </button>
          <button type="button" onClick={() => setCurrentPage("dashboard")} className="flex-1 btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
