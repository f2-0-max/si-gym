export default function SignatureMark({ placement = '' }) {
  return (
    <img
      className={`signature-mark ${placement}`.trim()}
      src="/assets/falkaldi-signature.webp"
      alt="توقيع F ALKALDI"
      loading="lazy"
      decoding="async"
    />
  )
}
