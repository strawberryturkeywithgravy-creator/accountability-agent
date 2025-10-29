"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import Navigation from "@/components/navigation"
import Dashboard from "@/components/dashboard"
import GoalCreation from "@/components/goal-creation"
import Leaderboard from "@/components/leaderboard"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("landing")

  if (currentPage === "landing") {
    return <LandingPage setCurrentPage={setCurrentPage} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="pt-20">
        {currentPage === "dashboard" && <Dashboard setCurrentPage={setCurrentPage} />}
        {currentPage === "create" && <GoalCreation setCurrentPage={setCurrentPage} />}
        {currentPage === "leaderboard" && <Leaderboard />}
      </main>
    </div>
  )
}
