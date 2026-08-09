import signature from '../../assets/falkaldi-signature.webp.asset.json'

export default function SignatureMark({ placement = '' }) {
  return (
    <img
      className={`signature-mark ${placement}`.trim()}
      src={signature.url}
      alt="توقيع Faris Alkaldi"
      loading="lazy"
      decoding="async"
    />
  )
}
