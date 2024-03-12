import { Directive, ElementRef } from '@angular/core';
import { debounceTime, fromEvent, Observable, Subject, Subscriber, Subscription, takeUntil } from 'rxjs';

@Directive({
  selector: '[ds-carousel]'
})
export class CarouselDirective {

  constructor(private hostElement: ElementRef) { }

  pageSizeScroll: number = 0;

  prevBtn = document.createElement('span');
  nextBtn = document.createElement('span');
  carouselCtn = document.createElement('span');

  

  private prevSubscription: Subscription;
  private nextSubscription: Subscription;

  private unSubscriber: Subject<void> = new Subject;

  ngOnInit() {
    if (this.hostElement?.nativeElement) {
      Array.from(this.hostElement?.nativeElement.childNodes).forEach((node: HTMLElement | any) => {
        this.carouselCtn.append(node);
      });
      this.hostElement?.nativeElement.append(this.carouselCtn);
      this.hostElement?.nativeElement.classList.add(`ds-carousel-wrapper`);

      this.carouselCtn.classList.add(`ds-carousel-ctn`);
      let newDivPrev = document.createElement('span')
      let newDivNext = document.createElement('span')
      this.prevBtn.appendChild(newDivPrev);
      this.nextBtn.appendChild(newDivNext);

      this.prevBtn.classList.add('scroll-btn','prev-btn')
      this.nextBtn.classList.add('scroll-btn','next-btn')

      newDivPrev.classList.add(`scroll`, `left`, `arrow-left`, `px-icons`) ;
      newDivNext.classList.add(`scroll`, `right`, `arrow-right`, `px-icons`);


      // const targetPrev = document.('.prev-btn')
      // const newElement = document.createElement('div')
      // console.log("this.targetPrev", targetPrev)
      // if(targetPrev) {
      //   targetPrev.appendChild(newElement)
      // }


    }
  }

  ngAfterViewInit() {
    this.setWidth();
    fromEvent(this.carouselCtn, 'scroll').pipe(debounceTime(200), takeUntil(this.unSubscriber)).subscribe((e: any) => {
      this.canDisableNav();
    })

    resizableObservable(this.carouselCtn).pipe(debounceTime(200), takeUntil(this.unSubscriber)).subscribe((event) => {
      event.entries.forEach(entry => {
        this.setWidth()
      })
    })
  }

  ngOnDestroy() {
    this.unSubscriber.next();
    this.unSubscriber.complete();

  }

  setWidth() {
    const ctnWidth = this.carouselCtn?.clientWidth ?? 0;
    const ctnScrollWidth =  this.carouselCtn?.scrollWidth ?? 0;

    this.pageSizeScroll = ctnScrollWidth && ctnScrollWidth > ctnWidth ? ctnWidth : 0;
    this.carouselCtn.classList[this.pageSizeScroll > 0 ? 'add' : 'remove']('has-scroll');

    this.handleNavBtns(this.pageSizeScroll > 0);
    this.canDisableNav()
  }

  doScroll(direction: 'right' | 'left') {
    const scroollAmt = direction === 'right' ? this.carouselCtn.scrollLeft + this.pageSizeScroll : this.carouselCtn.scrollLeft - this.pageSizeScroll;
    this.carouselCtn.scrollTo({left: scroollAmt,behavior: 'smooth'});

    setTimeout(() => {
      this.canDisableNav()
    }, 350)
  }

  handleNavBtns(isAdd: boolean) {
    if(isAdd) {
      if(!this.nextSubscription && !this.prevSubscription) {
        this.hostElement?.nativeElement.append(this.prevBtn);
        this.hostElement?.nativeElement.append(this.nextBtn);

        this.prevSubscription = fromEvent(this.prevBtn, 'click').subscribe(() => {
          this.doScroll('left');
        });
        this.nextSubscription = fromEvent(this.nextBtn, 'click').subscribe(() => {
          this.doScroll('right');
        })
      }
      else {
        if(this.nextSubscription && this.prevSubscription) {
          this.prevSubscription?.unsubscribe();
          this.nextSubscription?.unsubscribe();
          this.nextSubscription = this.prevSubscription = undefined;

          this.prevBtn.remove();
          this.nextBtn.remove()
        }
      }
    }

  }

  canDisableNav() {
    this.prevBtn.classList[!this.carouselCtn.scrollLeft ? 'add' : 'remove']('disabled');
    this.nextBtn.classList[this.carouselCtn.scrollLeft + this.carouselCtn.clientWidth === this.carouselCtn.scrollWidth ? 'add' : 'remove']('disabled')
   };


}
export interface ResizeObserverOutput {
  entries: ResizeObserverEntry[];
  observer: ResizeObserver
}

export interface ResizeObserverOptions {
  box?: ResizeObserverBoxOptions
}

export function resizableObservable(target: Element, options?: ResizeObserverOptions) {
  return new Observable<ResizeObserverOutput>((subscriber) => {
    const resizableObservable = new ResizeObserver(
      (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
        return subscriber?.next({ entries, observer })
      }
    )

    try {
      resizableObservable?.observe(target, options)
    } catch (ex) {
      subscriber?.error(ex);
      resizableObservable?.disconnect();
    }

    return () => {
      return resizableObservable?.disconnect();
    }
  })
}