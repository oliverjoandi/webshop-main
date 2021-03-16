import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
items: Item[] = [];

  constructor(private itemService: ItemService,
    private translate: TranslateService) { }

  ngOnInit(): void {
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


  onDeleteItem(i: number) {
    let isConfirm = confirm(this.translate.instant( "oled kustutamas!"));
    if (isConfirm) {
      this.itemService.items.splice(i, 1);
      this.items.splice(i, 1)
      this.itemService.saveItemsToDatabase();
    }
    // alert confirmi asemel tuleb kast mis hoistab aga confirmis pead ise ok/cancel valima
    
  }
}
