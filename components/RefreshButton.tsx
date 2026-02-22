'use client'

import { useState } from 'react'

interface RefreshButtonProps {
  onRefresh: () => Promise<void>
}

export default function RefreshButton({ onRefresh }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div style={{
      position: 'fixed' as const,
      bottom: '30px',
      right: '30px',
      zIndex: 1000
    }}>
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: isRefreshing 
            ? 'linear-gradient(135deg, #94a3b8, #64748b)' 
            : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: isRefreshing ? 'not-allowed' : 'pointer',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          if (!isRefreshing) {
            e.currentTarget.style.transform = 'scale(1.1)'
            e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1e40af)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.background = isRefreshing 
            ? 'linear-gradient(135deg, #94a3b8, #64748b)' 
            : 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
        }}
      >
        <span style={{ 
          animation: isRefreshing ? 'spin 1s linear infinite' : 'none'
        }}>
          {isRefreshing ? '⟳' : '🔄'}
        </span>
      </button>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}