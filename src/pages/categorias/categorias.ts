import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from "../../config/api.config";

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaService: CategoriaService) {
  }

/*  Exemplo de subscrição sem Arrow Function 
  ionViewDidLoad() {  Ao carregar a página...

    this.categoriaService.findAll()
    .subscribe(this.f);  ...irá disparar a função f ao receber o retorno do findAll do service
       (esse é o conceito de Observable do Angular, aguardando e reagindo no momento de uma resposta)
  }
  f(response){
    console.log(response);
  }
*/

//Código utilizando arrow function normalmente nas subscrições:

  ionViewDidLoad(){

    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
    error =>{}
    );

  }
}
