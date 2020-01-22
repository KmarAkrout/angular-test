import { ComponentFixture } from '@angular/core/testing';

export class IntructionsHelper<T> {
  private testFixture: ComponentFixture<T>;
  constructor(private fixture: ComponentFixture<T>) {
    this.testFixture = this.fixture;
  }
}
