System.register("app.component", ['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.user = false;
                    var component = this;
                    this.isLoggedIn().then(function (user) {
                        component.user = user;
                    });
                }
                AppComponent.prototype.isLoggedIn = function () {
                    return new Promise(function (resolve, reject) {
                        io.socket.get('/user', function (user) {
                            if (user.id) {
                                resolve(user);
                            }
                            else {
                                resolve(undefined);
                            }
                        });
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'scheduler-root',
                        template: "\n      <header class=\"sch-b_header\">\n          <div class=\"sch-b_logo\">\n            <a href=\"/\" class=\"sch-b_logo--link\"></a>\n          </div>\n          <div class=\"sch-b_menu\">\n          \n          </div>\n          <div class=\"sch-b_auth-block\">\n              <div class=\"sch-b_user-menu\">\n                <div *ngIf=\"user\" class=\"user-menu--user-link\">\n                  <a href=\"/logout\">Logout</a>\n                </div>\n                <div *ngIf=\"user\" class=\"user-menu--user-link\">\n                  <a href=\"/user\">{{user?.name}}</a>\n                </div>\n                  <div class=\"user-menu--user-link\">\n                    <a href=\"/signup\">Sign up</a>\n                 </div>\n                  <div class=\"user-menu--user-link\">\n                      <a href=\"/login\">Login</a>\n                 </div>\n              </div>\n          </div>\n        </header>\n        <main class=\"sch-b_main\">\n           \n        </main>\n        <footer class=\"sch-b_footer\">\n          <div class=\"sch-b_footer-copylefts\">\n      \n          </div>\n        </footer>\n    "
                    })
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
