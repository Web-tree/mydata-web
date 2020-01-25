import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Usage} from '../../../_models/usage';
import {UsageService} from '../../../_services/usage.service';
import {AlertService} from '../../../_services/alert.service';
import {DataType} from '../../../_models/data-type';
import {WrongComponentUsage} from '../../../errors/ts-exceptions/WrongComponentUsage';

@Component({
  selector: 'app-usage-add-form',
  templateUrl: './usage-add-form.component.html',
  styleUrls: ['./usage-add-form.component.scss']
})
export class UsageAddFormComponent implements OnInit {
  @Input() dataName: string;
  @Input() callback: (dataName: string) => {};
  @Input() selectedDataType: DataType;
  @Input() dataUsageValue: string;

  urlPattern = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)';
  type: FormControl = new FormControl('', Validators.required);
  url: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)]);
  form: FormGroup;
  inProgress = false;

  constructor(
    fb: FormBuilder,
    private usageService: UsageService,
    private alertService: AlertService) {
    this.type = new FormControl('', Validators.required);
    this.form = fb.group({
      type: this.type,
      url: this.url
    });
  }

  ngOnInit() {
    if (this.selectedDataType) {
      this.type.setValue(this.selectedDataType);
      this.getValueControl().setValue(this.dataUsageValue);
    } else if (this.dataUsageValue) {
      throw new WrongComponentUsage('dataUsageValue can\'t be used without selectedDataType');
    }
  }

  onSubmit() {
    const usage: Usage = {
      usageType: this.type.value,
      usageValue: this.getValueControl().value
    };
    this.usageService.add(this.dataName, usage).then(() => {
      this.alertService.success(`Usage was successfully added. Type: ${this.type.value}. Value: ${this.getValueControl().value}`);
      this.callback(this.dataName);
    });
  }

  private getValueControl(): FormControl {
    switch (this.type.value) {
      case 'url':
        return this.url;
      default:
        throw new Error(`Unknown type ${this.type.value}`);
    }
  }
}

