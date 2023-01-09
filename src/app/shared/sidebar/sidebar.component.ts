import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuarioActivo: string | undefined ='';
  userSubs!: Subscription;

  constructor( private auth: AuthService,
               private router: Router,
               private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
                      .pipe(
                        filter( ({user}) => user != null )
                      )
                      .subscribe( ({user}) => this.usuarioActivo =  user?.nombre );
  }

  ngOnDestroy() {
      this.userSubs.unsubscribe();
  }

  logout() {
    this.auth.logout(). then( () => {
      this.router.navigate(['/login']);
    })

  }

}
