import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalRecords: number = 0;
  @Input() itemsPerPage: number = 5;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
