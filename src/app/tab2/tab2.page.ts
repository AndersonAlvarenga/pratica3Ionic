import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { Pessoa } from '../model/pessoaInterface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pessoaForm: Pessoa = {} as Pessoa;
  constructor(
    private native: NativeStorage,
    private pronpt: Platform
  ) { }

  ngOnInit() {
    if (this.pronpt.is('hybrid')) {
      this.pessoaForm.gender
    }
  }
  onSubmit() {

  }
}
