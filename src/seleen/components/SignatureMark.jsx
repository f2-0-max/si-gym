import signature from '../../assets/falkaldi-signature.webp.asset.json'

export default function SignatureMark({ placement = '' }) {
  return (
    <img
      className={`signature-mark ${placement}`.trim()}
      src={signature.url}
      alt="توقيع F ALKALDI"
      loading="lazy"
      decoding="async"
    />
  )
}
