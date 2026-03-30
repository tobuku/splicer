'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().max(500).optional(),
})
type FormData = z.infer<typeof schema>

interface Props {
  listingId: string
  listingName: string
}

export default function LeadForm({ listingId, listingName }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setServerError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, listingId }),
      })
      if (!res.ok) {
        const err = await res.json()
        setServerError(err.error || 'Submission failed')
        return
      }
      setSubmitted(true)
    } catch {
      setServerError('Network error. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-[#1f1f1f] font-semibold mb-1">Quote Request Sent</h3>
        <p className="text-[#555555] text-sm">{listingName} will be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('name')}
          placeholder="Your Name *"
          className="w-full bg-[#f0f0f0] border border-[#e8e8e8] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none focus:border-[#0b5cff] transition-colors"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email Address *"
          className="w-full bg-[#f0f0f0] border border-[#e8e8e8] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none focus:border-[#0b5cff] transition-colors"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <input
          {...register('phone')}
          type="tel"
          placeholder="Phone Number"
          className="w-full bg-[#f0f0f0] border border-[#e8e8e8] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none focus:border-[#0b5cff] transition-colors"
        />
      </div>
      <div>
        <textarea
          {...register('message')}
          placeholder="Describe your project..."
          rows={4}
          className="w-full bg-[#f0f0f0] border border-[#e8e8e8] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none focus:border-[#0b5cff] transition-colors resize-none"
        />
      </div>
      {serverError && <p className="text-red-400 text-xs">{serverError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0b5cff] hover:bg-[#0946cc] disabled:opacity-60 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-[#0b5cff]/20"
      >
        {isSubmitting ? 'Sending...' : 'Request a Free Quote'}
      </button>
      <p className="text-[#777777] text-xs text-center">Your information is never shared or sold.</p>
    </form>
  )
}
