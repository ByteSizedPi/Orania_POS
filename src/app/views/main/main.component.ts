import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private http: HttpClient) {}
  activeTab = 0;

  ngOnInit(): void {}

  tabChange = (event: number) => (this.activeTab = event);
}
