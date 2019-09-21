import { HttpHeaders } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { ResponseObj } from '../../models';
import { AjaxService } from '../../service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  linkSub: any = null;
  headers: HttpHeaders = new HttpHeaders();
  constructor(
    private ajax: AjaxService,
    private store: Store<any>,
    private router: Router
  ) {
    this.headers = this.headers
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
      .set('If-Modified-Since', '0');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
