import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomThemeService {
  private apiUrl = 'assets/colors.json';
  private themeUrl = 'assets/themes-data.json';

  constructor(private http: HttpClient) {}

  getColors(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getThemes(): Observable<any> {
    return this.http.get<any>(this.themeUrl);
  }
}
