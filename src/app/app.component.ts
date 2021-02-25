import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  courseGoals = [
    {title: 'Master Angular Styling', isActiveGoal: true },
    {title: 'Understand Angular Animation', isActiveGoal: false },
    {title: 'Master Angular Animation', isActiveGoal: false },
  ];
}
