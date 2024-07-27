import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { WorkoutService } from '../../services/workout/workout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css'
})
export class AddWorkoutComponent {

  applyForm!: FormGroup;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.applyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      minutes: new FormControl(0)
    });
  }
  submitForm() {
    if (this.applyForm?.valid) {
      const { name, type, minutes } = this.applyForm.value;
      this.workoutService.submitWorkout(name, type, minutes);
    } else {
      return
    }
  }
}
