import { UserService } from './../../shared/services/user.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/shared/models/types/Types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(public user: UserService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        this.usernameValidator.bind(this),
      ]),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator.bind(this),
      ]),
    });
  }

  usernameValidator = (control: AbstractControl): ValidationErrors | null =>
    this.user.getUsername(control.value)
      ? null
      : { error: 'gebruiker bestaan nie' };

  passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    return this.user.getPassword(new User(this.username().value, control.value))
      ? null
      : { error: 'verkeerde wagwoord' };
  };

  submit() {
    let user = new User(this.username().value, this.password().value);
    if (!this.user.getUser(user))
      return this.form.patchValue({
        password: '',
      });
    this.user.setUser(user);
    this.router.navigate(['/home']);
  }

  username = () => <FormControl>this.form.get('username');
  password = () => <FormControl>this.form.get('password');
}
