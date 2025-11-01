'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Plus, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AddNewPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    kanji: '',
    onyomi: '',
    kunyomi: '',
    meaning: '',
    example: '',
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.kanji.trim()) {
      toast.error('Kanji is required')
      return
    }
    if (!formData.meaning.trim()) {
      toast.error('Meaning is required')
      return
    }

    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth')
        return
      }

      const { error } = await supabase
        .from('flashcards')
        .insert([
          {
            user_id: session.user.id,
            kanji: formData.kanji.trim(),
            onyomi: formData.onyomi.trim(),
            kunyomi: formData.kunyomi.trim(),
            meaning: formData.meaning.trim(),
            example: formData.example.trim(),
          },
        ])

      if (error) throw error

      toast.success('Flashcard created successfully!')
      setFormData({
        kanji: '',
        onyomi: '',
        kunyomi: '',
        meaning: '',
        example: '',
      })
      
      // Redirect to my flashcards page
      setTimeout(() => {
        router.push('/my-flashcards')
      }, 1000)
    } catch (error: any) {
      toast.error('Failed to create flashcard: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
          Add New Flashcard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Create a custom flashcard to study
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="kanji" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
            Kanji <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="kanji"
            name="kanji"
            value={formData.kanji}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-japanese-red"
            placeholder="例: 漢"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="onyomi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
            Onyomi (音読み)
          </label>
          <input
            type="text"
            id="onyomi"
            name="onyomi"
            value={formData.onyomi}
            onChange={handleChange}
            className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-japanese-red"
            placeholder="例: カン"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="kunyomi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
            Kunyomi (訓読み)
          </label>
          <input
            type="text"
            id="kunyomi"
            name="kunyomi"
            value={formData.kunyomi}
            onChange={handleChange}
            className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-japanese-red"
            placeholder="例: かんじ"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="meaning" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
            Meaning <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="meaning"
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-japanese-red"
            placeholder="例: Chinese character"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="example" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
            Example Word
          </label>
          <textarea
            id="example"
            name="example"
            value={formData.example}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-japanese-red resize-none"
            placeholder="例: 漢字 (かんじ) - kanji"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 sm:py-2.5 bg-japanese-red text-white rounded-lg hover:bg-japanese-red-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base sm:text-sm touch-manipulation min-h-[44px]"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Creating...
            </>
          ) : (
            <>
              <Plus size={20} />
              Create Flashcard
            </>
          )}
        </button>
      </form>
    </div>
  )
}

