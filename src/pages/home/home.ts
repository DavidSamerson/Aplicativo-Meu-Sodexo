import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  estatistica : any [] = [];
  transactions : any [] = [];
  capital: string;
  testeDia: any;
  testeMes: any;
  testeAno: any;
  testeHoras: any;
  testeMinutos: any;
  resultTudo: any;

  constructor(public navCtrl: NavController,
              protected session: SessionProvider) {

    this.session.get('resultado')
    .then((result : any) => {
      this.estatistica = result;
      this.transactions = result.transactions;
    });

    var data = new Date();
    this.testeDia = data.getDate();
    this.testeMes = data.getMonth() + 1;
     if (this.testeMes < 10) {
      this.testeMes = "0" + this.testeMes;
    }

    this.testeAno = data.getFullYear();

    this.testeHoras = new Date().getHours();
    if (this.testeHoras < 10) {
      this.testeHoras = "0" + this.testeHoras;
    }

    this.testeMinutos = new Date().getMinutes();
    if (this.testeMinutos < 10) {
      this.testeMinutos = "0" + this.testeMinutos;
    }
    this.resultTudo = this.testeDia +"/"+this.testeMes+"/"+this.testeAno ;
    
  }

}
