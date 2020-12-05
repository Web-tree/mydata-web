import {Component, OnInit} from '@angular/core';
import {Data} from '../../_models/data';
import {DataService} from '../../_services/data.service';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Data[];
  columns = [
    'name',
    'type',
    'value'
  ];

  loggedIn;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.dataService
        .getList()
        .then(data => this.list = data);
    }
  }

}
