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
  type: FormControl = new FormControl('', Validators.required);
  selectedType = '';
  value: FormControl = new FormControl('', Validators.required);
  valueValidators = {
    email: Validators.email
  };
  private nameValidators = Validators.compose([
    Validators.required,
    Validators.pattern('^[A-Za-z0-9 ]*$')
  ]);
  name: FormControl = new FormControl('', this.nameValidators);

  constructor(
    private dataService: DataService,
    private alertService: AlertService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.regenerateForm();
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
    this.dataService.add(data).then(() => {
      this.alertService.success('Data added successfully');
      this.router.navigate(['/data/' + data.name]);
    }).finally(() => this.inProgress = false);
  }

  onTypeChange() {
    // this.fillName();
    this.updateValueValidators();
  }

  private updateValueValidators() {
    const validators = [Validators.required];
    if (this.valueValidators[this.type.value]) {
      validators.push(this.valueValidators[this.type.value]);
    }
    this.value = new FormControl(this.value.value, Validators.compose(validators));
    this.regenerateForm();
  }

  private fillName() {
    if (this.type.value !== 'other' && !this.name.dirty) {
      this.name = new FormControl(this.type.value.replace(/^\w/, c => c.toUpperCase()), this.nameValidators);
      this.regenerateForm();
    }
  }

  private regenerateForm() {
    this.form = this.fb.group({
      type: this.type,
      name: this.name,
      value: this.value,
    });
  }

  private getFormattedName() {
    return this.name.value.trim().toLowerCase().replace(/\s+/g, '-');
  }
}
