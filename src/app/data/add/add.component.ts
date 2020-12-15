import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../_services/data.service';
import {AlertService} from '../../_services/alert.service';
import {Router} from '@angular/router';
import {isNameExists} from '../../_validators/uniq-name.validator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  dataLimit: number = 100
  form: FormGroup;
  inProgress = false;
  type: FormControl = new FormControl('', Validators.required);
  selectedType = '';
  value: FormControl = new FormControl('', Validators.required);
  valueValidators = {
    email: Validators.email
  };
  name: FormControl;
  private nameValidators;

  constructor(
    private dataService: DataService,
    private alertService: AlertService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.nameValidators = Validators.compose([
      Validators.required,
      Validators.pattern('^[A-Za-z0-9 ]*$'),
    ]);
    this.name = new FormControl('', this.nameValidators, isNameExists(dataService));
    this.regenerateForm();
  }

  ngOnInit() {
    this.dataService.getDataCount().then(dataCount => {
      if(+dataCount > this.dataLimit)
    this.router.navigate(['/data/']);
    });
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
