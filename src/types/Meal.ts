export class Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions?: string
  arrIngredients?: string[]
  arrMeasures?: string[]

  constructor(
    idMeal: string,
    strMeal: string,
    strMealThumb: string,
    strInstructions?: string,
    arrIngredients?: string[],
    arrMeasures?: string[]
  ) {
    this.idMeal = idMeal
    this.strMeal = strMeal
    this.strMealThumb = strMealThumb
    this.strInstructions = strInstructions
    this.arrIngredients = arrIngredients
    this.arrMeasures = arrMeasures
  }
}
