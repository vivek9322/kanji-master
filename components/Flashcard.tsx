'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Kanji } from '@/types'

interface FlashcardProps {
  kanji: Kanji
  index?: number
}

export default function Flashcard({ kanji, index = 0 }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="h-56 sm:h-64 lg:h-72 cursor-pointer perspective-1000 touch-manipulation select-none"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsFlipped(!isFlipped)
        }
      }}
      aria-label={`Flashcard for kanji ${kanji.kanji}`}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center p-4 sm:p-6"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          <div className="text-center w-full">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-japanese-red mb-2 sm:mb-4">
              {kanji.kanji}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
              Tap to flip
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg shadow-lg bg-gradient-to-br from-japanese-red to-red-600 text-white flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-y-auto"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center space-y-2 sm:space-y-3 w-full h-full flex flex-col justify-center">
            <div className="text-4xl sm:text-5xl font-bold mb-2 sm:mb-4">{kanji.kanji}</div>
            
            <div className="space-y-1.5 sm:space-y-2 text-left px-3 sm:px-4 text-xs sm:text-sm">
              <div>
                <span className="opacity-90 text-xs sm:text-sm">Onyomi:</span>
                <p className="font-semibold break-words">{kanji.onyomi || '—'}</p>
              </div>
              
              <div>
                <span className="opacity-90 text-xs sm:text-sm">Kunyomi:</span>
                <p className="font-semibold break-words">{kanji.kunyomi || '—'}</p>
              </div>
              
              <div>
                <span className="opacity-90 text-xs sm:text-sm">Meaning:</span>
                <p className="font-semibold break-words">{kanji.meaning}</p>
              </div>
              
              <div>
                <span className="opacity-90 text-xs sm:text-sm">Example:</span>
                <p className="font-semibold break-words">{kanji.example || '—'}</p>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm opacity-75 mt-2 sm:mt-4">Tap to flip back</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
