import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosasPage } from './cosas.page';

describe('CosasPage', () => {
  let component: CosasPage;
  let fixture: ComponentFixture<CosasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
