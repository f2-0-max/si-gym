import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EntryScreen from './components/EntryScreen'
import ScheduleScreen from './components/ScheduleScreen'
import TodayScreen from './components/TodayScreen'
import ProgressScreen from './components/ProgressScreen'
import BottomNav from './components/BottomNav'
import { WEEK_DAYS, WORKOUTS_BY_KEY } from './data/workouts'
import { getCurrentWeek, getTodayWorkout } from './utils/date'

const STORAGE_KEY = 'seleen-fitness-progress-v1'

function readProgress() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export default function App() {
  const [now, setNow] = useState(() => new Date())
  const [screen, setScreen] = useState('entry')
  const [tab, setTab] = useState('today')
  const [isLeaving, setIsLeaving] = useState(false)
  const [progressByDay, setProgressByDay] = useState({})
  const scrollRef = useRef(null)

  useEffect(() => {
    setProgressByDay(readProgress())
  }, [])

  const todayWorkout = useMemo(() => getTodayWorkout(now), [now])
  const [selectedKey, setSelectedKey] = useState(todayWorkout.key)
  const weekDates = useMemo(() => getCurrentWeek(now), [now])
  const selectedWorkout = WORKOUTS_BY_KEY[selectedKey]
  const selectedIndex = WEEK_DAYS.findIndex((day) => day.key === selectedKey)
  const selectedDate = weekDates[selectedIndex]
  const activeKey = tab === 'today' ? todayWorkout.key : selectedKey
  const activeWorkout = tab === 'today' ? todayWorkout : selectedWorkout
  const completedIds = progressByDay[activeKey] || []

  const weekTotals = useMemo(() => {
    const exerciseDays = WEEK_DAYS.filter((day) => day.exercises.length > 0)
    const totalExercises = exerciseDays.reduce((sum, day) => sum + day.exercises.length, 0)
    const totalCompleted = exerciseDays.reduce(
      (sum, day) => sum + (progressByDay[day.key] || []).filter((id) => day.exercises.some((e) => e.id === id)).length,
      0,
    )
    return {
      totalExercises,
      totalCompleted,
      weeklyProgress: totalExercises === 0 ? 0 : Math.round((totalCompleted / totalExercises) * 100),
    }
  }, [progressByDay])

  const streak = useMemo(() => {
    const todayIndex = WEEK_DAYS.findIndex((day) => day.key === todayWorkout.key)
    let count = 0
    for (let i = todayIndex; i >= 0; i -= 1) {
      const day = WEEK_DAYS[i]
      const total = day.exercises.length
      const done = (progressByDay[day.key] || []).length
      if (total === 0) continue
      if (done >= total && total > 0) count += 1
      else break
    }
    return count
  }, [progressByDay, todayWorkout.key])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progressByDay))
  }, [progressByDay])

  const enterSchedule = () => {
    setSelectedKey(todayWorkout.key)
    setTab('today')
    setIsLeaving(true)
    window.setTimeout(() => {
      setScreen('app')
      setIsLeaving(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 280)
  }

  const changeTab = useCallback((next) => {
    setTab(next)
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const toggleExercise = (exerciseId) => {
    setProgressByDay((current) => {
      const dayProgress = current[activeKey] || []
      const nextProgress = dayProgress.includes(exerciseId)
        ? dayProgress.filter((id) => id !== exerciseId)
        : [...dayProgress, exerciseId]

      return { ...current, [activeKey]: nextProgress }
    })
  }

  const completeDay = () => {
    setProgressByDay((current) => ({
      ...current,
      [activeKey]: activeWorkout.exercises.map((exercise) => exercise.id),
    }))
  }

  const resetDay = () => {
    setProgressByDay((current) => ({ ...current, [activeKey]: [] }))
  }

  if (screen === 'entry') {
    return (
      <div className="app-frame">
        <EntryScreen now={now} workout={todayWorkout} onEnter={enterSchedule} isLeaving={isLeaving} />
      </div>
    )
  }

  return (
    <div className="app-frame app-frame-shell">
      <div className="app-scroll" ref={scrollRef}>
        <div key={tab} className="tab-transition">
          {tab === 'today' && (
            <TodayScreen
              now={now}
              workout={todayWorkout}
              completedIds={completedIds}
              weeklyProgress={weekTotals.weeklyProgress}
              onToggleExercise={toggleExercise}
              onCompleteDay={completeDay}
              onResetDay={resetDay}
            />
          )}

          {tab === 'schedule' && (
            <ScheduleScreen
              days={WEEK_DAYS}
              weekDates={weekDates}
              selectedWorkout={selectedWorkout}
              selectedDate={selectedDate}
              selectedKey={selectedKey}
              todayKey={todayWorkout.key}
              completedIds={completedIds}
              weeklyProgress={weekTotals.weeklyProgress}
              onSelectDay={setSelectedKey}
              onToggleExercise={toggleExercise}
              onCompleteDay={completeDay}
              onResetDay={resetDay}
            />
          )}

          {tab === 'progress' && (
            <ProgressScreen
              stats={{
                weeklyProgress: weekTotals.weeklyProgress,
                totalCompleted: weekTotals.totalCompleted,
                totalExercises: weekTotals.totalExercises,
                todayCompleted: (progressByDay[todayWorkout.key] || []).length,
                todayTotal: todayWorkout.exercises.length,
                streak,
                days: WEEK_DAYS,
                progressByDay,
              }}
            />
          )}
        </div>
      </div>

      <BottomNav active={tab} onChange={changeTab} />
    </div>
  )
}
