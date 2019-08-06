import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Data} from '../../_models/data';
import {DataService} from '../../_services/data.service';
import {Router} from '@angular/router';
import {AlertService} from '../../_services/alert.service';

@Component({
  selector: 'app-delete-data-dialog',
  templateUrl: './change-data-type-dialog-confirmation.html',
  styleUrls: ['./single.component.scss']
})
export class ChangeDataTypeDialogComponent {
  inProgress = false;

  constructor(
    public dialogRef: MatDialogRef<ChangeDataTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private dataService: DataService,
    private alertService: AlertService
  ) {
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  changeDataType() {
    this.inProgress = true;
    this.dataService.update(this.data).then(() => {
      this.dialogRef.close(true);
      this.alertService.success(`Type successfully changed`);
    }).finally(() => this.inProgress = false);
  }
}
