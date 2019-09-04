import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsageService} from '../../../_services/usage.service';
import {Usage} from '../../../_models/usage';
import {SatPopover} from '@ncstate/sat-popover';
import {AlertService} from '../../../_services/alert.service';

@Component({
  selector: 'app-usage-add',
  templateUrl: './usage-add.component.html',
  styleUrls: ['./usage-add.component.scss']
})
export class UsageAddComponent implements OnInit {
  @Input() dataName: string;

  urlPattern = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)';
  type: FormControl = new FormControl('', Validators.required);
  url: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)]);
  form: FormGroup;

  inProgress = false;

  constructor(
    fb: FormBuilder,
    private usageService: UsageService,
    private alertService: AlertService
  ) {
    this.form = fb.group({
      type: this.type,
      url: this.url
    });
  }

  ngOnInit() {
  }

  onSubmit(p: SatPopover) {
    this.usageService.add(this.dataName, {
      usageType: this.type.value,
      usageValue: this.getValue()
    } as Usage).then(() => {
      this.alertService.success('Usage was successfully added');
      p.close();
    });
  }

  private getValue(): string {
    let value;
    switch (this.type.value) {
      case 'url':
        value = this.url.value;
        break;
      default:
        throw new Error(`Unknown type ${this.type}`);
    }
    return value;
  }
}
