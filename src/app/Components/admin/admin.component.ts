import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BeanService } from '../../bean.service';
import { Bean } from '../../Models/bean';
import { BeanOfTheDay } from '../../Models/beanOfTheDay';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  fileToUpload: File = null;
  imgUrl: string = null;
  beans: Bean[];
  beansOfTheDay: BeanOfTheDay[];
  toAddBean: Bean;
  constructor(private beanService: BeanService) { }

  ngOnInit(): void {
    this.loadAllBeans();
    this.loadAllBeansOfTheDay();
  }

  loadAllBeans(): void {
    this.beanService.getBeans().subscribe(beans => {
      this.beans = beans;
    },
    error => {
      
    })
  }

  loadAllBeansOfTheDay(): void {
    this.beanService.getBeansOfTheDay().subscribe(beans => {
      this.beansOfTheDay = beans;
    },
    error => {
      
    })
  }

  onFileChanged(event) {
    this.fileToUpload = event.target.files[0];

    this.beanService.postFile(this.fileToUpload).subscribe(event => {
      if (event.type === HttpEventType.Response)
      {
        this.imgUrl = event.body;
      }
    });
    
  }

  addBean(name: string,aroma: string,colour: string,beanCost: string, $event): void {
    $event.preventDefault();
    if (this.imgUrl == null)
      {
        alert("Please add an image first");
        return;
      }
      else {

        if (name == "" || aroma == "" || beanCost == "")
        {
          alert("Fill in all required fields first");
          return;
        }

        const cost = Number(beanCost);
        const image = this.imgUrl;

          this.beanService.addBean({ name,aroma,colour,image,cost } as Bean)
            .subscribe(bean => {
              this.beans.push(bean);
            });
      }
  }

  addBeanOfTheDay(beanIdString: string, paramDate: string, $event) : void {
    $event.preventDefault();
    
    if (paramDate === null || paramDate == "")
    {
      alert("Date cannot be empty");
      return;
    }
    if (paramDate.includes("dd") || paramDate.includes("mm") || paramDate.includes("yyyy"))
    {
      alert("Date format isnt correct");
      return;
    }
      let nowDate = new Date();
      var nowDateString = nowDate.toDateString();
      nowDate = new Date(nowDateString);

      const date = new Date(paramDate);
      const beanId = Number(beanIdString);

      console.log(date);
      console.log(nowDate);

      if (date < nowDate)
      {
        alert("Date cannot be in the past");
        return; 
      }

      var alreadyExists = false;
      for (let i = 0;this.beansOfTheDay.length > i;i++)
      {
        if (new Date(this.beansOfTheDay[i].date).toISOString() == date.toISOString())
        {
          alreadyExists = true;
          break;
        }
      }

      if (alreadyExists)
      {
        alert("There is already a bean of the day for that day.");
        return;
      }

      this.beanService.addBeanOfTheDay({ beanId,date } as BeanOfTheDay)
        .subscribe(bean => {
          this.beansOfTheDay.push(bean);
        });
  }

  delete(id: number): void {
    this.beansOfTheDay = this.beansOfTheDay.filter(h => h.id !== id);
    this.beanService.deleteBeanOfTheDay(id).subscribe();
  }

}
