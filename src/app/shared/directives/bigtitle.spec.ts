import { Bigtitle } from './bigtitle';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Bigtitle', () => {
  it('should create an instance', () => {
    const elRefMock = { nativeElement: document.createElement('div') } as ElementRef;
    const rendererMock = { setStyle: () => {} } as unknown as Renderer2;
    const directive = new Bigtitle(elRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
