import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftsComponent } from './nfts.component';

describe('NftsComponent', () => {
  let component: NftsComponent;
  let fixture: ComponentFixture<NftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NftsComponent]
    });
    fixture = TestBed.createComponent(NftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
