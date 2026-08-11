import { Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import seleenIdentity from '../../assets/seleen-fitness-identity.jpeg.asset.json'
import AppHeader from './AppHeader'
import WorkoutView from './WorkoutView'
import SignatureMark from './SignatureMark'
import { formatArabicDate, formatRiyadhTime, getRiyadhCalendarDate } from '../utils/date'

export default function TodayScreen({
  now,
  workout,
  completedIds,
  weeklyProgress,
  onToggleExercise,
  onCompleteDay,
  onResetDay,
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const date = getRiyadhCalendarDate(now)
  const clock = mounted ? formatRiyadhTime(now) : ''

  return (
    <section className="tab-screen today-tab" aria-label="شاشة اليوم">
      <AppHeader
        title="سـيّلين"
        subtitle={formatArabicDate(date)}
        trailing={
          <span className="live-time" aria-label={mounted ? `الوقت الآن ${clock}` : 'الوقت الآن'}>
            <Clock3 aria-hidden="true" />
            <span>{clock}</span>
          </span>
        }
      />

      <div className="today-hero">
        <div className="today-hero-art" aria-hidden="true">
          <img src={seleenIdentity.url} alt="" decoding="async" />
        </div>
        <div className="today-hero-copy">
          <span className="today-hero-label">تمارين اليوم</span>
          <h1>{workout.title}</h1>
          <p>{workout.muscles}</p>
        </div>
      </div>

      <WorkoutView
        workout={workout}
        completedIds={completedIds}
        weeklyProgress={weeklyProgress}
        onToggleExercise={onToggleExercise}
        onCompleteDay={onCompleteDay}
        onResetDay={onResetDay}
      />

      <p className="safety-note">اختاري أوزانًا تناسب مستواك، وأوقفي التمرين عند الشعور بألم غير طبيعي.</p>
      <SignatureMark placement="schedule-signature" />
    </section>
  )
}
