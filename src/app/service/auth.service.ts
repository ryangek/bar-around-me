import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
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
    return this.http.get<Response>(
      this.baseUrl + url,
      this.isIEOrEdge ? { headers: this.headers } : headers
    );
  }

  post(url: string, data: any, headers: any) {
    return this.http.post<Response>(
      this.baseUrl + url,
      data,
      this.isIEOrEdge ? { headers: this.headers } : headers
    );
  }

  user(headers: any): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/user/info`,
      this.isIEOrEdge ? { headers: this.headers } : headers
    );
  }

  login(data: any, headers: any) {
    return this.http.post<Response>(
      `${this.baseUrl}/auth/login`,
      data,
      this.isIEOrEdge ? { headers: this.headers } : headers
    );
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }
}

interface Response {
  status: number;
  message: string;
  data: any;
  error: string;
}
