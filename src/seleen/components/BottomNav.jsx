import { CalendarDays, Flame, Home } from 'lucide-react'

const TABS = [
  { key: 'today', label: 'اليوم', Icon: Home },
  { key: 'schedule', label: 'الجدول', Icon: CalendarDays },
  { key: 'progress', label: 'إنجازي', Icon: Flame },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="التنقل داخل التطبيق">
      {TABS.map(({ key, label, Icon }) => (
        <button
          key={key}
          type="button"
          className={active === key ? 'nav-active' : ''}
          aria-current={active === key ? 'page' : undefined}
          onClick={() => onChange(key)}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
