import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThousandSeparatorPipe } from '../pipes/thousand-separator.pipe';
import { ItemCardComponent } from './item-card/item-card.component';
import { ViewComponent } from './view/view.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { ShortenTitlePipe } from '../pipes/shorten-title.pipe';



@NgModule({
  declarations: [
    ThousandSeparatorPipe,
    ViewComponent,
    ItemCardComponent,
    ShortenTitlePipe,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AppRoutingModule
  ],
  exports: [
    ThousandSeparatorPipe,
    ItemCardComponent,
  ]
})
export class ItemModule { }
