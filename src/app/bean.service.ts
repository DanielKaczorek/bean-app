import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { Bean } from './Models/bean';
import { BeanOfTheDay } from './Models/beanOfTheDay';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BeanService {
  private apiURL = "https://localhost:44349/api";
  public progress: number;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBeans(): Observable<Bean[]> {
    return this.http.get<Bean[]>(`${this.apiURL}/beans`);
  }

  getBeansOfTheDay(): Observable<BeanOfTheDay[]> {
    return this.http.get<BeanOfTheDay[]>(`${this.apiURL}/beanoftheday/all`);
  }

  getBeanOfTheDay(): Observable<Bean> {
    return this.http.get<Bean>(`${this.apiURL}/beanoftheday`);
  }

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'https://localhost:44349/api/beans/uploadFile';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);

    // var upload = this.http.post(endpoint, formData, this.httpOptions);
    return this.http.post<any>(endpoint, formData, {reportProgress: true, observe: 'events'})
  }

  addBean(bean: Bean): Observable<Bean> {
    return this.http.post<Bean>(`${this.apiURL}/beans/addbean`, bean, this.httpOptions);
  }
  addBeanOfTheDay(bean: BeanOfTheDay): Observable<BeanOfTheDay> {
    return this.http.post<BeanOfTheDay>(`${this.apiURL}/beanoftheday/addbean`, bean, this.httpOptions);
  }
  deleteBeanOfTheDay(id: number): Observable<BeanOfTheDay> {
    return this.http.delete<BeanOfTheDay>(`${this.apiURL}/beanoftheday/removebean/${id}`, this.httpOptions);
  }

}
