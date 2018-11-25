import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css'],
  inputs: ['video'],
  outputs: ['updateVideoEvent', 'deleteVideoEvent']
})
export class VideoDetailsComponent implements OnInit {

  video: any;
  private editTitle: boolean = false;
  private updateVideoEvent = new EventEmitter();
  private deleteVideoEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  //When you edit the title will turn editTitle to false
  ngOnChanges(){
    this.editTitle = false;
  }

  //Set editTitle to true when you click on title
  onTitleClick(){
    this.editTitle = true;
  }

  //when you click on update button
  updateVideo(){
    this.updateVideoEvent.emit(this.video);
  }

  deleteVideo(){
    this.deleteVideoEvent.emit(this.video);
  }

}//end
