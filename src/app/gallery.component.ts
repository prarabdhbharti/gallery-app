import {Component, Input, ElementRef, Renderer2, ViewChild} from '@angular/core';
const Hammer = require('hammerjs');
@Component({
	selector: 'gallery',
	templateUrl: './gallery.component.html',
	host: {'(window:keydown)': 'hotkeys($event)'},
	styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent { 
   /*@ViewChild('modalBody') modalBody: ElementRef;
   @ViewChild('imageDiv') imageDiv: ElementRef;*/
   constructor(private rd: Renderer2,private el: ElementRef){
   }

   @Input() datasource;
   selectedImage;
   public hammertime;
   public rect;
   public posX:number = 0;
   public posY:number = 0;
   public scale:number = 1;
   public last_scale;
   public last_posX:number = 0;
   public last_posY:number = 0;
   public transform:string = '';
 
   ngOnInit(){
   }

   ngAfterViewInit(){
      
   }

   setSelectedImage(image){
      this.selectedImage= image;	
      setTimeout(()=>{
         this.rect = document.getElementById('imageDiv');
         this.hammertime = Hammer(document.getElementById('modalBody'),{
           transform_always_block: true,
           transform_min_scale: 1,
           drag_block_horizontal: false,
           drag_block_vertical: false,
           drag_min_distance: 0
         });
         console.log(this.hammertime);
         this.hammertime.on('touch drag transform dragend', function(ev){
            console.log(ev);
            switch (ev.type) {
               case "touch":
                  this.last_scale = this.scale;
                  break;

               case "drag":
                                 
                  break;
               case 'transform':
                  this.scale = Math.max(1, Math.min(this.last_scale * ev.gesture.scale, 10));
                  break;

               case 'dragend':
                  this.last_posX = this.posX;
                  this.last_posY = this.posY;
                  break;
            }
            if(this.scale > 1){
               this.transform =
                  "translate3d("+this.posX+"px,"+this.posY+"px, 0) " +
                  "scale3d("+this.scale+","+this.scale+", 0) ";
            }
            else{
               this.transform =
                  "translate3d(0, 0, 0) " +
                  "scale3d(1, 1, 0) ";   
                  this.posX = 0;
                  this.posY = 0;
                  this.last_posX = 0;
                  this.last_posY = 0;
            }
            this.rect.style.transform = this.transform;
            this.rect.style.oTransform = this.transform;
            this.rect.style.msTransform = this.transform;
            this.rect.style.mozTransform = this.transform;
            this.rect.style.webkitTransform = this.transform;
         })
      },100)
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
   onPinch(ev){
      this.last_scale = this.scale;
      this.scale = Math.max(1, Math.min(this.last_scale * ev.scale, 10));
      this.applyTransform();
   }
   onPanEnd(ev) {
      event.preventDefault();
      this.last_posX = this.posX;
      this.last_posY = this.posY;
      this.applyTransform();
   }

   onPan(ev) {
      event.preventDefault();
      this.posX = this.last_posX + ev.deltaX;
      this.posY = this.last_posY + ev.deltaY;
      this.applyTransform();
   }
   applyTransform(){
      if(this.scale > 1){
         this.transform =
            "translate3d("+this.posX+"px,"+this.posY+"px, 0) " +
            "scale("+this.scale+","+this.scale+") ";
      }
      else{
         this.transform =
            "translate3d(0, 0, 0) " +
            "scale(1, 1) ";   
            this.posX = 0;
            this.posY = 0;
            this.last_posX = 0;
            this.last_posY = 0;
      }
      this.rect.style.transform = this.transform;
      this.rect.style.oTransform = this.transform;
      this.rect.style.msTransform = this.transform;
      this.rect.style.mozTransform = this.transform;
      this.rect.style.webkitTransform = this.transform;
   }
}