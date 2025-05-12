import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BirthdayService } from '../services/birthday.service';

@Component({
  selector: 'app-birthday-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './birthday-form.component.html',
  styleUrls: ['./birthday-form.component.css'],
})
export class BirthdayFormComponent {
  private fb = inject(FormBuilder);
  private svc = inject(BirthdayService);

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    birthdate: [null, Validators.required], // will hold a Date
  });

  submitting = false;

  onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true;

    const name = this.form.value.name!;
    const surname = this.form.value.surname!;
    const birthdate = this.form.value.birthdate! as Date;
    const isoDate = birthdate.toISOString().slice(0, 10);

    this.svc.addBirthday({ name, surname, birthdate: isoDate }).subscribe({
      next: () => {
        alert('Birthday added!');
        this.form.reset();
        this.submitting = false;
      },
      error: (err) => {
        alert('Error: ' + err.message);
        this.submitting = false;
      },
    });
  }
}
