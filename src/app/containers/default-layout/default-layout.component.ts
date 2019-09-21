import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Load } from '../../models';
import { AuthService } from '../../service';
import { loading } from '../../store/actions';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = false;
  private changes: MutationObserver;
  public element: HTMLElement;
  email: string = '';
  constructor(
    private auth: AuthService,
    private store: Store<{ load: Load }>,
    @Inject(DOCUMENT) _document?: any
  ) {
    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = _document.body.classList.contains(
        'sidebar-minimized'
      );
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loading()); // loading
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    this.auth.logout();
  }
}
