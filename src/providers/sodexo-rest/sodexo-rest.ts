import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";


/*
--------------------------------------CRIADO POR: DAVID SAMERSON
 PROVIDER DE REST PARA API DO SODEXO - 
 POST  HTTP/1.1
 Host: sodexo.now.sh
 Content-Type: application/json
  {
    "card": "0000000000000000",
    "cpf": "00000000000"
  }
  -------------------------------------------------------------
*/
@Injectable()
export class SodexoRestProvider {

  protected API_URL = "https://sodexo.now.sh";
  protected corpoRequisicao : Requisicao;

  constructor(public http: Http, public toast: ToastController) {
    // console.log('Hello SodexoRestProvider Provider');
    this.corpoRequisicao = new Requisicao();
  }

  loginPOSTapiSODEXO (cartao: any, cpf : any) {

    // this.toast
    // .create({
    //   message: "C: " + cartao + "cpf: " + cpf,
    //   position: "botton",
    //   duration: 33300
    // })
    // .present();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    // headers.append("Access-Control-Allow-Credentials", "true");
    // headers.append("Access-Control-Allow-Origin", "*");

    let options = new RequestOptions({ headers: headers });

    var data = {
      "card": cartao,
      "cpf": cpf
    };
    
    // this.corpoRequisicao.card = cartao;
    // this.corpoRequisicao.cpf = cpf;

    return new Promise((resolve, reject) => {

      this.http.post(this.API_URL, data, options)
      .subscribe((result: any) => {

        resolve(result.json());

       //mensagem de boas vindas pra TESTES DE LOGIN
       this.toast
       .create({
         message: " Bem vindo ",
         position: "botton",
         duration: 3000
       })
       .present();

      },
      (error) => {

        //mensagem de Erro de Login
        // this.toast
        //  .create({
        //   message: " Erro de login. Verifique seu CPF ou número do cartão! ",
        //   position: "botton",
        //   duration: 30000
        // })
        // .present();

        reject(error.json());

      });

    });


  }

}

export class Requisicao {

  card: any;
  cpf: any;

}