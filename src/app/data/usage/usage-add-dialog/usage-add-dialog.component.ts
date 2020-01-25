import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsageService} from '../../../_services/usage.service';
import {Usage} from '../../../_models/usage';
import {SatPopover} from '@ncstate/sat-popover';
import {AlertService} from '../../../_services/alert.service';

@Component({
  selector: 'app-usage-add-dialog',
  templateUrl: './usage-add-dialog.component.html',
  styleUrls: ['./usage-add-dialog.component.scss']
})
export class UsageAddDialogComponent implements OnInit {
  @Input() dataName: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSuccessCallback(p: SatPopover) {
    return () => p.close();
  }
}
