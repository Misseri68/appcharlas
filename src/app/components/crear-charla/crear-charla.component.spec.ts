import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCharlaComponent } from './crear-charla.component';

describe('CrearCharlaComponent', () => {
  let component: CrearCharlaComponent;
  let fixture: ComponentFixture<CrearCharlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearCharlaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
