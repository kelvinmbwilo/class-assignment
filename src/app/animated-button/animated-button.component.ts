import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-animated-button',
  templateUrl: './animated-button.component.html',
  styleUrls: ['./animated-button.component.scss'],
  animations: [
    trigger('buttonState', [
      state('normal', style({
        opacity: 1
      })),
      state('hidden', style({
        opacity: 0.0
      })),
      transition('normal <=> hidden', [
        animate('1000ms ease-in-out')
      ])
    ]),
    trigger('divState', [
      state('normal', style({
        opacity: 1,
        padding: '0 16px',
        minWidth: '264px',
        minHeight: '264px',
        border: '1px solid red',
      })),
      state('button', style({
        opacity: 1,
        padding: '0 16px',
        minWidth: '64px',
        boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        border: '1px solid red',
      })),
      state('hidden', style({
        opacity: 1.0,
        padding: '0',
        minWidth: '0',
        minHeight: '0',
        border: '0 solid red',
      })),
      transition('normal <=> hidden', [
        animate('1000ms ease-in-out')
      ])
    ]),
  ]
})
export class AnimatedButtonComponent implements OnInit {
  title = 'animated-save';
  someState = 'normal';
  someDivState = 'button';

  constructor() { }

  ngOnInit(): void {
  }

  makeState(): void {
    this.someState = this.someState === 'normal' ? 'hidden' : 'normal';
    this.someDivState = this.someState === 'normal' ? 'hidden' : 'normal';
  }
}
