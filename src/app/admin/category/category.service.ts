import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories:{categoryName: string} [] =
  [
    // {categoryName: "hook"},
    // {categoryName: "fishing rod"},
    // {categoryName: "fishing net"},
    // {categoryName: "bait"},
    // {categoryName: "rubber boat"},
    // {categoryName: "rainboots"},
  ]

  url: string = 'https://webshio-oliver-default-rtdb.europe-west1.firebasedatabase.app/'

  constructor(private http: HttpClient) { }

  saveCategoriesToDatabase(): Observable<Object> {
    return this.http.put(this.url + "categories.json", this.categories)
  }

  addCategoryToDatabase(catergoryObject: {categoryName: string}): Observable<Object> {
    return this.http.post(this.url + "category.json", catergoryObject);
  }

  getCategoriesFromDatabase():Observable<{categoryName: string}[]> {
    return this.http.get<{categoryName: string}[]>(this.url + "category.json");
  }

  deleteFromDatabase(categories: {id: string, categoryName: string}[]) {
    return this.http.put(this.url + "categories.json", categories)
  }
}
