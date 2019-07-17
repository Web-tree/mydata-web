import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, ParamMap} from '@angular/router';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  data: Data;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        return this.dataService
          .get(params.get('name'))
          .then(data => this.data = data);
      }
    );
  }

}
