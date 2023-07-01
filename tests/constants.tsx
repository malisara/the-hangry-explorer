import { Meal } from '../src/types/Meal'

export const emptyMeals = { meals: null }

export const detailMeal = new Meal(
  '1',
  'Test1',
  'https://fakeurl1',
  'fake instructions',
  ['ingredient1', 'ingredient2'],
  ['measure1', 'measure2']
)
