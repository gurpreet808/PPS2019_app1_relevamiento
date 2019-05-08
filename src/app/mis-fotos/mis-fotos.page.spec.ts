import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisFotosPage } from './mis-fotos.page';

describe('MisFotosPage', () => {
  let component: MisFotosPage;
  let fixture: ComponentFixture<MisFotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisFotosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisFotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
