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
  //Arary of videos which will be inputed by user passed to video-list and displayed
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

  //Calls update Video method of video.service.ts, gets back values of new video assigns to resUpdatedVideo
  onUpdateVideoEvent(video: any){
    this._videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  }

  //Hides forms until you press button
  newVideo(){
    this.hideVideo = false;
  }

  //ArraySize = list of videos, call deleteVideo method to delete video and send back a response of deleted video
  //Subsricbe to that response, with array iterate all videos until you find right ID for video
  onDeleteVideoEvent(video: any){
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
      .subscribe(resDeletedVideo => {
        for(let i=0; i < videoArray.length; i++)
        {
          if(videoArray[i]._id === video._id)
          {
            videoArray.splice(i,1); //3-5 Videos remove 1 from array and update ui and list
          }
        }
      });
      this.selectedVideo = null; //set null after delete, screen won't show old video details
  };


}
