import { Check, CircleDot, Dumbbell, Footprints, HeartPulse, Sparkles, Target, Timer, Zap } from 'lucide-react'

const ICONS = {
  dumbbell: Dumbbell,
  target: Target,
  spark: Sparkles,
  arm: Zap,
  timer: Timer,
  steps: Footprints,
  heart: HeartPulse,
}

export default function ExerciseList({ exercises, completedIds, onToggle }) {
  return (
    <div className="exercise-list">
      {exercises.map((exercise, index) => {
        const Icon = ICONS[exercise.icon] || CircleDot
        const completed = completedIds.includes(exercise.id)

        return (
          <article className={`exercise-row ${completed ? 'exercise-complete' : ''}`} key={exercise.id}>
            <div className="exercise-icon" aria-hidden="true">
              <Icon />
            </div>
            <div className="exercise-copy">
              <span className="exercise-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{exercise.name}</h3>
              <div className="exercise-meta">
                <span>{exercise.details}</span>
                <span>{exercise.rest}</span>
              </div>
            </div>
            <button
              className="check-button"
              type="button"
              aria-label={completed ? `إلغاء إكمال ${exercise.name}` : `تحديد ${exercise.name} كمكتمل`}
              aria-pressed={completed}
              onClick={() => onToggle(exercise.id)}
            >
              {completed && <Check aria-hidden="true" />}
            </button>
          </article>
        )
      })}
    </div>
  )
}
