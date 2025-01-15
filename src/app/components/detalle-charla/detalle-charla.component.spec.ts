import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCharlaComponent } from './detalle-charla.component';

describe('DetalleCharlaComponent', () => {
  let component: DetalleCharlaComponent;
  let fixture: ComponentFixture<DetalleCharlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCharlaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
