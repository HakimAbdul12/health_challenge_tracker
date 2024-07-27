import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout/workout.service';
import { FormatWorkoutsPipe } from '../../pipes/format-workouts.pipe';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormatWorkoutsPipe, PaginatorComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FormatWorkoutsPipe]
})
export class DashboardComponent implements OnInit {
  data: User[] = [];
  filteredData: User[] = [];
  pagedData: User[] = [];
  searchTerm: string = '';
  selectedType: string = 'All';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalRecords: number = 0;

  constructor(protected workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.data = this.workoutService.getUserData();
    this.filterData();
    this.updatePagedData();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.filterData();
    this.updatePagedData();
  }

  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedType = target.value;
    this.filterData();
    this.updatePagedData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagedData();
  }

  filterData(): void {
    this.filteredData = this.data.filter(user => {
      const matchesName = user.name.toLowerCase().includes(this.searchTerm);
      const matchesType = this.selectedType === 'All' || user.workouts.some(workout => workout.type === this.selectedType);
      return matchesName && matchesType;
    });
    this.totalRecords = this.filteredData.length; // Update total records after filtering
  }

  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedData = this.filteredData.slice(startIndex, endIndex);
  }

  getTotalMinutes(workouts: { type: string; minutes: number }[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }
}
