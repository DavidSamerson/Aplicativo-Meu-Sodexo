import { SessionProvider } from './../../providers/session/session';
import { ToastController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//PROVIDERS
import { SodexoRestProvider } from '../../providers/sodexo-rest/sodexo-rest';

//Páginas
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  N_doCartao: any;
  N_doCPF: any;
  usuario: Usuario;
  lembrarInf: boolean;
  erroCPF: string;
  erroCard: string;
  erroCPFBoolean: boolean ;
  erroCardBoolean: boolean ;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    protected sodexo: SodexoRestProvider,
    public loadingCtrl: LoadingController,
    private session: SessionProvider) {

    this.usuario = new Usuario();

    session.exist("usuario")
      .then((resultado: any) => {
        this.lembrarInf = true;
      })
      .catch(() => {
        this.lembrarInf = false;
      })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }

  delete(chip: number) {
    if(chip == 1){this.erroCardBoolean = false;}
    if(chip == 2){this.erroCPFBoolean = false;}
  }

  entrar() {

    if (this.N_doCartao.length == 16 && this.N_doCPF.length == 11) {

      this.erroCPFBoolean= false;
      this.erroCardBoolean= false;

      if (this.N_doCartao != null && this.N_doCartao != "" && this.N_doCPF != null && this.N_doCPF != "") {

        let loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `
          <div class="custom-spinner-container">
           <img src="assets/gifs/loadingIcon.gif">
           <br />
            <div class="custom-spinner-box">
              Espere! isso pode demorar um pouco...
              Dependendo do estado da sua internet.
            </div>
          </div>`,
        });

        loading.present();

        this.sodexo.loginPOSTapiSODEXO(this.N_doCartao, this.N_doCPF)
          .then((resultado: any) => {

            if (resultado != null) {

              this.session.createAPI(resultado);

              if (this.lembrarInf == true) {
                this.usuario.card = this.N_doCartao;
                this.usuario.cpf = this.N_doCPF;
                this.session.create(this.usuario);
              }

              loading.dismiss();

              this.navCtrl.setRoot(TabsPage);
            }

          })
          .catch(() => {

            loading.dismiss();

            this.toast.create({
              message: " Erro de login. Verifique seu CPF ou número do cartão! ",
              position: "botton",
              duration: 30000
            }).present();
          })

      }

    }
    else {
      if(this.N_doCPF.length < 11 || this.N_doCPF.length > 11){
        this.erroCPFBoolean = true;
        this.erroCPF = "Verifique seu CPF!";
        
      }
      if(this.N_doCartao.length < 16 || this.N_doCartao.length > 16){
        this.erroCardBoolean = true;
        this.erroCard = "Verifique seu N° do cartão!";
      }
      
    }

  }
}
export class Usuario {
  card: number;
  cpf: number;
}
