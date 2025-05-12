import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BirthdayService, Colleague } from '../services/birthday.service';

@Component({
  selector: 'app-birthday-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './birthday-form.component.html',
  styleUrls: ['./birthday-form.component.css'],
})
export class BirthdayFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(BirthdayService);

  form = this.fb.group({
    colleagues: this.fb.array([]),
  });

  get colleagues() {
    return this.form.get('colleagues') as FormArray;
  }

  ngOnInit() {
    this.svc.fetchAll().subscribe(
      (res) => {
        res.record.forEach((c) => this.addRow(c));
      },
      (_) => {
        this.addRow();
      }
    );
  }

  addRow(col?: Colleague) {
    this.colleagues.push(
      this.fb.group({
        name: [col?.name ?? '', Validators.required],
        surname: [col?.surname ?? '', Validators.required],
        birthdate: [col?.birthdate ?? '', Validators.required],
      })
    );
  }

  save() {
    if (this.form.invalid) return alert('All fields are required');
    this.svc.saveAll(this.colleagues.value).subscribe({
      next: () => alert('Saved to JSONBin!'),
      error: (err) => alert('Error: ' + err.message),
    });
  }
}
