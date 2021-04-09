import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselService } from 'src/app/admin/carousel-settings/carousel.service';

@Component({
  selector: 'app-gallery-carousel',
  templateUrl: './gallery-carousel.component.html',
  styleUrls: ['./gallery-carousel.component.css']
})
export class GalleryCarouselComponent implements OnInit {
  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/1500/500`);
  images: {
    url: string;
    header: string;
    text: string;
    alt: string;
    linkUrl: string;
    isInternal: boolean;
  }[] = [];
 
  constructor(private config: NgbCarouselConfig, private carouselService: CarouselService) {
    // customize default values of carousels used by this component tree
    
 }

  ngOnInit(): void {
    this.images = this.carouselService.images;
    this.config.interval = this.carouselService.interval;
    this.config.wrap = this.carouselService.wrap;
    this.config.keyboard = this.carouselService.keyboard;
    this.config.pauseOnHover = this.carouselService.pauseOnHover;
    if (this.images.length > 1) {
      this.config.showNavigationArrows = this.carouselService.showNavigationArrows;
    this.config.showNavigationIndicators = this.carouselService.showNavigationIndicators;
    } else {
    this.config.showNavigationArrows = false;
    this.config.showNavigationIndicators = false;
    }
    

  }

}
