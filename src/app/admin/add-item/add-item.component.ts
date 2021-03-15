import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    
  }
  onSubmit(form: NgForm) {
    console.log(form.value)
    if (form.valid == true) {
      const item = new Item(form.value.imgSrc, form.value.title, form.value.price, form.value.category,)
      this.itemService.items.push(item);
      // this.itemService.saveItemsToDatabase();
      this.itemService.addItemToDatabase(item);
    }

  }

}
