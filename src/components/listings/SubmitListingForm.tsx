'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  businessName: string
  phone: string
  website: string
  email: string
  city: string
  state: string
  zip: string
  services: string[]
  category: 'FIBER' | 'TELECOM' | 'COPPER' | 'MULTIPLE'
  description: string
  certifications: string
}

const SERVICE_OPTIONS = [
  { value: 'fusion-splicing', label: 'Fusion Splicing' },
  { value: 'mechanical-splicing', label: 'Mechanical Splicing' },
  { value: 'copper-splicing', label: 'Copper Splicing' },
  { value: 'osp-splicing', label: 'OSP Splicing' },
  { value: 'otdr-testing', label: 'OTDR Testing' },
  { value: 'emergency-service', label: 'Emergency Service (24/7)' },
]

const CATEGORY_OPTIONS = [
  { value: 'FIBER', label: 'Fiber Optic', color: 'emerald' },
  { value: 'TELECOM', label: 'Telecom', color: 'blue' },
  { value: 'COPPER', label: 'Copper Cable', color: 'amber' },
  { value: 'MULTIPLE', label: 'Multiple / All', color: 'slate' },
]

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
]

export default function SubmitListingForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      services: [],
      category: 'FIBER',
    },
  })

  async function onSubmit(data: FormValues) {
    setServerError(null)
    try {
      const res = await fetch('/api/listings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setServerError((json as { error?: string }).error ?? 'Submission failed. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    }
  }

  if (submitted) {
    return (
      <div className="bg-white border border-emerald-500/30 rounded-2xl p-10 text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4 text-emerald-400">&#10003;</div>
        <h2 className="text-xl font-bold text-[#1f1f1f] mb-3">Listing Submitted</h2>
        <p className="text-[#555555] text-sm leading-relaxed">
          Your listing has been received. We review submissions within 1–2 business days and will contact you at the email address you provided if we need additional information.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">

      {/* Business Info */}
      <fieldset>
        <legend className="text-[#1f1f1f] font-bold text-lg mb-5 pb-2 border-b border-[#e8e8e8] w-full">Business Information</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#555555] mb-1.5" htmlFor="businessName">
              Business Name <span className="text-red-400">*</span>
            </label>
            <input
              id="businessName"
              type="text"
              {...register('businessName', { required: 'Business name is required' })}
              className="w-full bg-white border border-[#e8e8e8] focus:border-[#0b5cff] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none transition-colors"
              placeholder="Acme Fiber Solutions LLC"
            />
            {errors.businessName && <p className="text-red-400 text-xs mt-1.5">{errors.businessName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#555555] mb-1.5" htmlFor="phone">
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full bg-white border border-[#e8e8e8] focus:border-[#0b5cff] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none transition-colors"
              placeholder="(808) 555-0100"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#555555] mb-1.5" htmlFor="email">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
              })}
              className="w-full bg-white border border-[#e8e8e8] focus:border-[#0b5cff] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none transition-colors"
              placeholder="info@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#555555] mb-1.5" htmlFor="website">
              Website
            </label>
            <input
              id="website"
              type="url"
              {...register('website')}
              className="w-full bg-white border border-[#e8e8e8] focus:border-[#0b5cff] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none transition-colors"
              placeholder="https://www.example.com"
            />
          </div>
        </div>
      </fieldset>

      {/* Location */}
      <fieldset>
        <legend className="text-[#1f1f1f] font-bold text-lg mb-5 pb-2 border-b border-[#e8e8e8] w-full">Service Location</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#555555] mb-1.5" htmlFor="city">
              City <span className="text-red-400">*</span>
            </label>
            <input
              id="city"
              type="text"
              {...register('city', { required: 'City is required' })}
              className="w-full bg-white border border-[#e8e8e8] focus:border-[#0b5cff] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none transition-colors"
              placeholder="Honolulu"
            />
            {errors.city && <p className="text-red-400 text-xs mt-1.5">{errors.city.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#555555] mb-1.5" htmlFor="state">
              State <span className="text-red-400">*</span>
            </label>
            <select
              id="state"
              {...register('state', { required: 'State is required' })}
              className="w-full bg-white border border-[#e8e8e8] focus:border-[#0b5cff] rounded-xl px-4 py-3 text-[#1f1f1f] text-sm outline-none transition-colors appearance-none"
            >
              <option value="">Select state</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.state && <p className="text-red-400 text-xs mt-1.5">{errors.state.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#555555] mb-1.5" htmlFor="zip">
              Zip Code <span className="text-red-400">*</span>
            </label>
            <input
              id="zip"
              type="text"
              {...register('zip', {
                required: 'Zip code is required',
                pattern: { value: /^\d{5}(-\d{4})?$/, message: 'Enter a valid zip code' },
              })}
              className="w-full bg-white border border-[#e8e8e8] focus:border-[#0b5cff] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none transition-colors"
              placeholder="96813"
            />
            {errors.zip && <p className="text-red-400 text-xs mt-1.5">{errors.zip.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Category */}
      <fieldset>
        <legend className="text-[#1f1f1f] font-bold text-lg mb-5 pb-2 border-b border-[#e8e8e8] w-full">Primary Category <span className="text-red-400">*</span></legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORY_OPTIONS.map((opt) => {
            const selected = watch('category') === opt.value
            return (
              <label
                key={opt.value}
                className={`flex items-center justify-center gap-2 border rounded-xl px-4 py-3 text-sm font-medium cursor-pointer transition-all ${
                  selected
                    ? 'border-[#0b5cff] bg-[#0b5cff]/10 text-[#0b5cff]'
                    : 'border-[#e8e8e8] bg-white text-[#555555] hover:border-slate-500'
                }`}
              >
                <input
                  type="radio"
                  value={opt.value}
                  {...register('category', { required: true })}
                  className="sr-only"
                />
                {opt.label}
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Services */}
      <fieldset>
        <legend className="text-[#1f1f1f] font-bold text-lg mb-5 pb-2 border-b border-[#e8e8e8] w-full">Services Offered</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 bg-white border border-[#e8e8e8] hover:border-slate-500 rounded-xl px-4 py-3 cursor-pointer transition-all group"
            >
              <input
                type="checkbox"
                value={opt.value}
                {...register('services')}
                className="w-4 h-4 rounded border-[#e0e0e0] bg-white accent-[#0b5cff]"
              />
              <span className="text-[#555555] text-sm group-hover:text-[#1f1f1f] transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Description */}
      <fieldset>
        <legend className="text-[#1f1f1f] font-bold text-lg mb-5 pb-2 border-b border-[#e8e8e8] w-full">Business Description</legend>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#555555] mb-1.5" htmlFor="description">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              rows={5}
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 50, message: 'Please write at least 50 characters' },
              })}
              className="w-full bg-white border border-[#e8e8e8] focus:border-[#0b5cff] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none transition-colors resize-none"
              placeholder="Describe your business, service area, years in operation, and the types of projects you specialize in..."
            />
            {errors.description && <p className="text-red-400 text-xs mt-1.5">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#555555] mb-1.5" htmlFor="certifications">
              Certifications &amp; Credentials
            </label>
            <input
              id="certifications"
              type="text"
              {...register('certifications')}
              className="w-full bg-white border border-[#e8e8e8] focus:border-[#0b5cff] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none transition-colors"
              placeholder="FOA CFOT, BICSI Installer, OSHA 30, etc."
            />
          </div>
        </div>
      </fieldset>

      {serverError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0b5cff] hover:bg-[#0946cc] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl text-sm transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Listing'}
      </button>

      <p className="text-[#777777] text-xs text-center">
        All listings are reviewed before going live. We will contact you at the email address above if we have questions.
      </p>
    </form>
  )
}
