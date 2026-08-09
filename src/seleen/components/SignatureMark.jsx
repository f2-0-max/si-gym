import signature from '../../assets/faris-alkaldi-logo.png.asset.json'

export default function SignatureMark({ placement = '' }) {
  return (
    <img
      className={`signature-mark ${placement}`.trim()}
      src={signature.url}
      alt="شعار Faris Alkaldi"
      loading="lazy"
      decoding="async"
    />
  )
}
