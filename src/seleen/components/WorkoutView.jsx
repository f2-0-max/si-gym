import { Check, Dumbbell, RotateCcw } from 'lucide-react'
import ExerciseList from './ExerciseList'
import DailyVisualCard from './DailyVisualCard'
import ProgressRing from './ProgressRing'

export default function WorkoutView({
  workout,
  completedIds,
  weeklyProgress,
  onToggleExercise,
  onCompleteDay,
  onResetDay,
}) {
  const total = workout.exercises.length
  const completed = completedIds.length
  const progress = total === 0 ? 100 : Math.round((completed / total) * 100)
  const allComplete = total > 0 && completed === total

  return (
    <div className="workout-view">
      <DailyVisualCard workout={workout} />

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
          <h2>{workout.title}</h2>
          <p>{workout.muscles}</p>
          <p className="workout-description">{workout.description}</p>
        </div>

        {total > 0 ? (
          <>
            <ExerciseList exercises={workout.exercises} completedIds={completedIds} onToggle={onToggleExercise} />
            <div className="workout-actions">
              <button
                className={`primary-button complete-button ${allComplete ? 'button-complete' : ''}`}
                type="button"
                onClick={onCompleteDay}
              >
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
    </div>
  )
}
