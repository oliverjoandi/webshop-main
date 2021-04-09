import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'app-carousel-settings',
  templateUrl: './carousel-settings.component.html',
  styleUrls: ['./carousel-settings.component.css']
})
export class CarouselSettingsComponent implements OnInit {
  carouselSettingsForm!: FormGroup;

  imageUrl!: string;
  imageHeader!: string;
  imageText!: string;
  imageAlt!: string;
  url!: string;
  isInternal!: boolean;


  images: {
    url: string;
    header: string;
    text: string;
    alt: string;
    linkUrl: string;
    isInternal: boolean;
  }[] = [];
  
 

  constructor(private carouselService: CarouselService) { }

  ngOnInit(): void {
    this.images = this.carouselService.images;
    this.carouselSettingsForm = new FormGroup({
      interval: new FormControl(this.carouselService.interval),
      wrap: new FormControl(this.carouselService.wrap),
      keyboard: new FormControl(this.carouselService.keyboard),
      pauseOnHover: new FormControl(this.carouselService.pauseOnHover),
      showNavigationArrows: new FormControl(this.carouselService.showNavigationArrows),
      showNavigationIndicators: new FormControl(this.carouselService.showNavigationIndicators)
    })
  }
  onSubmit() {
    let formValue = this.carouselSettingsForm.value;
    this.carouselService.interval = formValue.interval
    this.carouselService.wrap = formValue.wrap
    this.carouselService.keyboard = formValue.keyboard
    this.carouselService.pauseOnHover = formValue.pauseOnHover
    this.carouselService.showNavigationArrows = formValue.showNavigationArrows
    this.carouselService.showNavigationIndicators = formValue.showNavigationIndicators
  }

  onAddGalleryPicture() {
    this.carouselService.images.push(
      { url: this.imageUrl,
        header: this.imageHeader,
        text: this.imageText,
        alt: this.imageAlt,
        linkUrl: this.url,
        isInternal: this.isInternal
      }
    )
  }
  onDeleteGalleryPicture(i: number) {
    this.carouselService.images.splice(i, 1);
  }
}
