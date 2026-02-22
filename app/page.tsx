'use client'

import { useState } from 'react'
import RefreshButton from '../components/RefreshButton'

// Stefan's Real Task Data (from SQLite/Cron integration)
const initialFallbackData = {
  todayTasks: [
    { 
      time: '17:00', 
      type: 'abfall', 
      location: 'pellendorf', 
      title: '🗑️ Restmüll rausstellen',
      description: 'Pellendorf - Restmüll Termin heute',
      priority: 'high',
      status: 'pending',
      id: 1
    }
  ],
  
  tomorrowTasks: [
    {
      time: '17:00',
      type: 'abfall', 
      location: 'maishofen',
      title: '🗑️ Restmüll rausstellen',
      description: 'Maishofen - Restmüll Termin morgen',
      priority: 'high', 
      status: 'pending',
      id: 2
    }
  ],

  upcomingTasks: [
    {
      date: '2026-02-24',
      time: '17:00',
      type: 'abfall',
      location: 'pellendorf', 
      title: '🗑️ Restmüll',
      description: '24. Februar - Pellendorf',
      priority: 'normal',
      status: 'pending',
      id: 3
    },
    {
      date: '2026-03-09',
      time: '17:00', 
      type: 'abfall',
      location: 'maishofen',
      title: '🗑️ Restmüll', 
      description: '10. März - Maishofen',
      priority: 'normal',
      status: 'pending',
      id: 4
    }
  ],

  summary: {
    totalPending: 4,
    todayCount: 1,
    tomorrowCount: 1,
    upcomingCount: 2,
    locations: ['pellendorf', 'maishofen']
  }
}

export default function TasksPage() {
  const [data, setData] = useState(initialFallbackData)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const handleRefresh = async () => {
    // Simulate data fetch delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In production: fetch from SQLite + update from cron
    setLastRefresh(new Date())
  }

  const handleTaskComplete = (taskId: number, taskList: string) => {
    setData(prevData => {
      const newData = { ...prevData }
      
      if (taskList === 'today') {
        newData.todayTasks = newData.todayTasks.map(task => 
          task.id === taskId ? { ...task, status: 'completed' } : task
        )
      } else if (taskList === 'tomorrow') {
        newData.tomorrowTasks = newData.tomorrowTasks.map(task =>
          task.id === taskId ? { ...task, status: 'completed' } : task  
        )
      }
      
      return newData
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'normal': return '#3b82f6'  
      case 'low': return '#22c55e'
      default: return '#6b7280'
    }
  }

  const getLocationIcon = (location: string) => {
    return location === 'pellendorf' ? '🏠' : '🏔️'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: '120px' // Space for refresh button
    }}>
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '2rem'
        }}>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>
            📋 Stefan's Aufgaben Dashboard
          </h1>
          <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
            v2.0 • Pellendorf + Maishofen • Abfall-Management • Manual + Auto-Refresh
          </p>
          <p style={{ margin: '1rem 0 0 0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem' }}>
            Letzte Aktualisierung: {lastRefresh.toLocaleString('de-DE')}
          </p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          
          {/* Today Tasks */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#ef4444', fontSize: '1.2rem' }}>
              🚨 Heute
            </h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {data.todayTasks.filter(t => t.status === 'pending').length}
            </div>
            <div style={{ fontSize: '1rem', color: '#94a3b8' }}>
              Aufgaben heute
            </div>
          </div>

          {/* Tomorrow Tasks */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px', 
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#f59e0b', fontSize: '1.2rem' }}>
              ⏰ Morgen  
            </h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {data.tomorrowTasks.filter(t => t.status === 'pending').length}
            </div>
            <div style={{ fontSize: '1rem', color: '#94a3b8' }}>
              Aufgaben morgen
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#3b82f6', fontSize: '1.2rem' }}>
              📅 Kommend
            </h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {data.upcomingTasks.filter(t => t.status === 'pending').length}
            </div>
            <div style={{ fontSize: '1rem', color: '#94a3b8' }}>
              Weitere Aufgaben
            </div>
          </div>

          {/* Locations */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#22c55e', fontSize: '1.2rem' }}>
              📍 Standorte
            </h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              🏠 Pellendorf<br/>🏔️ Maishofen
            </div>
            <div style={{ fontSize: '1rem', color: '#94a3b8' }}>
              Multi-Location
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        {data.todayTasks.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#ef4444', fontSize: '1.3rem' }}>
              🚨 Heute - {new Date().toLocaleDateString('de-DE')}
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {data.todayTasks.map((task, index) => (
                <div key={index} style={{
                  background: task.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '1rem',
                  border: `1px solid ${getPriorityColor(task.priority)}30`,
                  opacity: task.status === 'completed' ? 0.6 : 1
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span>{getLocationIcon(task.location)}</span>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{task.title}</span>
                        <span style={{ 
                          background: getPriorityColor(task.priority),
                          color: 'white',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem'
                        }}>
                          {task.priority}
                        </span>
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                        {task.time} • {task.location}
                      </div>
                      <div style={{ color: '#e2e8f0' }}>
                        {task.description}
                      </div>
                    </div>
                    <button
                      onClick={() => handleTaskComplete(task.id, 'today')}
                      disabled={task.status === 'completed'}
                      style={{
                        background: task.status === 'completed' ? '#22c55e' : 'transparent',
                        border: `2px solid ${task.status === 'completed' ? '#22c55e' : '#94a3b8'}`,
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        color: task.status === 'completed' ? 'white' : '#94a3b8',
                        cursor: task.status === 'completed' ? 'default' : 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {task.status === 'completed' ? '✓' : '○'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tomorrow's Tasks */}
        {data.tomorrowTasks.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px', 
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#f59e0b', fontSize: '1.3rem' }}>
              ⏰ Morgen - {new Date(Date.now() + 86400000).toLocaleDateString('de-DE')}
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {data.tomorrowTasks.map((task, index) => (
                <div key={index} style={{
                  background: task.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '1rem', 
                  border: `1px solid ${getPriorityColor(task.priority)}30`,
                  opacity: task.status === 'completed' ? 0.6 : 1
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span>{getLocationIcon(task.location)}</span>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{task.title}</span>
                        <span style={{
                          background: getPriorityColor(task.priority),
                          color: 'white',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '8px', 
                          fontSize: '0.8rem'
                        }}>
                          {task.priority}
                        </span>
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                        {task.time} • {task.location}
                      </div>
                      <div style={{ color: '#e2e8f0' }}>
                        {task.description}
                      </div>
                    </div>
                    <button
                      onClick={() => handleTaskComplete(task.id, 'tomorrow')}
                      disabled={task.status === 'completed'}
                      style={{
                        background: task.status === 'completed' ? '#22c55e' : 'transparent',
                        border: `2px solid ${task.status === 'completed' ? '#22c55e' : '#94a3b8'}`,
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        color: task.status === 'completed' ? 'white' : '#94a3b8',
                        cursor: task.status === 'completed' ? 'default' : 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {task.status === 'completed' ? '✓' : '○'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Tasks */}
        {data.upcomingTasks.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#3b82f6', fontSize: '1.3rem' }}>
              📅 Kommende Aufgaben
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {data.upcomingTasks.map((task, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '1rem',
                  border: `1px solid ${getPriorityColor(task.priority)}30`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span>{getLocationIcon(task.location)}</span>
                    <span style={{ fontWeight: 'bold' }}>{task.title}</span>
                    <span style={{
                      background: getPriorityColor(task.priority),
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem'
                    }}>
                      {task.priority}
                    </span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                    {new Date(task.date).toLocaleDateString('de-DE')} • {task.time} • {task.location}
                  </div>
                  <div style={{ color: '#e2e8f0' }}>
                    {task.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Fixed Refresh Button */}
      <RefreshButton onRefresh={handleRefresh} />
    </div>
  )
}