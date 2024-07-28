import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { WorkoutService } from '../../services/workout/workout.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css',
  providers: [MessageService],
})
export class AddWorkoutComponent {

  applyForm!: FormGroup;

  constructor(private workoutService: WorkoutService, private messageService: MessageService) { }

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

  show() {
    console.log('must show')
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
}
