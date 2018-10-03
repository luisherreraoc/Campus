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
	private _subscriptions: Array<any>;
	private _courses: Array<any>;
	private index : any;

	public constructor ( private logger: Logger, private _cs: CoursesService, private loader: Loader, private renderer: Renderer2 ) 
	{ 
		logger.log('COURSES COMPONENT'); 
		this._subscriptions = new Array();
		this.index = 1;
	}

	public ngOnInit () : void
	{
		this.loader.show('test');

		this._subscriptions = [
            this.subscribeCourses()
        ];

        if ( this._cs.subject.getValue().length <= 0 )
        {
        	this._cs.load();
		}
	}

	public ngAfterViewInit () : void {
		setTimeout(()=>{
			this.renderer.setStyle(this._curso._results[0].nativeElement, 'display', 'block');
			this.loader.dismiss('test');
		}, 2000)
	}

	public changeSlide (n) : void {
		this.showMe(this.index += n);
	};

	public showMe (n) : void {
		let slides = this._curso._results;

		if (n > slides.length) {this.index = 1}    
		if (n < 1) {this.index = slides.length}
		for (let i = 0; i < slides.length; i++) {
			this.renderer.setStyle(slides[i].nativeElement, 'display', 'none');
		}
		this.renderer.setStyle(slides[this.index-1].nativeElement, 'display', 'block');
	}
	
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