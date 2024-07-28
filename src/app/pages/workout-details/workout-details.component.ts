import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { WorkoutService } from '../../services/workout/workout.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersNavigationComponent } from '../../components/users-navigation/users-navigation.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-details',
  standalone: true,
  imports: [ChartModule, UsersNavigationComponent],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.css',
})
export class WorkoutDetailsComponent  implements OnInit, OnDestroy {
  user: User | undefined;
  private routeSub: Subscription = new Subscription();
  public basicData: any;
  public basicOptions: any;
  private id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {

    this.routeSub = this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.updateChart();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private transformData(workouts: { type: string; minutes: number }[]): {
    labels: string[];
    data: number[];
  } {
    const workoutTotals: { [key: string]: number } = {};

    workouts.forEach((workout) => {
      if (workoutTotals[workout.type]) {
        workoutTotals[workout.type] += workout.minutes;
      } else {
        workoutTotals[workout.type] = workout.minutes;
      }
    });

    const labels = Object.keys(workoutTotals);
    const data = Object.values(workoutTotals);

    return { labels, data };
  }

  private updateChart(): void {
    this.user = this.workoutService.getWorkoutById(this.id);
    const workouts = this.user ? this.user.workouts : [];

    const { labels, data } = this.transformData(workouts);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color').trim();
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary').trim();
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border').trim();

    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Minutes by Workout Type',
          data: data,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}
