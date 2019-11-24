import {Component, Input, OnInit} from '@angular/core';
import {Usage, UsageList} from '../../../_models/usage';
import {UsageService} from '../../../_services/usage.service';

@Component({
  selector: 'app-usage-list',
  templateUrl: './usage-list.component.html',
  styleUrls: ['./usage-list.component.scss']
})
export class UsageListComponent implements OnInit {
  @Input() dataName: string;
  usageList: UsageList = new UsageList();
  isComponentReady = false;

  constructor(private usageService: UsageService) {
  }

  ngOnInit() {
    this.usageService.list(this.dataName).then(usages => {
      this.usageList = usages;
      this.isComponentReady = true;
    });
  }

}
