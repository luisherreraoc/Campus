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
	private index : any;
	private showCarousel : boolean;
	private amount : any;

	public constructor ( private logger: Logger, private _cs: CoursesService, private loader: Loader, private renderer: Renderer2 ) 
	{ 
		logger.log('COURSES COMPONENT'); 
		this._subscriptions = new Array();
		this.index = 1;
		this.showCarousel = false;
		this.amount = 0;
	}

	public ngOnInit () : void
	{
		this._subscriptions = [
            this.subscribeCourses()
        ];

        if ( this._cs.subject.getValue().length <= 0 )
        {
        	this._cs.load();
		}
	}

	public plusSlide () : void {
		let cardWidth = this._curso._results[0].nativeElement.clientWidth;
		let totalCards = this._curso._results.length;
		let totalWidth = cardWidth * (totalCards - 2)

		if (this.amount > -totalWidth){
			this.amount -= cardWidth
		}
	};

	public minusSlide () : void {
		let cardWidth = this._curso._results[0].nativeElement.clientWidth;
		if (this.amount < 0) {
			this.amount += cardWidth
		}
	};

	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => sub.unsubscribe());
        this._subscriptions.length = 0;
    }

    private subscribeCourses () : Subscription
    {
    	return this._cs.courses.subscribe( courses => this._courses = courses);
    }
}