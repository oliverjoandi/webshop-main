import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  categories: {categoryName: string} [] = [];
  barcode!: number;
  items: Item[] = [];
  barcodeUnique = true;

  constructor(private itemService: ItemService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesFromDatabase().subscribe(categoriesFromFb => {
      for (const key in categoriesFromFb) {
        const element = categoriesFromFb[key];
        this.categories.push({categoryName: element.categoryName})
      }
    })
    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      this.items = [];
      this.itemService.items = [];
  for (const key in itemsFromDatabase) {
     const element = itemsFromDatabase[key];
     this.items.push(element);
     this.itemService.items.push(element);
  }
});
    
  }

  onCheckBarcodeUnique() {
    let barcodeId = this.items.findIndex(item => item.barcode == this.barcode)
    this.barcodeUnique = barcodeId == -1 ? true : false;  
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    if (form.valid == true) {
      const item = new Item(
        form.value.imgSrc,
        form.value.title,
        form.value.price,
        form.value.category,
        form.value.barcode,
        form.value.producer,
        form.value.description,
        true
        )
      this.itemService.items.push(item);
      // this.itemService.saveItemsToDatabase();
      this.itemService.addItemToDatabase(item).subscribe(() => form.reset());
      
    }

  }

}
