import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PessoaService } from './service/pessoa.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,

  ],
  declarations: [Tab1Page],
  providers: [
    Geolocation,
    PessoaService,
  ]
})
export class Tab1PageModule { }
