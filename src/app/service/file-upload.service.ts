import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable()
export class FileUploadService {
  constructor(private httpClient: HttpClient) {}

  postFile(url: string, fileToUpload: File, headers: any): Observable<any> {
    const endpoint = baseUrl + url;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(endpoint, formData, headers);
  }

  postFiles(
    url: string,
    fileToUpload: Array<File> = [],
    headers: any
  ): Observable<any> {
    const endpoint = baseUrl + url;
    const formData: any = new FormData();
    const files: Array<File> = fileToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append('files[]', files[i], files[i]['name']);
    }
    return this.httpClient.post(endpoint, formData, headers);
  }
}
