import { LS_KEY } from './constants'

export function getSavedMealsIds(): string[] {
  return JSON.parse(localStorage.getItem(LS_KEY) || '[]')
}
