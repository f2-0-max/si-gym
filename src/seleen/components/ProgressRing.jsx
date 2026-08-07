export default function ProgressRing({ value, label = 'إنجاز اليوم' }) {
  const safeValue = Math.min(100, Math.max(0, value))

  return (
    <div className="progress-ring" style={{ '--progress': `${safeValue * 3.6}deg` }} role="img" aria-label={`${label}: ${safeValue}%`}>
      <div className="progress-ring-inner">
        <strong>{safeValue}%</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}
