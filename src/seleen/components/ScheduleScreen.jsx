import { ArrowRight, CalendarDays, Check, Dumbbell, RotateCcw } from 'lucide-react'
import ExerciseList from './ExerciseList'
import DailyVisualCard from './DailyVisualCard'
import ProgressRing from './ProgressRing'
import SignatureMark from './SignatureMark'
import TrainingMotion from './TrainingMotion'
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
  onBack,
  onToday,
}) {
  const total = selectedWorkout.exercises.length
  const completed = completedIds.length
  const progress = total === 0 ? 100 : Math.round((completed / total) * 100)
  const allComplete = total > 0 && completed === total

  return (
    <section className="schedule-screen screen-shell screen-entering" aria-label="جدول التمارين الأسبوعي">
      <header className="schedule-header">
        <button className="icon-button" type="button" onClick={onBack} aria-label="العودة إلى بوابة الدخول">
          <ArrowRight aria-hidden="true" />
        </button>
        <time className="schedule-current-date" dateTime={selectedDate.toISOString().slice(0, 10)}>{formatArabicDate(selectedDate)}</time>
        <div className="header-balance" aria-hidden="true" />
      </header>

      <TrainingMotion />

      <WeekStrip
        days={days}
        dates={weekDates}
        selectedKey={selectedKey}
        todayKey={todayKey}
        onSelect={onSelectDay}
      />

      <DailyVisualCard workout={selectedWorkout} />

      <section className="progress-panel" aria-label="ملخص الإنجاز">
        <ProgressRing value={progress} />
        <div className="progress-copy">
          <span>إنجاز اليوم</span>
          <strong>{total === 0 ? 'راحة مستحقة' : `تم إكمال ${completed} من ${total} تمارين`}</strong>
          <div className="week-progress-line">
            <span>تقدم الأسبوع</span>
            <b>{weeklyProgress}%</b>
          </div>
        </div>
      </section>

      <main className="daily-workout">
        <div className="workout-title-block">
          <span className="workout-symbol" aria-hidden="true"><Dumbbell /></span>
          <h2>{selectedWorkout.title}</h2>
          <p>{selectedWorkout.muscles}</p>
          <p className="workout-description">{selectedWorkout.description}</p>
        </div>

        {total > 0 ? (
          <>
            <ExerciseList exercises={selectedWorkout.exercises} completedIds={completedIds} onToggle={onToggleExercise} />
            <div className="workout-actions">
              <button className={`primary-button complete-button ${allComplete ? 'button-complete' : ''}`} type="button" onClick={onCompleteDay}>
                <span>{allComplete ? 'تم إنجاز تمارين اليوم' : 'إكمال تمارين اليوم'}</span>
                <Check aria-hidden="true" />
              </button>
              {completed > 0 && (
                <button className="reset-button" type="button" onClick={onResetDay}>
                  <RotateCcw aria-hidden="true" />
                  إعادة تقدم اليوم
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="rest-state">
            <span aria-hidden="true">✦</span>
            <h3>اليوم للراحة</h3>
            <p>لا توجد تمارين مطلوبة. الراحة جزء أساسي من التقدّم.</p>
          </div>
        )}
      </main>

      <p className="safety-note">اختاري أوزانًا تناسب مستواك، وأوقفي التمرين عند الشعور بألم غير طبيعي.</p>
      <SignatureMark placement="schedule-signature" />

      <nav className="bottom-nav" aria-label="التنقل داخل الجدول">
        <button type="button" className={selectedKey === todayKey ? 'nav-active' : ''} onClick={onToday}>
          <Dumbbell aria-hidden="true" />
          <span>اليوم</span>
        </button>
        <button type="button" className={selectedKey !== todayKey ? 'nav-active' : ''} onClick={() => document.querySelector('.week-strip')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
          <CalendarDays aria-hidden="true" />
          <span>الأسبوع</span>
        </button>
      </nav>
    </section>
  )
}
