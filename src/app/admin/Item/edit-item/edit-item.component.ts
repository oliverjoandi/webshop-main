import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, OnDestroy {
  item!: Item;
  editItemForm!: FormGroup;
  id!: number;
  categories: {categoryName: string} [] = [];
  barcode!: number;
  items: Item[] = [];
  barcodeUnique = true;
  categoriesObservable!: Subscription;
  itemsObservable!: Subscription;


  constructor(private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private location: Location,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoriesObservable = this.categoryService.getCategoriesFromDatabase().subscribe(categoriesFromFb => {
      for (const key in categoriesFromFb) {
        const element = categoriesFromFb[key];
        this.categories.push({categoryName: element.categoryName})
      }
    })
    this.itemsObservable = this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      this.items = [];
      this.itemService.items = [];
  for (const key in itemsFromDatabase) {
     const element = itemsFromDatabase[key];
     this.items.push(element);
     this.itemService.items.push(element);
  }
});
    this.id = (Number)(this.activatedRoute.snapshot.paramMap.get('itemId'));
    let item = this.itemService.items.find(item => item.barcode == this.id);
    if (item) {
      this.item = item;
      this.barcode = item.barcode;
    }
    this.editItemForm = new FormGroup({
      title: new FormControl(this.item.title),
      price: new FormControl(this.item.price),
      imgSrc: new FormControl(this.item.imgSrc),
      category: new FormControl(this.item.category),
      barcode: new FormControl(this.item.barcode),
      producer: new FormControl(this.item.producer),
      description: new FormControl(this.item.description),
      isActive: new FormControl(this.item.isActive)
    })
  }

  onBack() {
    // this.router.navigateByUrl("/admin/")
    this.location.back();
     }

 onCheckBarcodeUnique() {
      let barcodeId = this.items.findIndex(item => item.barcode == this.barcode)
      this.barcodeUnique = (barcodeId == -1 || this.barcode == this.item.barcode) ? true : false;  
      // if (barcodeId == -1 && this.barcode == this.item.barcode)
    }   
  onSubmit(form: FormGroup) {
    if (form.valid == true) {
      const item = new Item(form.value.imgSrc,
         form.value.title, 
         form.value.price,
          form.value.category,
          form.value.barcode,
        form.value.producer,
        form.value.description,
        form.value.isActive);
    let itemId = this.itemService.items.findIndex(item => item.barcode == this.id);
    if (itemId != -1) {
      this.itemService.items[itemId] = item;
      this.itemService.saveItemsToDatabase().subscribe(() =>
      this.router.navigateByUrl("/admin/view-items"));
    }
      
      // setTimeout(() => { }, 500)
      
      // this.itemService.saveItemsToDatabase();
    }
     }

 ngOnDestroy() {
   this.categoriesObservable.unsubscribe();
   this.itemsObservable.unsubscribe();
 }   

   }
