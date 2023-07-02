import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DependenciesService {
  private genres: Genre[] = [];
  private vibes: Vibe[] = [];
  private subGenres: SubGenre[] = [];
  private words: Word[] = [];
  private nameLengths: NameLength [] = [];

  constructor() {
    // make genres
    this.createGenres();
    let testId = this.genres.find(x => x.description == 'Electronic/Dance');
    console.log("debugging genre:", testId);

    // make list of vibes

    this.createVibes();

    // make list of subgenres linked to genres & vibes

    this.createSubGenres(testId.id);

    console.log("subgenres", this.subGenres);

    this.createLengths();

    console.log(this.nameLengths);

    // make list of words associated to vibe

    // filter non relevant

    // select a prefix based off genre

    // select first word based off vibe & syvgebre

    // select second word based off vibe & subgenre
  }

  public returnGenres(): Genre[] {
    return this.genres;
  }

  public returnSubGenres(): SubGenre[] {
    return this.subGenres;
  }

  public returnVibes(): Vibe[] {
    return this.vibes;
  }

  public returnLengths(): NameLength[] { 
    return this.nameLengths;
  }

  public createLengths(): void {
    for (let i = 1; i < 6; i++) {
      this.nameLengths.push({
        id: uuidv4(),
        description: i.toString(),
        length: i
      })
    }
  }

  public createGenres(): void {
    let _genres = ['Electronic/Dance', 'Rock', 'Metal', 'Hip-Hop', 'Pop'];

    _genres.forEach((x) => this.genres.push({ description: x, id: uuidv4() }));

    console.log("this.genres", this.genres);
  }

  public createSubGenres(id: string): void {
    let subGenres: any[] = [];

    let genre = this.genres.find((x) => x.id == id);

    if (genre.description == 'Electronic/Dance') {
      subGenres = [
        'House',
        'Deep House',
        'Techno',
        'Trance',
        'Dubstep',
        'Bass',
        'Garage',
        'EDM',
        'Breakbeat',
        'Bassline',
        'Drum & Bass'
      ];
    }

    let _subGenres: SubGenre[] = [];

    let genreId = genre.id;

    subGenres.forEach((x) =>
      _subGenres.push({
        description: x,
        genreId: genreId,
        id: uuidv4(),
        vibe: null,
      })
    );

    this.subGenres = _subGenres;
  }

  public createVibes(): void {
    let _vibes = ['Light', 'Dark', 'Tense', 'Uplifting', 'Euphoric', 'Bouncy', 'Rolling', 'Abstract', 'Groove', 'Experimental', 'Stepping', 'Funky', 'Heavy', 'Breakdown', 'Minimal', 'Ragga', 'Jungle']

    _vibes.forEach(x => this.vibes.push({description: x, id: uuidv4()}))
    console.log("vibes: ", this.vibes)
  }

  public createWords(): void {
    //let 
  }

  public createNames(): void {

  }
}

export class Genre {
  id: string = uuidv4();
  description: string = '';
}

export class SubGenre {
  id: string = uuidv4();
  description: string = '';
  genreId: string;
  vibe: any; //Vibe
}

export class Vibe {
  id: string = uuidv4();
  description: string;
}

export class Word {
  id: string = uuidv4();
  description: string;
  vibes: any[]; // Vibe
  syllables: number;
  category: string;
}

export class NameLength {
  id: string = uuidv4();
  description: string;
  length: number;
}

export class GeneratedName {
  firstWord: string;
  secondWord: string;
  thirdWord: string;
}
