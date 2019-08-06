import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DataService} from '../../_services/data.service';
import {Data} from '../../_models/data';
import {AlertService} from '../../_services/alert.service';
import {MatDialog} from '@angular/material';
import {DeleteDataDialogComponent} from './delete-data-dialog.component';
import {ChangeDataTypeDialogComponent} from './change-data-type-dialog.component';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  data: Data;
  isEditValue = false;
  isEditType = false;
  isValueUpdating = false;
  isTypeUpdating = false;
  type = '';

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
          .then(data => {
            this.data = data;
            this.type = data.type;
          });
      }
    );
  }

  updateValue(value) {
    this.isValueUpdating = true;
    this.isEditValue = false;
    this.data.value = value;
    this.dataService.update(this.data).then(() => {
      this.isValueUpdating = false;
      this.alertService.success('Value updated');
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteDataDialogComponent, {
      width: '250px',
      data: this.data
    });
  }

  openChangeTypeDialog() {
    this.isTypeUpdating = true;
    const updateData = this.data;
    this.isEditType = false;
    this.data.type = this.type;
    this.dialog.open(ChangeDataTypeDialogComponent, {
      width: '250px',
      data: updateData
    }).afterClosed()
      .toPromise()
      .then(changed => {
        if (changed) {
          this.alertService.success('Type updated');
        } else {
          this.isEditType = true;
          this.type = 'other';
          this.data.type = 'other';
        }
      })
      .finally(() => this.isTypeUpdating = false);
  }

  updateType() {
    this.data.type = this.type;
    this.dataService.update(this.data).then(() => {
      this.isTypeUpdating = false;
      this.alertService.success('Type updated');
    });
  }
}
