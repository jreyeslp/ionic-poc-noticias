import { Component, Input, OnInit } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
	selector: 'app-noticia',
	templateUrl: './noticia.component.html',
	styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

	@Input() noticia: Article = null;
	@Input() index: number = 0;
	@Input() enFavoritos: boolean;

	constructor(
		private iab: InAppBrowser,
		private actionSheetCtrl: ActionSheetController,
		private socialSharing: SocialSharing,
		private dataLocalSrv: DataLocalService) { }

	ngOnInit() { }

	abrirNoticia() {
		const browser = this.iab.create(this.noticia.url, '_system');
	}

	async lanzarMenu() {

		let guardarBorrarBtn;

		if (this.enFavoritos) {
			guardarBorrarBtn = {
				text: 'Borrar favorito',
				icon: 'trash',
				cssClass: 'action-dark',
				handler: () => {
					console.log('Unfavorite clicked');
					this.dataLocalSrv.borrarNoticia(this.noticia);
				}
			}
		} else {
			guardarBorrarBtn = {
				text: 'Favorito',
				icon: 'heart',
				cssClass: 'action-dark',
				handler: () => {
					console.log('Favorite clicked');
					this.dataLocalSrv.guardarNoticia(this.noticia);
				}
			}
		}

		const actionSheet = await this.actionSheetCtrl.create({
			buttons: [{
				text: 'Compartir',
				icon: 'share',
				cssClass: 'action-dark',
				handler: () => {
					console.log('Share clicked');
					this.socialSharing.share(
						this.noticia.title,
						this.noticia.source.name,
						'',
						this.noticia.url
					);
				}
			},
				guardarBorrarBtn,
			{
				text: 'Cancelar',
				icon: 'close',
				cssClass: 'action-dark',
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
				}
			}]
		});
		await actionSheet.present();
	}
}
