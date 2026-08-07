import { WORKOUTS_BY_JS_DAY } from '../data/workouts'

export const RIYADH_TIME_ZONE = 'Asia/Riyadh'

function getRiyadhParts(value = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: RIYADH_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value)

  return Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, Number(part.value)]))
}

export function getRiyadhCalendarDate(value = new Date()) {
  const { year, month, day } = getRiyadhParts(value)
  return new Date(Date.UTC(year, month - 1, day))
}

export function getTodayWorkout(value = new Date()) {
  const calendarDate = getRiyadhCalendarDate(value)
  return WORKOUTS_BY_JS_DAY[calendarDate.getUTCDay()]
}

export function getCurrentWeek(value = new Date()) {
  const today = getRiyadhCalendarDate(value)
  const distanceFromSaturday = (today.getUTCDay() + 1) % 7
  const saturday = new Date(today)
  saturday.setUTCDate(today.getUTCDate() - distanceFromSaturday)

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(saturday)
    date.setUTCDate(saturday.getUTCDate() + index)
    return date
  })
}

export function formatArabicDate(date) {
  return new Intl.DateTimeFormat('ar-SA-u-ca-gregory-nu-arab', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(date)
}

export function formatArabicDayNumber(date) {
  return new Intl.DateTimeFormat('ar-SA-u-ca-gregory-nu-arab', {
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function formatRiyadhTime(value = new Date()) {
  return new Intl.DateTimeFormat('ar-SA-u-nu-arab', {
    timeZone: RIYADH_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
  }).format(value)
}
