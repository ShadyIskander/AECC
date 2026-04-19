import 'server-only'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
  ar: () => import('@/dictionaries/ar.json').then((m) => m.default),
}

export type Locale = keyof typeof dictionaries
export const locales: Locale[] = ['en', 'ar']
export const defaultLocale: Locale = 'en'

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
export type SubBrand = 'credologos' | 'third_space' | 'east' | 'counseling' | 'e30'
export type EventType = 'course' | 'event' | 'workshop'
export type BookingStatus = 'pending' | 'confirmed' | 'failed' | 'cancelled'
export type UserRole = 'user' | 'admin'

export interface Profile {
  id: string
  full_name: string
  email: string
  role: UserRole
  created_at: string
}

export interface ECCEvent {
  id: string
  title: string
  title_ar: string
  description: string
  description_ar: string
  sub_brand: SubBrand
  type: EventType
  date_time: string
  location: string
  location_ar: string
  price: number
  capacity: number | null
  image_url: string | null
  is_published: boolean
  created_at: string
}

export interface Booking {
  id: string
  user_id: string
  event_id: string
  status: BookingStatus
  paymob_order_id: string | null
  amount_paid: number
  created_at: string
  event?: ECCEvent
  profile?: Profile
}
