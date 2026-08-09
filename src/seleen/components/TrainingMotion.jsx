import trainingVideo from '../../assets/seleen-training.mp4.asset.json'
import trainingPoster from '../../assets/seleen-training-poster.webp.asset.json'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function TrainingMotion() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncMotionPreference = () => {
      const video = videoRef.current
      if (!video) return

      if (motionPreference.matches) {
        video.pause()
        setIsPlaying(false)
        return
      }

      video.play().catch(() => setIsPlaying(false))
    }

    syncMotionPreference()
    motionPreference.addEventListener?.('change', syncMotionPreference)
    return () => motionPreference.removeEventListener?.('change', syncMotionPreference)
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }

  return (
    <section className="training-motion" aria-label="أنمي سيلين أثناء التمرين">
      <div className="training-motion-backdrop" aria-hidden="true" />
      <video
        ref={videoRef}
        className="training-motion-video"
        src={trainingVideo.url}
        poster={trainingPoster.url}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
      <button
        className="training-motion-control"
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'إيقاف حركة سيلين مؤقتًا' : 'تشغيل حركة سيلين'}
      >
        {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      </button>
    </section>
  )
}
