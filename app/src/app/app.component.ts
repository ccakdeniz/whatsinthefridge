import { Component } from '@angular/core';
import { ApiService } from '../app/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'What\'s in the fridge?';
  ingredient = '';
  ingredientList = [];
  recipes: any = [];
  isBusy: boolean = false;
  errors: any = [];
  page: number = 1;

  constructor(private apiService: ApiService) { }

  addIngredient(ingredientToAdd: string) {
    if (this.ingredientList.indexOf(ingredientToAdd) == -1) {
      this.ingredientList.push(ingredientToAdd);
    }
    this.ingredient = '';
  }

  removeIngredient(ingredientToRemove: string) {
    this.ingredientList.splice(this.ingredientList.indexOf(ingredientToRemove), 1);
  }

  search() {
    var commaSeparatedIngredients = this.buildCommaSeparatedIngredients(this.ingredientList)
    this.isBusy = true;
    this.recipes = [];
    this.apiService.GetRecipes(commaSeparatedIngredients).subscribe((data: {}) => {
      data['results'].forEach(recipe => {
        this.recipes.push(this.formatIngredients(recipe));
      });
    },
      error => {
        this.errors.push(error);
      }).add(() => {
        this.isBusy = false;
      });
  }

  getMore(page) {
    this.page = page;
    var commaSeparatedIngredients = this.buildCommaSeparatedIngredients(this.ingredientList)
    this.isBusy = true;
    this.apiService.GetRecipes(commaSeparatedIngredients, page).subscribe((data: {}) => {
      if (this.recipes.indexOf(data['results'][0]) == -1) {
        data['results'].forEach(recipe => {
          this.recipes.push(this.formatIngredients(recipe));
        });
      }
    },
      error => {
        this.errors.push(error);
      }).add(() => {
        this.isBusy = false;
      });
  }

  formatIngredients(recipe) {
    let ingredientsArr = recipe.ingredients.split(',');
    ingredientsArr.forEach(ing => {
      ing = ing.trim();
    });
    recipe.ingredients = ingredientsArr;
    return recipe;
  }

  clearAll() {
    this.page = 1;
    this.ingredientList = [];
    this.recipes = [];
    this.errors = [];
  }

  removeError(error) {
    this.errors.splice(this.errors.indexOf(error), 1);
  }

  buildCommaSeparatedIngredients(ingredients: any[]) {
    var returnStr = '';
    ingredients.forEach((ingredient, idx) => {
      returnStr += ingredient;
      if (idx < ingredients.length - 1) {
        returnStr += ',';
      }
    });
    return returnStr;
  }
}
