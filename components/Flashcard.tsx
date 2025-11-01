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
      className="h-64 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center p-6"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          <div className="text-center">
            <div className="text-7xl font-bold text-japanese-red mb-4">
              {kanji.kanji}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Click to flip
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg shadow-lg bg-gradient-to-br from-japanese-red to-red-600 text-white flex items-center justify-center p-6"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center space-y-3 w-full">
            <div className="text-5xl font-bold mb-4">{kanji.kanji}</div>
            
            <div className="space-y-2 text-left px-4">
              <div>
                <span className="text-sm opacity-90">Onyomi:</span>
                <p className="font-semibold">{kanji.onyomi}</p>
              </div>
              
              <div>
                <span className="text-sm opacity-90">Kunyomi:</span>
                <p className="font-semibold">{kanji.kunyomi}</p>
              </div>
              
              <div>
                <span className="text-sm opacity-90">Meaning:</span>
                <p className="font-semibold">{kanji.meaning}</p>
              </div>
              
              <div>
                <span className="text-sm opacity-90">Example:</span>
                <p className="font-semibold">{kanji.example}</p>
              </div>
            </div>
            
            <p className="text-sm opacity-75 mt-4">Click to flip back</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
