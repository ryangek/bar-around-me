import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Load, Modal, Name, Response } from '../../models';
import { AjaxService } from '../../service';
import { loaded, loading, setuser, setname } from '../../store/actions';
import { initialName } from '../../store/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  isSubmit: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  loading: boolean = false;
  timer: boolean = false;
  subscribes = {
    loadingSub: null,
    modalSub: null,
    nameSub: null
  };
  modalObj: Modal = {
    status: '',
    success: false,
    text: '',
    visible: false
  };
  nameObj: Name = {
    name: '',
    url: ''
  };
  @ViewChild('noti', { static: false }) public noti: ModalDirective;
  constructor(
    private store: Store<any>,
    private router: Router,
    private ajax: AjaxService
  ) {
    this.subscribes.loadingSub = this.store
      .pipe(select('load'))
      .subscribe((load: Load) => {
        this.loading = load.loading;
        this.timer = load.timer;
      });
    this.subscribes.modalSub = this.store
      .pipe(select('modal'))
      .subscribe((modal: Modal) => {
        this.modalObj = modal;
        if (this.modalObj.visible) {
          if (this.nameObj) {
            this.noti.show();
          }
        }
      });
    this.subscribes.nameSub = this.store
      .pipe(select('name'))
      .subscribe((name: Name) => (this.nameObj = name));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(setname(initialName));
    this.subscribes.loadingSub.unsubscribe();
    this.subscribes.modalSub.unsubscribe();
    this.subscribes.nameSub.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const result = this.form.value;
      this.store.dispatch(loading());
      if (result.email) {
        result.email = btoa(result.email);
        result.password = btoa(result.password);
        this.ajax.login(result, this.ajax.headers).subscribe(
          (response: any) => {
            const res = response as Response;
            if (res.data) {
              localStorage.setItem('email', result.email);
              localStorage.setItem('password', result.password);
              this.store.dispatch(setuser(res.data.userInfo));
              this.store.dispatch(loaded());
              this.router.navigate(['/home']);
            } else {
              this.store.dispatch(loaded());
              this.ajax.controlResponse(res.status, '0:00', res.error);
            }
          },
          ({ error }) => {
            console.error(error);
            this.store.dispatch(loaded());
            this.ajax.controlResponse(error.status, '0:00', error.error);
          }
        );
      }
    }
  }
}
