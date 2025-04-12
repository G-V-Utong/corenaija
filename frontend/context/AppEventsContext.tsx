import { createContext, useContext, useCallback, useState } from 'react'

// Event types
export const USER_SIGNED_IN = 'USER_SIGNED_IN'
export const USER_SIGNED_UP = 'USER_SIGNED_UP'
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

type EventType = typeof USER_SIGNED_IN | typeof USER_SIGNED_UP | typeof USER_SIGNED_OUT

type EventCallback = () => void

interface AppEventsContextType {
  subscribe: (event: EventType, callback: EventCallback) => () => void
  emit: (event: EventType) => void
}

const AppEventsContext = createContext<AppEventsContextType | undefined>(undefined)

export function AppEventsProvider({ children }: { children: React.ReactNode }) {
  const [subscribers, setSubscribers] = useState<Record<EventType, EventCallback[]>>({
    [USER_SIGNED_IN]: [],
    [USER_SIGNED_UP]: [],
    [USER_SIGNED_OUT]: [],
  })

  const subscribe = useCallback((event: EventType, callback: EventCallback) => {
    setSubscribers(prev => ({
      ...prev,
      [event]: [...prev[event], callback],
    }))

    return () => {
      setSubscribers(prev => ({
        ...prev,
        [event]: prev[event].filter(cb => cb !== callback),
      }))
    }
  }, [])

  const emit = useCallback((event: EventType) => {
    subscribers[event].forEach(callback => callback())
  }, [subscribers])

  return (
    <AppEventsContext.Provider value={{ subscribe, emit }}>
      {children}
    </AppEventsContext.Provider>
  )
}

export function useAppEvents() {
  const context = useContext(AppEventsContext)
  if (!context) {
    throw new Error('useAppEvents must be used within an AppEventsProvider')
  }
  return context
} 