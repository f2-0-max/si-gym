import signature from '../../assets/faris-alkaldi-emblem.png.asset.json'

export default function SignatureMark({ placement = '' }) {
  return (
    <footer className={`signature-footer ${placement}`.trim()}>
      <img
        className="signature-mark"
        src={signature.url}
        alt="شعار Faris Alkaldi"
        loading="lazy"
        decoding="async"
      />
      <small>© {new Date().getFullYear()} Faris Alkaldi — جميع الحقوق محفوظة</small>
    </footer>
  )
}
