import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatWorkouts',
  standalone: true
})
export class FormatWorkoutsPipe implements PipeTransform {

  transform(workouts: any[]): string {
    return workouts.map(workout => `${workout.type}`).join(', ');
  }

}
