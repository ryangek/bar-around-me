import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ModalOptions, ModalDirective } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { IAppState } from './store/store';
import { Load } from './models';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: 'app-component.html'
})
export class AppComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  loading: boolean = false;
  subscribes = {
    loadingSub: null
  };
  @ViewChild('confirm', { static: false }) public confirm: ModalDirective;
  @ViewChild('notify', { static: false }) public notify: ModalDirective;
  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private store: Store<IAppState>
  ) {
    this.subscribes.loadingSub = this.store
      .pipe(select('load'))
      .subscribe((load: Load) => {
        this.loading = load.loading;
      });
  }

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit(): void {
    const modalConfig: ModalOptions = {
      ignoreBackdropClick: true
    };
    this.notify.config = modalConfig;
    this.confirm.config = modalConfig;
  }

  ngAfterViewChecked() {
    if (false !== this.loading) {
      // check if it change, tell CD update view
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.subscribes.loadingSub.unsubscribe();
  }

  onConfirm() {}
}
