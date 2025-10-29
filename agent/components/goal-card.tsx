"use client"

interface Goal {
  id: number
  title: string
  category: string
  stake: number
  status: string
  progress: number
  target: number
  unit: string
  daysLeft: number
  reward: number
}

interface GoalCardProps {
  goal: Goal
}

export default function GoalCard({ goal }: GoalCardProps) {
  const progressPercent = (goal.progress / goal.target) * 100
  const categoryEmoji =
    {
      fitness: "💪",
      learning: "📚",
      health: "🏥",
      career: "💼",
    }[goal.category] || "🎯"

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-hover">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-3xl">{categoryEmoji}</span>
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-lg">{goal.title}</h3>
            <p className="text-sm text-muted-foreground">
              {goal.daysLeft > 0 ? `${goal.daysLeft} days left` : "Completed"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">${goal.stake}</p>
          <p className="text-xs text-muted-foreground">staked</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-foreground">
            {goal.progress} / {goal.target} {goal.unit}
          </span>
          <span className="text-sm text-muted-foreground">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="bg-primary h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Reward Info */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
        <p className="text-xs text-muted-foreground mb-1">Potential Reward</p>
        <p className="text-lg font-bold text-accent-foreground">${goal.reward}</p>
      </div>

      {/* Status Badge */}
      <div className="flex gap-2">
        {goal.status === "active" ? (
          <>
            <button className="flex-1 btn-primary text-sm">Update Progress</button>
            <button className="flex-1 btn-outline text-sm">Withdraw</button>
          </>
        ) : (
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">
            Claimed ✓
          </button>
        )}
      </div>
    </div>
  )
}
