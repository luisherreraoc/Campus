import { Component, ViewChildren, ElementRef, ViewChild, 
	QueryList, Renderer2, HostListener }                    							from '@angular/core';
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
	@HostListener('window : resize') onresize() {
		this._currentWindowWidth = window.innerWidth;
	}
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

	private _currentWindowWidth : number;

	public constructor ( 
		private logger: Logger, 
		private _cs: CoursesService, 
		private _loader: Loader, 
		private renderer: Renderer2 ) 
	{ 
		logger.log('COURSES COMPONENT'); 
		this._subscriptions = new Array();
		this.amount = 0;
		this.barWidth = 0;
		this.showInicio = false;
	}

	public ngOnInit () : void
	{
		this._currentWindowWidth = window.innerWidth;
		this._subscriptions = [
            this.subscribeCourses()
        ];

        if ( this._cs.subject.getValue().length <= 0 )
        {
			setTimeout(()=>{
				//este loader se borra en COURSES SERVICE
				this._loader.show('courses');
			}, 100);

        	this._cs.load();
		};

		this._first = true;
	}

	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => sub.unsubscribe());
		this._subscriptions.length = 0;
	}
	
	private subscribeCourses () : Subscription
    {
    	return this._cs.courses.subscribe( courses => {
			this._courses = courses;
		});
	}
	
	public plusSlide () : void {
		// tamaño de una sola card y del div con todas
		let cardWidth = this._curso._results[0].nativeElement.clientWidth;
		let containerWidth = this._carousel.nativeElement.clientWidth;

		// total de cards en pantalla
		this._cardsPerShow = containerWidth / cardWidth;

		let totalCards = this._curso._results.length;

		// valor máximo q se aplicará a translateX
		let totalWidth = cardWidth * (totalCards - this._cardsPerShow);

		// % de la barra de progreso para una card respecto al total
		this.singleWidth = ( 100 / (this._courses.length) );

		// width de la barra de progeso al iniciarse el carousel
		if ( this.barWidth === 0 ) {
			this.barWidth =  this.singleWidth * this._cardsPerShow;	
		}
		
		// el valor de this.amount es negativo

		/* al dismunir el valor el carousel se esconde por la izquierda
		y vemos las cards q están por la derecha */

		// en cada click aumentamos el % de la barra de progreso
		if ( cardWidth < totalWidth + this.amount ) {
			this.amount -= cardWidth;
			this.barWidth += this.singleWidth;
			// cuando la cardWidth es mayor al valor de translate, se está en la primera card
			this._first = false;
		/* cuando el cardWith es mayor al valor de referencia pero this.amount es inferior
			al valor de totalWidth... */
		} else if ( totalWidth > -this.amount ) {
			// calculamos el valor restante para q this.amount sea igual a totalWidth
			let resto = totalWidth + this.amount;
			this.amount -= resto;
		} 
		
		// desactivar el botón de plus al llegar al final del carousel, marcar progreso al máx
		if ( totalWidth === -this.amount ) {
			this._last = true;
			this.barWidth = 100;
		}
	};

	public minusSlide () : void {
		let cardWidth = this._curso._results[0].nativeElement.clientWidth;

		if (-this.amount >= cardWidth) {
			this.amount += cardWidth;
			this.barWidth -= this.singleWidth
			this._last = false;
		} else {
			this.amount = 0;
		}

		if (this.amount === 0) {
			this._first = true;
		}
	};

	// ABRIR-CERRAR EL COMPONENTE DE ACTIVACION DE CURSO 

	private onInicio(init) {
		this.showInicio = true;
		this._currentCourse = init;
	}

	private onClose(action) {
		action ? this.showInicio = false : this.showInicio = true;
	}
}