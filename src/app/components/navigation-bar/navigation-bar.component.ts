import { Component } from '@angular/core';
import { ThemeSelectorService } from '../../services/theming/theming.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  constructor(protected darkThemeSelectorService: ThemeSelectorService) {}
}
