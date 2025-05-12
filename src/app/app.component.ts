import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BirthdayFormComponent } from './birthday-form/birthday-form.component';

@Component({
  selector: 'app-root',
  imports: [BirthdayFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'birthday-manager';
}
