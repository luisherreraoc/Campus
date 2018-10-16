import { Component, ViewChildren, ElementRef, ViewChild, 
	QueryList, Renderer2 }                    							from '@angular/core';
import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx"; 

import { Logger, Loader }												from 'mk';

import { CoursesService }												from '../../services/courses.service';			

@Component({
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss']
})
export class CoursesComponent
{
	@ViewChildren('curso') private _curso : any;
	@ViewChild('carousel') private _carousel : any;
	private _subscriptions: Array<any>;
	private _courses: Array<any>;
	public amount : any;
	private _first : boolean;
	private _last : boolean;
	private _cardsPerShow : any;
	private barWidth : any;
	private singleWidth : any;
	private showInicio : boolean;
	private _currentCourse : any;

	public constructor ( private logger: Logger, private _cs: CoursesService, private loader: Loader, private renderer: Renderer2 ) 
	{ 
		logger.log('COURSES COMPONENT'); 
		this._subscriptions = new Array();
		this.amount = 0;
		this._cardsPerShow = 2;
		this.barWidth = 0;
		this.showInicio = false;
	}

	public ngOnInit () : void
	{
		this._subscriptions = [
            this.subscribeCourses()
        ];

        if ( this._cs.subject.getValue().length <= 0 )
        {
        	this._cs.load();
		};

		this._first = true;
	}

	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => sub.unsubscribe());
        this._subscriptions.length = 0;
    }

	public plusSlide () : void {
		let cardWidth = this._curso._results[0].nativeElement.clientWidth;
		let totalCards = this._curso._results.length;
		let totalWidth = cardWidth * (totalCards - this._cardsPerShow);

		if (this.amount > -totalWidth) {
			this.amount -= cardWidth;
			this.barWidth += this.singleWidth;
			this._first = false;
		}

		if (this.amount === -totalWidth) {
			this._last = true;
		}
	};

	public minusSlide () : void {
		let cardWidth = this._curso._results[0].nativeElement.clientWidth;

		if (this.amount < 0) {
			this.amount += cardWidth;
			this.barWidth -= this.singleWidth
			this._last = false;
		}

		if (this.amount === 0) {
			this._first = true;
		} 
	};

    private subscribeCourses () : Subscription
    {
    	return this._cs.courses.subscribe( courses => {
			this._courses = courses;

			this.singleWidth = ( 100 / (this._courses.length) );
			this.barWidth =  this.singleWidth * this._cardsPerShow;
		});
	}
	
	private onInicio(init) {
		this.showInicio = true;
		this._currentCourse = init;
	}

	private onClose(action) {
		action ? this.showInicio = false : this.showInicio = true;
	}
}