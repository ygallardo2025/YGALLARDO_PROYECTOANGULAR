import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,ReactiveFormsModule } from '@angular/forms';
import { Student } from '../shared/entities';

@Component({
  selector: 'app-add-form',
   standalone: true,
  templateUrl: './add-form.html',
  styleUrls: ['./add-form.scss'],
  imports: [ReactiveFormsModule]
})
export class AddFormComponent implements OnChanges {
  @Input() estudiante: Student | null = null;
  @Output() studentAdded  = new EventEmitter<Student>();

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      id: [null],
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      average: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['estudiante'] && this.estudiante) {
      this.studentForm.patchValue(this.estudiante);
    }
  }

  onSubmit() {
  if (this.studentForm.valid) {
    this.studentAdded .emit(this.studentForm.value);
    this.studentForm.reset();
    }
  }

  onReset() {
    this.studentForm.reset();
  }

  
}
