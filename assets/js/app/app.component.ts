import {Component} from '@angular/core';

@Component({
    selector: 'scheduler-root',
    template: `
      <header class="sch-b_header">
          <div class="sch-b_logo">
            <a href="/" class="sch-b_logo--link"></a>
          </div>
          <div class="sch-b_menu">
          
          </div>
          <div class="sch-b_auth-block">
              <div class="sch-b_user-menu">
                <div *ngIf="user" class="user-menu--user-link">
                  <a href="/logout">Logout</a>
                </div>
                <div *ngIf="user" class="user-menu--user-link">
                  <a href="/user">{{user?.name}}</a>
                </div>
                  <div class="user-menu--user-link">
                    <a href="/signup">Sign up</a>
                 </div>
                  <div class="user-menu--user-link">
                      <a href="/login">Login</a>
                 </div>
              </div>
          </div>
        </header>
        <main class="sch-b_main">
           
        </main>
        <footer class="sch-b_footer">
          <div class="sch-b_footer-copylefts">
      
          </div>
        </footer>
    `
})

export class AppComponent {
  title: string;
  public isAuthenticated: boolean;
  user: any;

  constructor() {
    this.user = false;
    var component = this;

    this.isLoggedIn().then(function (user) {
      component.user = user;
    })
  }

  isLoggedIn() {
    return new Promise(function (resolve, reject) {
      io.socket.get('/user',function (user) {
        if (user.id) {
          resolve(user)
        } else {
          resolve(undefined)
        }
      })
    })
  }
}
