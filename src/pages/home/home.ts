import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    //Desabilita o menu antes de entrar na página home
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    //Reabilita o menu ao sair da página home
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
   
    //Fazendo o app aproveitar o usuário logado na tela inicial
    this.auth.refreshToken()
      .subscribe(response =>{
        this.auth.successfulLogin(response.headers.get('Authorization')); //Armazena o novo token
        this.navCtrl.setRoot("CategoriasPage"); //Direciona para a página de categorias, pois o login ainda é válido
      },
      error => {});  

  }

  login(){

    this.auth.authenticate(this.creds)
      .subscribe(response =>{
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("CategoriasPage");
      },
      error => {});  

  }

  signup(){
    this.navCtrl.push("SignupPage");
  }

}
