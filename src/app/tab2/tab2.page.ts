import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Pessoa } from '../model/pessoaInterface';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pessoaForm: Pessoa = {} as Pessoa;
  pessoa: Pessoa;
  constructor(
    private native: NativeStorage,
    private pronpt: Platform
  ) { }

  ngOnInit() {
    if (localStorage.length != null || this.native.keys() != null) {
      if (this.pronpt.is('hybrid')) {
        this.native.getItem("pessoa").then(
          dado => {
            this.pessoaForm = dado;
          }
        );
      }
    } else {
      this.pessoaForm.email = localStorage.getItem("email");
      this.pessoaForm.first_name = localStorage.getItem("first_name");
      this.pessoaForm.last_name = localStorage.getItem("last_name");
      this.pessoaForm.gender = localStorage.getItem("gender");
      let aux3: any = localStorage.getItem("latitude");
      this.pessoaForm.latitude = aux3;
      aux3 = localStorage.getItem("longitude");
      this.pessoaForm.longitude = aux3;
    }
  }
  logForm(form) {

    if (this.pronpt.is('hybrid')) {
      this.pessoa = form.value;
      this.native.setItem("pessoa", { dado: this.pessoa }).then(
        () => console.log("Dados salvo no NativeStorage"),
        error => console.log("Error ao salvar no nativeStorage")
      )
    } else {
      this.pessoa = form.value;
      let aux = this.pessoa.first_name;
      localStorage.setItem("first_name", aux);
      aux = this.pessoa.last_name;
      localStorage.setItem("last_nome", aux);
      aux = this.pessoa.gender;
      localStorage.setItem("gender", aux);
      aux = this.pessoa.email;
      localStorage.setItem("email", aux);
      let aux2 = this.pessoa.latitude;
      localStorage.setItem("latitude", aux);
      aux2 = this.pessoa.longitude;
      localStorage.setItem("longitude", aux);

    }
  }
}
