import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'What\'s in the fridge';
  ingredient = '';
  ingredientList = [];

  addIngredient(ingredientToAdd: string) {
    if (this.ingredientList.indexOf(ingredientToAdd) == -1) {
      this.ingredientList.push(ingredientToAdd);
    }
    this.ingredient = '';
  }

  removeIngredient(ingredientToRemove: string) {
    this.ingredientList.splice(this.ingredientList.indexOf(ingredientToRemove), 1);
  }
  
  search(){
    
  }
}
