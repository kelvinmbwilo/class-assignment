import {animate, state, style, transition, trigger} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('void',  style({ transform: 'translateY(15%)', opacity: 0 })),
  transition(':enter',
    animate(
      '0.5s ease-in-out',
      style({ transform: 'translateY(0%)', opacity: 1 })
    ))
]);
