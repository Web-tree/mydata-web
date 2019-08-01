import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DataService} from '../../_services/data.service';
import {Data} from '../../_models/data';
import {AlertService} from '../../_services/alert.service';
import {MatDialog} from '@angular/material';
import {DeleteDataDialogComponent} from './delete-data-dialog.component';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  data: Data;
  isEditValue = false;
  isUpdating = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private alertService: AlertService,
    public dialog: MatDialog
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

  updateValue(value) {
    this.isUpdating = true;
    this.isEditValue = false;
    this.data.value = value;
    this.dataService.update(this.data).then(() => {
      this.isUpdating = false;
      this.alertService.success('Value updated');
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteDataDialogComponent, {
      width: '250px',
      data: this.data
    });
  }
}
