import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCharlaComponent } from './tarjeta-charla.component';

describe('TarjetaCharlaComponent', () => {
  let component: TarjetaCharlaComponent;
  let fixture: ComponentFixture<TarjetaCharlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaCharlaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaCharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
