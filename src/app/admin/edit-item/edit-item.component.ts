import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  item!: Item;
  editItemForm!: FormGroup;
  id!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = (Number)(this.activatedRoute.snapshot.paramMap.get('itemId'));
    this.item = this.itemService.items[this.id];
    this.editItemForm = new FormGroup({
      title: new FormControl(this.item.title),
      price: new FormControl(this.item.price),
      imgSrc: new FormControl(this.item.imgSrc),
      category: new FormControl(this.item.category),
    })
  }
  onSubmit(form: FormGroup) {
    if (form.valid == true) {
      const item = new Item(form.value.imgSrc, form.value.title, form.value.price, form.value.category,)
      this.itemService.items[this.id] = item;
      this.itemService.saveItemsToDatabase();
      this.router.navigateByUrl("/admin/view-items");
      // this.itemService.saveItemsToDatabase();
    }

  } }
