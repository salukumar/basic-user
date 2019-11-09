import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';


export interface User {
 
    gender: string;
    name: {
      title?: string;
      first: string;
      last?: string;
    };
    location: {
      street: string;
      city: string;
      state: string;
      zip: number;
    };
    email: string;
    username: string;
    password: string;
    salt?: string;
    md5?: string;
    sha1?: string;
    sha256?: string;
    registered?: number;
    dob: any;
    phone: string;
    cell: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
  };


@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  users: User[] = [];
  constructor(private httpClient: HttpClient) {
    const localData = localStorage.getItem('usersList');
    this.users = JSON.parse(localData);
  }



  fetchData(): Observable<User> {
    return this.httpClient
      .get<User[]>('https://randomuser.me/api/0.8/?results=20')
      .pipe(map((res: any) => res.results));
  }

  loadDatatoStorage(data: any) {

    const users: any =[];
    data.forEach((element: any) => { 
      users.push(element.user);
    });
    localStorage.setItem('usersList', JSON.stringify(users));
  }

  get userData(): User[] | null { 
        return this.users;
  }

  isUsersExist(): boolean { 
    return !!this.userData;
  }

  fetchDataFromStorage(): Observable<User[]> {
    return of(this.users);
  }

  searchData(term: string) { console.log(term)
      if(!term) { return of(this.users) }
      return of(this.users.filter( (user: any) => !user.name.first.indexOf(term)));
      
  }

  addUser(data: User) { console.log(this.userData);
    if(!this.users) this.users = [];
    this.users.push(data);
     localStorage.setItem('usersList', JSON.stringify(this.users));
 }
 
}
