import { Article } from '../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class DataLocalService {

	noticias: Article[] = [];

	constructor(
		private storage: Storage,
		private toastController: ToastController) {
		this.cargarFavoritos();
	}

	guardarNoticia(noticia: Article) {

		const existe = this.noticias.find(noti => noti.title === noticia.title);

		if (!existe) {
			this.noticias.unshift(noticia);
			this.storage.set('favoritos', this.noticias);
			this.presentToast(true);
		}
	}

	borrarNoticia(noticia: Article) {
		this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
		this.storage.set('favoritos', this.noticias);
		this.presentToast(false);
	}

	async cargarFavoritos() {
		const favoritos = await this.storage.get('favoritos');
		if (favoritos) {
			this.noticias = favoritos;
		}
	}

	async presentToast(fav: boolean) {
		const message = fav ? 'La noticia se ha guardado en favoritos' : 'La noticia se ha eliminado de tus favoritos';

		const toast = await this.toastController.create({
			message: message,
			duration: 1500
		});
		await toast.present();
	}
}
