import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Data} from '../../_models/data';
import {DataService} from '../../_services/data.service';
import {Router} from '@angular/router';
import {AlertService} from '../../_services/alert.service';

@Component({
  selector: 'app-delete-data-dialog',
  templateUrl: './delete-dialog-confirmation.html',
  styleUrls: ['./single.component.scss']
})
export class DeleteDataDialogComponent {
  inProgress = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private dataService: DataService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  onCancel() {
    this.dialogRef.close();
  }

  deleteData() {
    this.inProgress = true;
    this.dataService.delete(this.data.name).then(() => {
      this.dialogRef.close();
      this.alertService.success(`Data ${this.data.name} successfully deleted`);
      this.router.navigate(['/data']);
    }).finally(() => this.inProgress = false);
  }
}
