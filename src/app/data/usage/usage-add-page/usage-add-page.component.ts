import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {isNotFoundError} from '../../../_helpers/http-response.helper';
import {DataService} from '../../../_services/data.service';
import {DataType} from '../../../_models/data-type';
import {DataTypeNotFound} from '../../../errors/ts-exceptions/DataTypeNotFound';

@Component({
  selector: 'app-usage-add-page',
  templateUrl: './usage-add-page.component.html',
  styleUrls: ['./usage-add-page.component.scss']
})
export class UsageAddPageComponent implements OnInit {
  private dataName: string;
  private notFound: boolean;
  private dataUsageValue: string;

  loading = true;
  usageType: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.usageType = this.extractDataTypeFrom();
    this.dataUsageValue = this.route.snapshot.queryParamMap.get(this.usageType);
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.dataName = params.get('data-name');
        return this.dataService
          .get(this.dataName)
          .catch(reason => {
            if (isNotFoundError(reason)) {
              this.notFound = true;
            }
          })
          .finally(() => this.loading = false);
      }
    );
  }

  backToData() {
    return () => this.router.navigate([`/data/${this.dataName}`]);
  }

  private extractDataTypeFrom(): string {
    for (const dataTypeKey in DataType) {
      if (this.route.snapshot.queryParamMap.has(dataTypeKey)) {
        return dataTypeKey;
      }
    }
    throw new DataTypeNotFound();
  }
}
