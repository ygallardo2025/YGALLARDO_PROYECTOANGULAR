import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFormComponent } from './add-form';

describe('AddForm', () => {
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
