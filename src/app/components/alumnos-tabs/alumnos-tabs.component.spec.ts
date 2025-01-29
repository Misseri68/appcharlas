import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosTabsComponent } from './alumnos-tabs.component';

describe('AlumnosTabsComponent', () => {
  let component: AlumnosTabsComponent;
  let fixture: ComponentFixture<AlumnosTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlumnosTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
