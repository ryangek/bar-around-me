import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { AjaxService } from '../../service';
import { loaded, loading, setmodal } from '../../store/actions';

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit, AfterViewInit {
  objectKeys = Object.keys;
  configs: any;
  @ViewChild('confirm', { static: false }) public confirm: ModalDirective;
  constructor(
    private ajax: AjaxService,
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(loading()); // loading
    this.ajax.configs(this.ajax.headers).subscribe(
      response => {
        if (response.data) {
          this.configs = response.data;
          setTimeout(() => {
            this.store.dispatch(loaded());
          }, 400);
        }
      },
      error => {
        this.configs = null;
      }
    );
  }

  ngAfterViewInit(): void {
    const modalConfig: ModalOptions = {
      ignoreBackdropClick: true
    };
    this.confirm.config = modalConfig;
  }

  edit(key: string) {
    this.router.navigate([`/configs/edit/${key}`]);
  }

  reset() {
    this.confirm.hide();
    this.store.dispatch(loading()); // loading
    this.ajax.configReset(this.ajax.headers).subscribe(
      response => {
        if (response.data) {
          this.configs = response.data;
          this.store.dispatch(
            setmodal({
              modal: {
                status: 'Successful',
                text: 'Saved configurations',
                visible: true,
                success: true,
                time: '0'
              }
            })
          );
          this.store.dispatch(loaded());
        }
      },
      error => {
        this.configs = null;
      }
    );
  }
}
