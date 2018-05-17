import {Directive, EventEmitter, HostListener, Inject, Input } from '@angular/core';
//import { DOM } from 'angular2/src/core/dom/dom_adapter';
import {ElementRef} from '@angular/core';
import { Observable, BehaviorSubject, Subscription }           from "rxjs/Rx";

import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective 
{
    @HostListener('mousedown', ['$event']) onMousedown(event) { return this._mousedown.next(event); }

    @Input('draggable') set _enabled (state:boolean )
    { 
        this._element.nativeElement.style.position = state ? 'relative' : 'static';
    };

    private _switches: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _query: Observable<any> = this._switches.distinctUntilChanged().takeWhile(on => on);

    private _mousedrag: Observable<any>;
    private _mouseup: Observable<any>;
    private _mousedown: EventEmitter<any> = new EventEmitter();
    private _mousemove: Observable<any>;

    private _subscriptions: Array<Subscription>;

    public constructor ( private _element: ElementRef, @Inject(DOCUMENT) private _document: any )  
    {
        // --- Styling for drag -------------------------
        this._element.nativeElement.style.position = 'relative';
        this._element.nativeElement.style.cursor = 'pointer';

        this._mousemove = Observable.fromEvent( _document, 'mousemove');
        this._mouseup = Observable.fromEvent( _document, 'mouseup');

        this._mousedrag = this.mouseDrag();
    }

    public ngOnInit() : void
    {
        this._subscriptions = [    
            this.subscribeDragging()
        ];
    }

    public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => {
            sub.unsubscribe()
        });
        this._subscriptions.length = 0;
    }

    private mouseDrag () : Observable<any>
    {
        let el: HTMLElement = this._element.nativeElement;
        let pa: HTMLElement = el.parentElement; 
        
        return this._mousedown.map( (event:any) => 
        {
            console.log(this._enabled);
            event.preventDefault();
            let left: number = event.clientX + (pa.offsetLeft - Math.abs(el.offsetLeft));
            let top: number = event.clientY + (pa.offsetTop - Math.abs(el.offsetTop));
            return { left: left, top: top };
        })
        .flatMap( imageOffset => 
        { 
            return this._mousemove.map( (pos:any) => 
            {
                return { top:  pos.clientY - imageOffset.top, left: pos.clientX - imageOffset.left }
            })
            .takeUntil(this._mouseup);
        });

    }

    private subscribeDragging () : Subscription
    {
        return this._mousedrag
        .subscribe( (pos:any) => 
        {
            // Update position
            this._element.nativeElement.style.top  = pos.top  + 'px';
            this._element.nativeElement.style.left = pos.left + 'px';
        });
    }

}