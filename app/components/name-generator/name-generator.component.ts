import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DependenciesService, GeneratedName, Genre, NameLength, SubGenre, Vibe } from '../../services/dependencies.service';
import { NameGeneratorService } from './../../services/name-generator.service';
import { MatSelect, MatSelectTrigger } from '@angular/material';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.component.html',
  styleUrls: ['./name-generator.component.css'],
})
export class NameGeneratorComponent implements OnInit {

  public generatedName: GeneratedName;
  public invertWord: boolean = false;
  public nameLengthSetting: number = 0;

  public formGroup: FormGroup;
  public genres: Genre[] = [];
  public genreSelection: Genre[] = [];
  public genreSelected;

  public subgenres: SubGenre [] = [];
  public subgenreSelection: SubGenre[] = [];

  public vibes: Vibe[] = [];
  public selectedVibes: Vibe[] = [];

  public nameLengths: NameLength[] = [];

  constructor(
    private nameGeneratorService: NameGeneratorService,
    private dependenciesService: DependenciesService
  ) {}

  ngOnInit() {
    this.genres = this.dependenciesService.returnGenres();
    this.subgenres = this.dependenciesService.returnSubGenres();
    this.vibes = this.dependenciesService.returnVibes();
    this.nameLengths = this.dependenciesService.returnLengths();

    this.buildFormGroup();


  }

  public get getGeneratedName(): string {
    // if no generatedName, error is thrown on launch
      return this.generatedName ? (this.invertWord ? this.generatedName.secondWord + this.generatedName.firstWord : this.generatedName.firstWord + this.generatedName.secondWord) : null


  }


  public updateNameLength(event): void {
    this.nameLengthSetting = event.value;
    console.log(this.nameLengthSetting);
  }

  public buildFormGroup(): void {

    this.formGroup = new FormGroup ({
      genre: new FormControl(null),
      subGenre: new FormControl(null),
      vibe: new FormControl(null),
      lengthSelect: new FormControl(null),
      slider: new FormControl(null)
    })
  }

  public invertNames(): void {
    this.invertWord = !this.invertWord;
  }

  public modifyGenreSelection(genre: Genre): void {
    if (this.genreSelection.find((x: Genre) => x.id == genre.id)){
      this.genreSelection = this.genreSelection.filter((x: Genre) => x.id != genre.id);
      this.subgenres = [];
    } else {
      this.genreSelection.push(genre);
      let _subgenres =  this.dependenciesService.returnSubGenres(); 
      this.subgenres = _subgenres.filter(x => x.genreId == genre.id);
      console.log(this.subgenres);

    }
    console.log(this.genreSelection)
  }

  public filterListOfSubgenres(): void {

  }

  public modifySubgenreSelection(subgenre: SubGenre): void {
    if (this.subgenreSelection.find((x: SubGenre) => x.id == subgenre.id)){
      this.subgenreSelection = this.subgenreSelection.filter((x: Genre) => x.id != subgenre.id);
    } else {
      this.genreSelection.push(subgenre);
    }
    console.log(this.genreSelection)
  }

  public modifyVibeSelection(vibe: Vibe): void {

  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  // array is selectedYears
  selectAll(select: MatSelect, values, array) {
    select.value = values;
    array = values;
    console.log(this.genreSelection); // selectedYears is still undefined
  }

  deselectAll(select: MatSelect) {
    this.genreSelection = [];
    select.value = [];
  }

  public generateName(): void {

   this.generatedName = this.nameGeneratorService.generateName();
  }
}
