import { useRef } from 'react'
import AppHeader from './AppHeader'
import WorkoutView from './WorkoutView'
import SignatureMark from './SignatureMark'
import WeekStrip from './WeekStrip'
import { formatArabicDate } from '../utils/date'

export default function ScheduleScreen({
  days,
  weekDates,
  selectedWorkout,
  selectedDate,
  selectedKey,
  todayKey,
  completedIds,
  weeklyProgress,
  onSelectDay,
  onToggleExercise,
  onCompleteDay,
  onResetDay,
}) {
  const touchStart = useRef(null)

  const onTouchStart = (event) => {
    const touch = event.changedTouches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (event) => {
    if (!touchStart.current) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - touchStart.current.x
    const dy = touch.clientY - touchStart.current.y
    touchStart.current = null
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.6) return

    const index = days.findIndex((day) => day.key === selectedKey)
    // RTL: swipe right -> previous day in reading order, swipe left -> next day
    const next = dx > 0 ? index - 1 : index + 1
    if (next >= 0 && next < days.length) onSelectDay(days[next].key)
  }

  return (
    <section
      className="tab-screen schedule-tab"
      aria-label="جدول التمارين الأسبوعي"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AppHeader
        title="الجدول الأسبوعي"
        subtitle={formatArabicDate(selectedDate)}
      />

      <WeekStrip
        days={days}
        dates={weekDates}
        selectedKey={selectedKey}
        todayKey={todayKey}
        onSelect={onSelectDay}
      />

      <div key={selectedKey} className="day-swap">
        <WorkoutView
          workout={selectedWorkout}
          completedIds={completedIds}
          weeklyProgress={weeklyProgress}
          onToggleExercise={onToggleExercise}
          onCompleteDay={onCompleteDay}
          onResetDay={onResetDay}
        />
      </div>

      <p className="safety-note">اختاري أوزانًا تناسب مستواك، وأوقفي التمرين عند الشعور بألم غير طبيعي.</p>
      <SignatureMark placement="schedule-signature" />
    </section>
  )
}
