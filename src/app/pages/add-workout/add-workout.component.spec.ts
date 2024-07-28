import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AddWorkoutComponent } from './add-workout.component';
import { WorkoutService } from '../../services/workout/workout.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let workoutService: WorkoutService;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, ToastModule, AddWorkoutComponent], // Import the standalone component
      providers: [
        { provide: WorkoutService, useValue: { submitWorkout: jasmine.createSpy('submitWorkout').and.returnValue(of(null)) } },
        MessageService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls and validators', () => {
    expect(component.applyForm).toBeTruthy(); // Ensure form is created
    const nameControl = component.applyForm.get('name');
    const typeControl = component.applyForm.get('type');
    const minutesControl = component.applyForm.get('minutes');

    expect(nameControl).toBeTruthy();
    expect(typeControl).toBeTruthy();
    expect(minutesControl).toBeTruthy();

    expect(nameControl?.hasValidator(Validators.required)).toBeTrue();
    expect(typeControl?.hasValidator(Validators.required)).toBeTrue();
    expect(minutesControl?.hasValidator(Validators.required)).toBeFalse(); // Ensure it's not required
  });

  it('should call submitWorkout when form is valid', () => {
    component.applyForm.setValue({ name: 'Running', type: 'Cardio', minutes: 30 });
    component.submitForm();

    expect(workoutService.submitWorkout).toHaveBeenCalledWith('Running', 'Cardio', 30);
  });

  it('should not call submitWorkout when form is invalid', () => {
    // Set the form to invalid state
    component.applyForm.setValue({ name: '', type: '', minutes: 0 });
    component.submitForm();

    // Verify that submitWorkout was not called
    expect(workoutService.submitWorkout).not.toHaveBeenCalled();
  });

  it('should call show method and set submited to true', fakeAsync(() => {
    component.show();
    expect(component.submited).toBeTrue();

    // Simulate time passage for `submited` state change
    tick(3000);
    expect(component.submited).toBeFalse();
  }));
});
