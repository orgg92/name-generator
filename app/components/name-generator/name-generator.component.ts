import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  DependenciesService,
  GeneratedName,
  Genre,
  NameLength,
  SubGenre,
  Vibe,
} from '../../services/dependencies.service';
import { NameGeneratorService } from './../../services/name-generator.service';
import { MatSelect, MatSelectTrigger } from '@angular/material';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.component.html',
  styleUrls: ['./name-generator.component.css'],
})
export class NameGeneratorComponent implements OnInit {

  // @ViewChild('lengthSliderContainer', { read: ElementRef }) lengthSliderContainer: any;

  public generatedName: GeneratedName;
  public invertWord: boolean = false;
  public nameLengthSetting: number = 3;

  public formGroup: FormGroup;
  public genres: Genre[] = [];
  public genreSelection: Genre[] = [];
  public genreSelected;

  public subgenres: SubGenre[] = [];
  public subgenreSelection: SubGenre[] = [];

  public vibes: Vibe[] = [];
  public selectedVibes: Vibe[] = [];

  public nameLengths: NameLength[] = [];

  public showLengthBubble: boolean = false;
  public showStyleBubble: boolean = false;

  public lastGeneratedName: GeneratedName;

  constructor(
    private nameGeneratorService: NameGeneratorService,
    private dependenciesService: DependenciesService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.genres = this.dependenciesService.returnGenres();
    this.subgenres = this.dependenciesService.returnSubGenres();
    this.vibes = this.dependenciesService.returnVibes();
    this.nameLengths = this.dependenciesService.returnLengths();

    this.buildFormGroup();
  }
  
  ngAfterViewInit() {
    
  }

  public get getGeneratedName(): string {
    return this.generatedName
      ? this.invertWord
        ? this.generatedName.secondWord + this.generatedName.firstWord
        : this.generatedName.firstWord + this.generatedName.secondWord
      : null;
  }

  public get getNameLengthSetting(): string {
    switch (this.nameLengthSetting) {
      case 1:
        return 'XS';
      case 2:
        return 'S';
      case 3:
        return 'M';
      case 4:
        return 'L';
      case 5:
        return 'XL';
    }
  }

  public clearStyles(): void {
    
  }

  public stylizeName(): void {}

  public setNameLength(event): void {
    this.nameLengthSetting = event.value;
    console.log(this.nameLengthSetting);
  }

  public updateNameLength(event): void {
    this.nameLengthSetting = event.value;
    console.log(this.nameLengthSetting);
    this.generateName();
  }

  public buildFormGroup(): void {
    this.formGroup = new FormGroup({
      genre: new FormControl(null),
      subGenre: new FormControl(null),
      vibe: new FormControl(null),
      lengthSelect: new FormControl(null),
      slider: new FormControl(null),
    });
  }

  public invertNames(): void {
    this.resetControls();
    this.invertWord = !this.invertWord;
  }

  public modifyGenreSelection(genre: Genre): void {
    if (this.genreSelection.find((x: Genre) => x.id == genre.id)) {
      this.genreSelection = this.genreSelection.filter(
        (x: Genre) => x.id != genre.id
      );
      this.subgenres = [];
    } else {
      this.genreSelection.push(genre);
      let _subgenres = this.dependenciesService.returnSubGenres();
      this.subgenres = _subgenres.filter((x) => x.genreId == genre.id);
      console.log(this.subgenres);
    }
    console.log(this.genreSelection);
  }

  public filterListOfSubgenres(): void {}

  public modifySubgenreSelection(subgenre: SubGenre): void {
    if (this.subgenreSelection.find((x: SubGenre) => x.id == subgenre.id)) {
      this.subgenreSelection = this.subgenreSelection.filter(
        (x: Genre) => x.id != subgenre.id
      );
    } else {
      this.genreSelection.push(subgenre);
    }
    console.log(this.genreSelection);
  }

  public modifyVibeSelection(vibe: Vibe): void {}

  public changeLength(): void {
    if (this.showStyleBubble) {
      this.resetControls();
    }
    this.showLengthBubble = !this.showLengthBubble;
    // console.log(this.lengthSliderContainer)
    // console.log(this.elRef.nativeElement.querySelector('#lengthSliderContainer'));  
  }

  public changeStyling(): void {
    if (this.showLengthBubble) {
      this.resetControls();
    }
    this.showStyleBubble = !this.showStyleBubble;
  }

  public resetControls(): void {
    this.showLengthBubble = false;
    this.showStyleBubble = false;
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  public generateName(): void {
    this.generatedName ? (this.lastGeneratedName = this.generatedName) : null;
    this.generatedName = this.nameGeneratorService.generateName(this.nameLengthSetting);
  }

  public previousName(): void {
    this.generatedName = this.lastGeneratedName;
  }

}
