import * as fs from 'fs'
import * as path from 'path'

interface Word {
  text: string
  count: string
}

const readFile = (url: string): String => fs.readFileSync(path.join(__dirname, url), 'utf-8')

const getQuery = (file: string) : Set<String> => new Set(readFile(file).split('\n'))
const getDictionary = (file: string) : Word[] => {
  return readFile(file).split('\n').map(entry => {
    const [text, count] = entry.split(',')
    return {
      text,
      count
    } 
  })
}

const queryExistsInDictionary = (query: Set<String>, dictionary: Word[]): Word[] => dictionary.filter(word => Array.from(query).includes(word.text))

const query = getQuery('../dictionaries/query.txt')
const dictionary = getDictionary('../dictionaries/dictionary.csv')

queryExistsInDictionary(query, dictionary).forEach(word => console.log(`${word.text} - ${word.count}`))