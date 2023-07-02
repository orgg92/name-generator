import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatSelectModule, MatOptionModule, MatButtonModule, MatSliderModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { FormsModule } from '@angular/forms';
import { NameGeneratorComponent } from './components/name-generator/name-generator.component';
import { NameGeneratorService } from './services/name-generator.service';
import { DependenciesService } from './services/dependencies.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    MatSliderModule
  ],
  declarations: [AppComponent, HelloComponent, NameGeneratorComponent],
  bootstrap: [AppComponent],
  providers: [NameGeneratorService, DependenciesService],
})
export class AppModule { }