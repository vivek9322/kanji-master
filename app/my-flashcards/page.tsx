'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, DatabaseFlashcard as Flashcard } from '@/lib/supabase'
import FlashcardComponent from '@/components/Flashcard'
import { Trash2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Kanji } from '@/types'

export default function MyFlashcardsPage() {
  const router = useRouter()
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFlashcards()
  }, [])

  const fetchFlashcards = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth')
        return
      }

      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setFlashcards(data || [])
    } catch (error: any) {
      toast.error('Failed to fetch flashcards: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this flashcard?')) return

    try {
      const { error } = await supabase
        .from('flashcards')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Flashcard deleted')
      setFlashcards(flashcards.filter((f) => f.id !== id))
    } catch (error: any) {
      toast.error('Failed to delete flashcard: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-japanese-red" size={48} />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
          My Flashcards
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {flashcards.length} flashcard{flashcards.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {flashcards.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-4">
            You haven&apos;t created any flashcards yet.
          </p>
          <a
            href="/add-new"
            className="inline-block px-6 py-3 bg-japanese-red text-white rounded-lg hover:bg-japanese-red-light transition-colors text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center justify-center"
          >
            Create Your First Flashcard
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {flashcards.map((flashcard) => {
            const kanji: Kanji = {
              id: Date.now() + Math.random(), // Generate a unique ID for display
              kanji: flashcard.kanji,
              onyomi: flashcard.onyomi || '',
              kunyomi: flashcard.kunyomi || '',
              meaning: flashcard.meaning,
              example: flashcard.example || '',
            }
            return (
              <div key={flashcard.id} className="relative group">
                <FlashcardComponent kanji={kanji} />
                <button
                  onClick={() => handleDelete(flashcard.id)}
                  className="absolute top-2 right-2 p-2.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 sm:opacity-100 sm:group-hover:opacity-100 transition-opacity hover:bg-red-700 touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label="Delete flashcard"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

