import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers: [VideoService]
})
export class PlaylistComponent implements OnInit {

 
  //Array for 4 Videos to display to videolist.component.ts & bootstrap styling
  videos: Array<Video>;

  selectedVideo: Video;
  private hideVideo: boolean = true;

  //Imported VideoService, using injection to get an instance of _videoService
  //Call getVideos() method Subscribe to fetch all the videos and assign to Video array above
  //Dependacy Injection
  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
      .subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo(video:any){ //Take in video of type:any
    this.selectedVideo = video;//Capture and assign to video
    this.hideVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video: Video){
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo);
        this.hideVideo = true;
        this.selectedVideo = resNewVideo;
      })
  }

  //Hides forms until you press button
  newVideo(){
    this.hideVideo = false;
  }
}
