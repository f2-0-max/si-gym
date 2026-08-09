import seleenIdentity from '../../assets/seleen-fitness-identity.jpeg.asset.json'
import dumbbellHands from '../../assets/seleen-dumbbell-hands.webp.asset.json'
import { CalendarDays, Clock3 } from 'lucide-react'
import SignatureMark from './SignatureMark'
import { formatArabicDate, formatRiyadhTime, getRiyadhCalendarDate } from '../utils/date'

export default function EntryScreen({ now, workout, onEnter, isLeaving }) {
  const date = getRiyadhCalendarDate(now)

  return (
    <section className={`entry-screen screen-shell ${isLeaving ? 'screen-leaving' : ''}`} aria-labelledby="entry-title">
      <header className="entry-header">
        <div>
          <p className="brand-name">سـيّلين</p>
          <p className="brand-subtitle">جدول تمارينك الأسبوعي</p>
        </div>
        <div className="live-time" aria-label={`الوقت الآن ${formatRiyadhTime(now)}`}>
          <Clock3 aria-hidden="true" />
          <span>{formatRiyadhTime(now)}</span>
        </div>
      </header>

      <div className="hero-identity" aria-hidden="true">
        <div className="hero-frame">
          <img src={seleenIdentity.url} alt="" fetchPriority="high" />
        </div>
      </div>

      <div className="today-block">
        <div className="date-line">
          <CalendarDays aria-hidden="true" />
          <time dateTime={date.toISOString().slice(0, 10)}>{formatArabicDate(date)}</time>
        </div>

        <div className="ornament-line" aria-hidden="true"><span /></div>
        <p className="today-label">تمارين اليوم</p>
        <h1 id="entry-title">{workout.title}</h1>
        <p className="today-muscles">{workout.muscles}</p>

        <div className="entry-action">
          <button className="entry-portal" type="button" onClick={onEnter} aria-label="دخول إلى جدولي">
            <span className="entry-portal-label">دخول إلى جدولي</span>
            <img
              className="entry-hands"
              src={dumbbellHands.url}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              decoding="async"
            />
          </button>
        </div>
      </div>

      <div className="entry-footer-mark" aria-hidden="true">
        <span />
        <span className="leaf">◆</span>
        <span />
      </div>
      <SignatureMark placement="entry-signature" />
    </section>
  )
}
