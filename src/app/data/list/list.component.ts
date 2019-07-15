import {Component, OnInit} from '@angular/core';
import {Data} from '../../_models/data';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Data[];
  columns = ['name', 'value'];

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.dataService
      .getList()
      .then(data => this.list = data);
  }

}
