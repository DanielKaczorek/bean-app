import { Component, OnInit } from '@angular/core';
import { Bean } from 'src/app/Models/bean';
import { BeanService } from '../../bean.service';

@Component({
  selector: 'app-bean',
  templateUrl: './bean.component.html',
  styleUrls: ['./bean.component.scss']
})
export class BeanComponent implements OnInit {
  bean: Bean;
  constructor(private beanService: BeanService) { }

  ngOnInit(): void {
    this.beanService.getBeanOfTheDay().subscribe(beanOfTheDay => {
      this.bean = beanOfTheDay;
    })
  }

}
