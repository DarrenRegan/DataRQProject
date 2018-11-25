import { Component, OnInit } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  //Array for 4 Videos to display to videolist.component.ts & bootstrap styling
  videos: Video[] = [
    {"_id": "1", "title": "Click Title 1", "url": "url 1", "description": "desc 1"},
    {"_id": "2", "title": "Click Title 2", "url": "url 2", "description": "desc 2"},
    {"_id": "3", "title": "Click Title 3", "url": "url 3", "description": "desc 3"},
    {"_id": "4", "title": "Click Title 4", "url": "url 4", "description": "desc 4"}
  ];

  selectedVideo: Video;

  constructor() { }

  ngOnInit() {
  }

  onSelectVideo(video:any){ //Take in video of type:any
    this.selectedVideo = video;//Capture and assign to video
    console.log(this.selectedVideo);
  }

}
