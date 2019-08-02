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

  name: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern('^[A-Za-z0-9 ]*$')
  ]));

  constructor(
    private dataService: DataService,
    private alertService: AlertService,
    private router: Router,
    private location: Location,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      name: this.name,
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
    const data = this.form.value;
    data.name = this.getFormattedName();
    console.log(data);
    this.dataService.add(data).then(() => {
      this.alertService.success('Data added successfully');
      this.router.navigate(['/data/' + data.name]);
    }).finally(() => this.inProgress = false);
  }

  private getFormattedName() {
    return this.form.controls.name.value.trim().toLowerCase().replace(/\s+/g, '-');
  }
}
