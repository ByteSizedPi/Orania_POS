import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { User } from '../models/types/Types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    new User('UysieVenter', 'UysieVenter'),
    new User('EldienKirsten', 'EldienKirsten'),
    new User('KobieVenter', 'KobieVenter'),
    new User('JohanVenter', 'JohanVenter'),
  ];

  private user: User | undefined;

  constructor(private router: Router) {}

  getUser = (login: User) =>
    !!this.users.find((test) => _.isEqual(login, test));

  getUsername = (u: string) =>
    !!this.users.find(({ username }) => u === username);

  getPassword = (u: User) => !this.getUsername(u.username) || !!this.getUser(u);

  setUser = (login: User): boolean => {
    if (!this.getUser(login)) return false;
    this.user = login;
    return true;
  };

  unsetUser = () => {
    this.user = undefined;
    this.router.navigate(['/login']);
  };

  userExists = () => !!this.user;
}
