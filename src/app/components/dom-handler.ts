export class UDDomHandlere {
  public static absolutePosition(
    element: any,
    target: any,
    height: number = 0,
    width?: number,
    adjustOnSpace: boolean = true
  ) {
    if (!element || !target) {
      return;
    }
    const targetElm: any = target === 'body' ? document.body : target;
    const targetOuterHeight = target.offsetHeight;
    const targetOuterWidth = target.offsetWidth;
    const targetOffset = target.getBoundingClientRect();
    const topDim = targetOffset.top + targetOuterHeight + window.screenY;

    element.style.width = (width || targetOuterWidth) + 'px';
    element.style.top = topDim + 'px';
    element.style.left = targetOffset.left + 'px';

    if (this.isElmOverFlowingAfterPlacement(element, topDim) && adjustOnSpace) {
      element.style.top =
        topDim -
        targetOuterHeight -
        height -
        element.getBoundingClientRect().height +
        'px';
    }
  }

  public static isElmOverFlowingAfterPlacement(element: any, top: number) {
    if (!element || top == null) {
      return;
    }

    const viewportHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    const elementHeight = element.getBoundingClientRect().height;
    if (elementHeight + top > viewportHeight - 3) {
      return true;
    }
    return false;
  }

  /**
   * Dropdown open :
   *
   */

  public static isElement(obj: any) {
    return typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement
      : obj &&
          typeof obj === 'object' &&
          obj != null &&
          obj.nodeType === 1 &&
          typeof obj.nodeName === 'string';
  }

  public static appendChild(element: any, targetElm: any) {
    const target: any = targetElm === 'body' ? document.body : targetElm;
    if (this.isElement(target)) target.appendChild(element);
    else if (target.el && target.el.nativeElement)
      target.el.nativeElement.appendChild(element);
    else throw 'cannot Append' + target + 'to' + element;
  }
}
