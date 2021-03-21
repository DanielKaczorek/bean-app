import { Component, OnInit } from '@angular/core';
import { Bean } from '../../Models/bean';
import { BeanService } from '../../bean.service';

@Component({
  selector: 'app-bean-of-the-day',
  templateUrl: './bean-of-the-day.component.html',
  styleUrls: ['./bean-of-the-day.component.scss']
})
export class BeanOfTheDayComponent implements OnInit {  
  bean:Bean;

  constructor(private beanService: BeanService) { }

  //load bean of the day
  ngOnInit(): void {
    this.beanService.getBeanOfTheDay().subscribe(beanOfTheDay => {
      this.bean = beanOfTheDay;
    },
    error => {
      
    })
  }

}
