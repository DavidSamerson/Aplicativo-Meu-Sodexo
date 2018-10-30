import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  resultados : any [] = [];
  cor: boolean;

  constructor(
    public navCtrl: NavController,
    public sessao: SessionProvider) {
      
      sessao.get('resultado')
      .then((result: any)=>{ 
        this.resultados = result.transactions; 
    })

  }

}
