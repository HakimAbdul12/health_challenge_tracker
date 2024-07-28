import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../services/workout/workout.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './users-navigation.component.html',
  styleUrl: './users-navigation.component.css'
})
export class UsersNavigationComponent {
  users: User[] = [];
  currentUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.users = this.workoutService.getUserData();

    // Subscribe to route parameters to get the current user ID
    this.route.paramMap.subscribe(params => {
      this.currentUserId = +params.get('id')!;
    });
  }
}
