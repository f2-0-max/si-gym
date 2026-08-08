import { useEffect, useMemo, useState } from 'react'
import EntryScreen from './components/EntryScreen'
import ScheduleScreen from './components/ScheduleScreen'
import { WEEK_DAYS, WORKOUTS_BY_KEY } from './data/workouts'
import { getCurrentWeek, getTodayWorkout } from './utils/date'

const STORAGE_KEY = 'seleen-fitness-progress-v1'

function readProgress() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export default function App() {
  const [now, setNow] = useState(() => new Date())
  const [screen, setScreen] = useState('entry')
  const [isLeaving, setIsLeaving] = useState(false)
  const [progressByDay, setProgressByDay] = useState(readProgress)

  const todayWorkout = useMemo(() => getTodayWorkout(now), [now])
  const [selectedKey, setSelectedKey] = useState(todayWorkout.key)
  const weekDates = useMemo(() => getCurrentWeek(now), [now])
  const selectedWorkout = WORKOUTS_BY_KEY[selectedKey]
  const selectedIndex = WEEK_DAYS.findIndex((day) => day.key === selectedKey)
  const selectedDate = weekDates[selectedIndex]
  const completedIds = progressByDay[selectedKey] || []

  const weeklyProgress = useMemo(() => {
    const exerciseDays = WEEK_DAYS.filter((day) => day.exercises.length > 0)
    const totalExercises = exerciseDays.reduce((sum, day) => sum + day.exercises.length, 0)
    const completedExercises = exerciseDays.reduce((sum, day) => sum + (progressByDay[day.key] || []).length, 0)
    return totalExercises === 0 ? 0 : Math.round((completedExercises / totalExercises) * 100)
  }, [progressByDay])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progressByDay))
  }, [progressByDay])

  const enterSchedule = () => {
    setSelectedKey(todayWorkout.key)
    setIsLeaving(true)
    window.setTimeout(() => {
      setScreen('schedule')
      setIsLeaving(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 320)
  }

  const toggleExercise = (exerciseId) => {
    setProgressByDay((current) => {
      const dayProgress = current[selectedKey] || []
      const nextProgress = dayProgress.includes(exerciseId)
        ? dayProgress.filter((id) => id !== exerciseId)
        : [...dayProgress, exerciseId]

      return { ...current, [selectedKey]: nextProgress }
    })
  }

  const completeDay = () => {
    setProgressByDay((current) => ({
      ...current,
      [selectedKey]: selectedWorkout.exercises.map((exercise) => exercise.id),
    }))
  }

  const resetDay = () => {
    setProgressByDay((current) => ({ ...current, [selectedKey]: [] }))
  }

  return (
    <div className="app-frame">
      {screen === 'entry' ? (
        <EntryScreen now={now} workout={todayWorkout} onEnter={enterSchedule} isLeaving={isLeaving} />
      ) : (
        <ScheduleScreen
          days={WEEK_DAYS}
          weekDates={weekDates}
          selectedWorkout={selectedWorkout}
          selectedDate={selectedDate}
          selectedKey={selectedKey}
          todayKey={todayWorkout.key}
          completedIds={completedIds}
          weeklyProgress={weeklyProgress}
          onSelectDay={setSelectedKey}
          onToggleExercise={toggleExercise}
          onCompleteDay={completeDay}
          onResetDay={resetDay}
          onBack={() => setScreen('entry')}
          onToday={() => setSelectedKey(todayWorkout.key)}
        />
      )}
    </div>
  )
}
