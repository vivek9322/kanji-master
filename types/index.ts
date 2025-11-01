export interface Kanji {
  id: number
  kanji: string
  onyomi: string
  kunyomi: string
  meaning: string
  example: string
}

export interface Flashcard extends Kanji {
  user_id?: string
  created_at?: string
  updated_at?: string
}

