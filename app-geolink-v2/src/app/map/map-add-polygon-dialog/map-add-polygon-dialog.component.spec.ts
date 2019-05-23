import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAddPolygonDialogComponent } from './map-add-polygon-dialog.component';

describe('MapAddPolygonDialogComponent', () => {
  let component: MapAddPolygonDialogComponent;
  let fixture: ComponentFixture<MapAddPolygonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAddPolygonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAddPolygonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
