import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/User';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-profile-logo',
  templateUrl: './profile-logo.component.html',
  styleUrls: ['./profile-logo.component.scss']
})
export class ProfileLogoComponent implements OnInit {

  private user: User;
  private shortName: string;
  private loginUrl: string = environment.authUrl + '/login?returnUnion=mydata';
  private registerUrl: string = environment.authUrl + '/register?returnUnion=mydata';

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.getUser().then(user => {
        this.user = user;
        this.shortName = this.generateShortName(user);
      });
    }
  }

  private generateShortName(user: User): string {
    return user.username.slice(0, 2).toUpperCase();
  }

}
