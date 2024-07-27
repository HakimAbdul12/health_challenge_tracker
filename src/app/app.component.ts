import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WorkoutService } from './services/workout/workout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, NavigationBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'health_challenge_tracker';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.initializeUserData();
  }
}
