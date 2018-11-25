import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import 'rxjs/rx';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _getUrl = "http://localhost:3000/api/videos";
  constructor(private _http: Http) { }

  //get method passing /api/videos, fetch all videos for response
  getVideos(){
    return this._http.get(this._getUrl)
      .pipe(map((response: Response) => response.json()));
  }
}
