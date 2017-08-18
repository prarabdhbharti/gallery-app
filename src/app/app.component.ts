import { Component } from '@angular/core';
import {GalleryComponent} from './gallery.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  images;

  constructor(){
    this.images = [
      {"url":"assets/covered.jpg","title":"Covered"},
      {"url":"assets/generation.jpg","title":"Generation"},
      {"url":"assets/potter.jpg","title":"Potter"},
      {"url":"assets/preschool.jpg","title":"Pre School"},
      {"url":"assets/soccer.jpg","title":"Soccer"},
      {"url":"assets/covered.jpg","title":"Covered"},
      {"url":"assets/generation.jpg","title":"Generation"},
      {"url":"assets/potter.jpg","title":"Potter"},
      {"url":"assets/preschool.jpg","title":"Pre School"},
      {"url":"assets/soccer.jpg","title":"Soccer"},
    ];
  }
}
