import { Storage } from "@ionic/storage";

//pacote para transformar nossa classe em injetável
import { Injectable } from '@angular/core';


@Injectable()
export class SessionProvider {

    constructor(public storage: Storage){

    }
    // setando uma seção e passando o tipo de usuário
    create(usuario: Usuario) {
        this.storage.set('usuario', usuario);
    }
     // setando uma seção e passando o tipo de usuário
    createAPI(resultado: any) {
      this.storage.set('resultado', resultado);
    }

    get(string : string): Promise<any> {
        return this.storage.get(string);
    }

    // Quando deslogar deve remova do storage
    remove() {
        this.storage.remove('usuario');
    }

    exist(string : string) {
        return this.get(string).then(res => {
            // console.log('resultado >>> ', res);
            if(res) {
                // console.log('resultado IF');
                return true;
            } else {
                // console.log('resultado else');
                return false;
            }
        });
    }
}

export class Usuario {
  card: number;
  cpf: number;
}