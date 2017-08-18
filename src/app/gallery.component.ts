import {Component, Input} from '@angular/core';

@Component({
	selector: 'gallery',
	templateUrl: './gallery.component.html',
	host: {'(window:keydown)': 'hotkeys($event)'},
	styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent { 
   /*x: number = 0;
   y: number = 0;
   startX: number = 0;
   startY: number = 0;*/
   pinchScale: number = 1;

   @Input() datasource;
   selectedImage;
 
   setSelectedImage(image){
      this.selectedImage= image;	
   }

   swipe(type){
      var forward;
      if(type=='swipeleft'){
         forward = true;
      }
      else if(type=='swiperight'){
         forward = false;
      }
      var index = this.datasource.indexOf(this.selectedImage)+(forward ? 1: -1);
      if(index >= 0 && index < this.datasource.length){
         this.selectedImage = this.datasource[index];   
      }
   }

   navigate(forward){
   	var index = this.datasource.indexOf(this.selectedImage)+(forward ? 1: -1);
   	if(index >= 0 && index < this.datasource.length){
         this.selectedImage = this.datasource[index];	
   	}
	}
	hotkeys(event){
  	if(this.selectedImage){
      if (event.keyCode == 37){
         this.navigate(false);
      }else if(event.keyCode == 39){
         this.navigate(true);
      }
   	}
	}

   onPinch(event: any): void {
      this.pinchScale = event.scale;
   }

   /*onPanStart(event: any): void {
     event.preventDefault();
     this.startX = this.x;
     this.startY = this.y;
   }

   onPan(event: any): void {
     event.preventDefault();
     this.x = this.startX + event.deltaX;
     this.y = this.startY + event.deltaY;
   }*/
}