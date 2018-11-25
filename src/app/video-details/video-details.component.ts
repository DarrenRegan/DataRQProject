import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css'],
  inputs: ['video']
})
export class VideoDetailsComponent implements OnInit {

  private editTitle: boolean = false;

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
}
