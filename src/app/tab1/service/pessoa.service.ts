import { Injectable } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoaInterface';
import { HttpClient } from '@angular/common/http';
import { Distancia } from 'src/app/model/distancia';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  link = "http://localhost:3000/pessoa";
  aux: any;
  listaPessoa: Pessoa[];
  listaPessoaDistancia: Distancia[]=[];
  orderAux: Distancia;
  constructor(private http: HttpClient) { }



  async encontrarPessoasProximas(latitude, longitude) {
    this.aux = await this.http.get(this.link).toPromise();
    this.listaPessoa = this.aux;
    this.listaPessoa.forEach(pessoa => {
      let raio = 6371;
      let dLat = (pessoa.latitude - latitude) * (Math.PI / 180);
      let dLon = (pessoa.longitude - longitude) * (Math.PI / 180);
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(latitude * (Math.PI / 180)) * Math.cos(pessoa.latitude * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      let d = raio * c; 
      let objPessoaDistancia = this.distancia(pessoa, d);
      let teste = this.listaPessoaDistancia.push(objPessoaDistancia);
    })
    for (let x = 0; x < (this.listaPessoaDistancia.length - 1); x++) {

      for (let y = (x + 1); y < this.listaPessoaDistancia.length; y++) {
        if (this.listaPessoaDistancia[x].distancia > this.listaPessoaDistancia[y].distancia) {
          this.orderAux = this.listaPessoaDistancia[x];
          this.listaPessoaDistancia[x] = this.listaPessoaDistancia[y];
          this.listaPessoaDistancia[y] = this.orderAux;
        }
      }
    }
    for (let x = this.listaPessoaDistancia.length; x >= 3; x--) {
      this.listaPessoaDistancia.splice(x, 1);
    }
    return this.listaPessoaDistancia;
  }
  distancia(pessoa, d) {
    let dist = {
      "pessoa": pessoa,
      "distancia": d
    }
    return dist;
  }
}