import { Maximize2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function DailyVisualCard({ workout }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      triggerRef.current?.focus()
    }
  }, [isOpen])

  return (
    <section className="daily-visual" aria-label={`بطاقة تمارين ${workout.label}`}>
      <button
        ref={triggerRef}
        className="daily-visual-trigger"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`تكبير بطاقة تمارين ${workout.label}`}
      >
        <img
          key={workout.key}
          src={workout.cardImage}
          alt={`بطاقة سـيّلين المصوّرة ليوم ${workout.label}: ${workout.title}`}
          loading="eager"
          decoding="async"
        />
        <span className="daily-visual-expand" aria-hidden="true"><Maximize2 /></span>
      </button>
      <div className="daily-visual-caption">
        <div>
          <span>بطاقة اليوم</span>
          <strong>{workout.label}</strong>
        </div>
        <small>المسي البطاقة لعرضها كاملة</small>
      </div>

      {isOpen && (
        <div
          className="visual-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`بطاقة تمارين ${workout.label} بالحجم الكامل`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false)
          }}
        >
          <button ref={closeRef} className="visual-modal-close" type="button" onClick={() => setIsOpen(false)} aria-label="إغلاق البطاقة">
            <X aria-hidden="true" />
          </button>
          <img src={workout.cardImage} alt={`بطاقة تمارين ${workout.label} بالحجم الكامل`} />
        </div>
      )}
    </section>
  )
}
