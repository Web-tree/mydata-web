import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-data-not-found',
  templateUrl: './data-not-found.component.html',
  styleUrls: ['./data-not-found.component.scss']
})
export class DataNotFoundComponent implements OnInit {
  @Input() dataName: string;

  constructor() {
  }

  ngOnInit() {
  }

}
