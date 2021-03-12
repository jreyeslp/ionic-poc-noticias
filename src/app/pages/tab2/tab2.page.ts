import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSegment } from '@ionic/angular';

import { Article } from '../../interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

	@ViewChild(IonSegment, { static: true }) segment: IonSegment;

	categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
	noticias: Article[] = [];

	constructor(private _noticiasSrv: NoticiasService) { }

	ngOnInit() {
		this.segment.value = this.categorias[0];
		this.cargarNoticias(this.segment.value);
	}

	cambioCategoria(event) {
		this.noticias = [];
		this.cargarNoticias(event.detail.value);
	}

	cargarNoticias(categoria: string, event?) {
		this._noticiasSrv.getTopHeadlinesCategory(categoria).subscribe(resp => {
			console.log('noticias', resp);
			this.noticias.push(...resp.articles);

			if (event) {
				event.target.complete();
			}
		});
	}

	loadData(event) {
		this.cargarNoticias(this.segment.value, event);
	}

}
