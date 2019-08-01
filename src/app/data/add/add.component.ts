import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../_services/data.service';
import {AlertService} from '../../_services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form: FormGroup;
  inProgress = false;

  constructor(
    private dataService: DataService,
    private alertService: AlertService,
    private router: Router,
    private location: Location,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  onSubmit() {
    this.inProgress = true;
    this.dataService.add(this.form.value).then(() => {
      this.alertService.success('Data added successfully');
      this.router.navigate(['/data/' + this.form.controls.name.value]);
    }).finally(() => this.inProgress = false);
  }
}
