import { Component } from '@angular/core';
import { PessoaService } from './service/pessoa.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Distancia } from '../model/distancia';
import { Pessoa } from '../model/pessoaInterface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  latitude: number;
  longitude: number;
  pessoaProxima: any;
  dist: Distancia[];
  listaPessoa: Pessoa[] = [];
  constructor(
    private pessoaService: PessoaService,
    private geo: Geolocation,
  ) { }
  async ngOnInit() {

    await this.geo.getCurrentPosition().then(
      (resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      }).catch((error) => {
        console.log("error ao pegar Posição")
      })
    this.pessoaProxima = await this.pessoaService.encontrarPessoasProximas(this.latitude, this.longitude);
    this.dist = this.pessoaProxima;
    this.dist.forEach(pessoa=>{
      this.listaPessoa.push(pessoa.pessoa);
    })
    
  }
}
