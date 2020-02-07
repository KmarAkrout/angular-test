import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class IntructionsHelper<T> {
  private testFixture: ComponentFixture<T>;

  constructor(private fixture: ComponentFixture<T>) {
    this.testFixture = this.fixture;
  }

  count(cssSelector: string): number {
    const elements = this.fixture.debugElement
    .queryAll(By.css(cssSelector));
    return elements.length;
  }

  singleText(cssSelector: string): string {
    const h2Ele = this.fixture.debugElement.query(By.css(cssSelector));
    if (h2Ele) {
      return h2Ele.nativeElement.textContent;
    }
  }

  getInputValue(tag: string) {
    const h2Ele = this.fixture.debugElement.query(By.css(tag));
    if (h2Ele) {
      return h2Ele.nativeElement.value;
    }
  }

  findAll(tagName: string) {
    const h2Ele = this.fixture.debugElement
    .queryAll(By.css(tagName));
    if (h2Ele) {
      return h2Ele;
    }
  }

  clickEvent(tag: string) {
    let h2Ele: HTMLButtonElement;
    h2Ele = this.fixture.debugElement.query(By.css(tag)).nativeElement;
    if (h2Ele) {
      h2Ele.click();
    }
  }
}
