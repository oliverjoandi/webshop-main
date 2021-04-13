import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories: {id: string, categoryName: string} [] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    // this.categories = this.categoryService.categories;
    // this.categoryService.saveItemsToDatabase().subscribe();
    this.categoryService.getCategoriesFromDatabase().subscribe(categoriesFromFb => {
      for (const key in categoriesFromFb) {
        const element = categoriesFromFb[key];
        this.categories.push({id: key,categoryName: element.categoryName});
      }
      console.log("VÕTAN SERVICE_ST")
    })
  }

  onRemoveCategory(i: number) {
    let isConfirm = confirm("Oled kindel, et soovid kustutada")
    if (isConfirm) {
      this.categoryService.categories.splice(i,1)
      this.categoryService.deleteFromDatabase(this.categories).subscribe();
    }
  }

}
