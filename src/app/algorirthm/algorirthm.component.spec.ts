import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorirthmComponent } from './algorirthm.component';

describe('AlgorirthmComponent', () => {
  let component: AlgorirthmComponent;
  let fixture: ComponentFixture<AlgorirthmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorirthmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorirthmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
