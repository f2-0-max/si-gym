import ProgressRing from './ProgressRing'
import AppHeader from './AppHeader'
import SignatureMark from './SignatureMark'
import seleenIdentity from '../../assets/seleen-fitness-identity.jpeg.asset.json'

export default function ProgressScreen({ stats }) {
  const { weeklyProgress, todayCompleted, todayTotal, totalCompleted, totalExercises, streak, days, progressByDay } = stats

  return (
    <section className="tab-screen progress-tab" aria-label="شاشة الإنجاز">
      <AppHeader title="إنجازي" subtitle="ملخص تقدّمك هذا الأسبوع" />

      <section className="progress-hero">
        <ProgressRing value={weeklyProgress} label="تقدم الأسبوع" />
        <div className="progress-hero-copy">
          <strong>{totalCompleted} من {totalExercises} تمرين</strong>
          <span>أنجزتِ {weeklyProgress}% من جدول الأسبوع</span>
        </div>
      </section>

      <div className="stat-grid">
        <article className="stat-card">
          <span>تمارين اليوم</span>
          <strong>{todayTotal === 0 ? 'راحة' : `${todayCompleted}/${todayTotal}`}</strong>
        </article>
        <article className="stat-card">
          <span>أيام متتالية</span>
          <strong>{streak}</strong>
        </article>
      </div>

      <section className="week-breakdown" aria-label="تفصيل أيام الأسبوع">
        {days.map((day) => {
          const total = day.exercises.length
          const done = (progressByDay[day.key] || []).length
          const pct = total === 0 ? 100 : Math.round((done / total) * 100)

          return (
            <div className="breakdown-row" key={day.key}>
              <span className="breakdown-day">{day.label}</span>
              <div className="breakdown-bar" role="img" aria-label={`${day.label}: ${pct}%`}>
                <i style={{ width: `${pct}%` }} />
              </div>
              <b>{total === 0 ? '—' : `${done}/${total}`}</b>
            </div>
          )
        })}
      </section>

      <div className="progress-art" aria-hidden="true">
        <img src={seleenIdentity.url} alt="" loading="lazy" decoding="async" />
      </div>

      <SignatureMark placement="schedule-signature" />
    </section>
  )
}
