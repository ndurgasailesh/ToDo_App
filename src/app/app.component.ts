import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { Role } from './models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskUI';
  user: User | null = null;
  showFiller = false;


  constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe(x =>{ 
        this.user = x
        
      });
  }

  get isAdmin() {
      return this.user && this.user.userRoles.includes(Role.Admin);
  }

  logout() {
      this.authenticationService.logout();
  }
}
