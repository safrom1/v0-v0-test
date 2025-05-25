"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Agent {
  id: string
  name: string
  percentage: number
}

const initialAgents: Agent[] = [
  { id: "1", name: "Sarah Johnson", percentage: 85 },
  { id: "2", name: "Mike Chen", percentage: 72 },
  { id: "3", name: "Emily Rodriguez", percentage: 94 },
  { id: "4", name: "David Kim", percentage: 68 },
  { id: "5", name: "Lisa Thompson", percentage: 91 },
  { id: "6", name: "James Wilson", percentage: 76 },
  { id: "7", name: "Maria Garcia", percentage: 88 },
  { id: "8", name: "Robert Brown", percentage: 63 },
]

function getPerformanceColor(percentage: number): string {
  if (percentage >= 90) return "bg-green-500"
  if (percentage >= 75) return "bg-blue-500"
  if (percentage >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

function getPerformanceLabel(percentage: number): {
  label: string
  variant: "default" | "secondary" | "destructive" | "outline"
} {
  if (percentage >= 90) return { label: "Excellent", variant: "default" }
  if (percentage >= 75) return { label: "Good", variant: "secondary" }
  if (percentage >= 60) return { label: "Average", variant: "outline" }
  return { label: "Needs Improvement", variant: "destructive" }
}

export default function PerformanceDashboard() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)

  const updateAgentPercentage = (id: string, newPercentage: string) => {
    const percentage = Math.max(0, Math.min(100, Number.parseInt(newPercentage) || 0))
    setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, percentage } : agent)))
  }

  const averagePerformance = Math.round(agents.reduce((sum, agent) => sum + agent.percentage, 0) / agents.length)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
          <p className="text-gray-600">Monitor and track agent performance metrics</p>
        </div>

        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Team Overview</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                Avg: {averagePerformance}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green-600">{agents.filter((a) => a.percentage >= 90).length}</p>
                <p className="text-sm text-gray-600">Excellent</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">
                  {agents.filter((a) => a.percentage >= 75 && a.percentage < 90).length}
                </p>
                <p className="text-sm text-gray-600">Good</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-yellow-600">
                  {agents.filter((a) => a.percentage >= 60 && a.percentage < 75).length}
                </p>
                <p className="text-sm text-gray-600">Average</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-red-600">{agents.filter((a) => a.percentage < 60).length}</p>
                <p className="text-sm text-gray-600">Needs Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agents Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {agents.map((agent) => {
                const performanceLabel = getPerformanceLabel(agent.percentage)
                return (
                  <div key={agent.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900 min-w-[150px]">{agent.name}</h3>
                        <Badge variant={performanceLabel.variant}>{performanceLabel.label}</Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={agent.percentage}
                          onChange={(e) => updateAgentPercentage(agent.id, e.target.value)}
                          className="w-20 text-center"
                        />
                        <span className="text-sm text-gray-600 min-w-[30px]">%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <Progress value={agent.percentage} className="h-3" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 min-w-[40px]">{agent.percentage}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">90-100% Excellent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">75-89% Good</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">60-74% Average</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">0-59% Needs Improvement</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
