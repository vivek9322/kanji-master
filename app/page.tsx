'use client'

import { useState, useMemo } from 'react'
import { Search, Shuffle } from 'lucide-react'
import Flashcard from '@/components/Flashcard'
import { useAppStore } from '@/lib/store'
import n5Kanji from '@/data/jlpt_n5_kanji.json'
import { Kanji } from '@/types'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { studyMode, toggleStudyMode } = useAppStore()

  // Filter kanjis based on search query
  const filteredKanjis = useMemo(() => {
    let filtered = n5Kanji as Kanji[]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (kanji) =>
          kanji.kanji.toLowerCase().includes(query) ||
          kanji.meaning.toLowerCase().includes(query) ||
          kanji.onyomi.toLowerCase().includes(query) ||
          kanji.kunyomi.toLowerCase().includes(query) ||
          kanji.example.toLowerCase().includes(query)
      )
    }

    // Shuffle if study mode is enabled
    if (studyMode) {
      filtered = [...filtered].sort(() => Math.random() - 0.5)
    }

    return filtered
  }, [searchQuery, studyMode])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            JLPT N5 Kanjis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredKanjis.length} kanji{filteredKanjis.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search kanji, meaning, reading..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-japanese-red"
            />
          </div>

          <button
            onClick={toggleStudyMode}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              studyMode
                ? 'bg-japanese-red text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Shuffle size={18} />
            <span className="hidden sm:inline">Study Mode</span>
          </button>
        </div>
      </div>

      {filteredKanjis.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No kanjis found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredKanjis.map((kanji, index) => (
            <Flashcard key={kanji.id} kanji={kanji} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

