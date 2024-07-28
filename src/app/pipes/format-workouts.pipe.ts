import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatWorkouts',
  standalone: true
})
export class FormatWorkoutsPipe implements PipeTransform {

  transform(workouts: any[]): string {
    // Create a map to count occurrences of each workout type
    const typeCountMap = new Map<string, number>();

    // Count each workout type
    workouts.forEach(workout => {
      const type = workout.type;
      if (typeCountMap.has(type)) {
        typeCountMap.set(type, typeCountMap.get(type)! + 1);
      } else {
        typeCountMap.set(type, 1);
      }
    });

    // Convert the map to a formatted string
    return Array.from(typeCountMap.entries())
      .map(([type, count]) => count > 1 ? `${type}(${count})` : type)
      .join(', ');
  }
  

}
