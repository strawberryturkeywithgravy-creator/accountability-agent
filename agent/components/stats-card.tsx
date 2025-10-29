interface StatsCardProps {
    label: string
    value: string | number
    icon: string
  }
  
  export default function StatsCard({ label, value, icon }: StatsCardProps) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>
          <span className="text-4xl">{icon}</span>
        </div>
      </div>
    )
  }
  