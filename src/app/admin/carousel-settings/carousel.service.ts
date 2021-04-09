import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  images = [
    { url: `https://picsum.photos/id/700/1500/500`, header: "Do more", text: "Be more", alt: "First", linkUrl: "https://www.Google.com", isInternal: false},
    { url: `https://picsum.photos/id/533/1500/500`, header: "Learn more", text: "Live more", alt: "Second",linkUrl: "https://www.Google.com", isInternal: true},
    { url: `https://picsum.photos/id/12/1500/500`, header: "Experience more", text: "Feel more", alt: "Third",linkUrl: "https://www.Google.com", isInternal: false}
  ]


  interval = 10000;
  wrap = true;
  keyboard = true;
  pauseOnHover = true;
  showNavigationArrows = true;
  showNavigationIndicators = true;
  url = "";
  isInternal = true;

  constructor() { }
}
