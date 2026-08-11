export default function AppHeader({ title, subtitle, trailing, leading }) {
  return (
    <header className="app-header">
      <div className="app-header-side">{leading}</div>
      <div className="app-header-copy">
        <strong>{title}</strong>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
      <div className="app-header-side app-header-trailing">{trailing}</div>
    </header>
  )
}
