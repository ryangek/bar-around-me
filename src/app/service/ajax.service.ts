import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../../environments/environment';
import { ResponseObj } from '../models';

@Injectable()
export class AjaxService {
  public baseUrl: string = environment.baseUrl;
  public headers: HttpHeaders = new HttpHeaders();
  isIEOrEdge: boolean = false;
  constructor(
    private store: Store<any>,
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    private router: Router
  ) {
    this.headers = this.headers
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
      .set('If-Modified-Since', '0');
    this.isIEOrEdge = this.deviceService.getDeviceInfo().browser === 'IE';
  }

  get(url: string, headers: any) {
    return this.http.get<ResponseObj>(
      this.baseUrl + url,
      this.isIEOrEdge ? { headers: this.headers } : headers
    );
  }

  post(url: string, data: any, headers: any) {
    return this.http.post<ResponseObj>(
      this.baseUrl + url,
      data,
      this.isIEOrEdge ? { headers: this.headers } : headers
    );
  }
}
