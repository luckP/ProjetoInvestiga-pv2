import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEditPolygonDialogComponent } from './map-edit-polygon-dialog.component';

describe('MapEditPolygonDialogComponent', () => {
  let component: MapEditPolygonDialogComponent;
  let fixture: ComponentFixture<MapEditPolygonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapEditPolygonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEditPolygonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
