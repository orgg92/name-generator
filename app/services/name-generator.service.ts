import { Injectable } from '@angular/core';
import { DependenciesService, Vibe, Word } from './dependencies.service';
import { v4 as uuidv4 } from 'uuid';
import { syllable } from 'syllable';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NameGeneratorService {
  private randomWords = ['Franz', 'Muse', 'Strokes', 'Play'];
  // private adjectives = [
  //   'Screaming',
  //   'Rolling',
  //   'Engage',
  //   'Black',
  //   'Blue',
  //   'Grey',
  //   'Shining',
  //   'Empty',
  //   'Sharp',
  // ];
  // private nouns = [
  //   'Eagles',
  //   'Trees',
  //   'Notes',
  //   'Melody',
  //   'Sound',
  //   'System',
  //   'Skies',
  //   'Level',
  //   'Wolf',
  //   'Head',
  //   'Eraser',
  //   'House',
  // ];

  private adjectives: any[] = [];
  private nouns: any[] = [];

  private prefixes = ['Lil', 'The', 'DJ', 'MC'];

  private takeRandomWord: boolean = false; // bool
  private takeAdjective: boolean = false; // bool
  private takeNoun: boolean = false; // bool

  private prefix: string = '';
  private prefixIndicator: number | null = 0;
  private firstWord: Word;
  private secondWord: Word;
  private lastFirstWord: Word;
  private lastSecondWord: Word;

  private vibes: Vibe[] = [];
  private words: Word[] = [];

  constructor(
    private dependenciesService: DependenciesService,
    private httpClient: HttpClient
  ) {
    this.readFiles();
  }

  private processWordList(data: string, type: string): void {
    let words = data.split('\n');
    words.forEach((word) => {
      this.words.push({
        description: word,
        category: type,
        syllables: syllable(word),
        vibes: [],
        id: uuidv4,
      });
    });
  }

  private pickRandomVibe(): void {
    
  }

  public async readFiles(): Promise<void> {
    let request1 = this.httpClient.get(
      'https://gist.githubusercontent.com/hugsy/8910dc78d208e40de42deb29e62df913/raw/eec99c5597a73f6a9240cab26965a8609fa0f6ea/english-adjectives.txt',
      { responseType: 'text' }
    );

    let request2 = this.httpClient.get(
      'https://raw.githubusercontent.com/hugsy/stuff/main/random-word/english-nouns.txt',
      { responseType: 'text' }
    );

    forkJoin([request1, request2]).subscribe((req1) => {
      this.processWordList(req1[0], 'Adjective');
      this.processWordList(req1[1], 'Noun');

      console.log(this.words);

      this.generateName();
    });
  }

  public generateRandomNumber(): number {
    return 1;
  }

  public generateBoolean(): boolean {
    return true;
  }

  public generateName(): void {
    console.log('test');
  }

  // public generateName(): void {
  //   for (var i = 0; i < 100; i++) {
  //     // #1 decide if band should begin with "the, lil or DJ" or none

  //     this.prefixIndicator =
  //       Math.random() < 0.2 ? Math.floor(Math.random() * (4 - 0 + 0)) : null;
  //     if (this.prefixIndicator) {
  //       this.prefix = this.prefixes[this.prefixIndicator];
  //     }

  //     this.firstWord =
  //       this.words[
  //         Math.floor(Math.random() * (this.words.length - 1 - 0 + 0))
  //       ];
  //     // #2 pick random word

  //     while (this.firstWord == this.lastFirstWord) {
  //       this.firstWord =
  //         this.adjectives[
  //           Math.floor(Math.random() * (this.adjectives.length - 1 - 0 + 0))
  //         ];
  //     }

  //     if (!this.prefixes.find((x) => x == this.prefix)) {
  //       this.secondWord =
  //         this.nouns[
  //           Math.floor(Math.random() * (this.nouns.length - 1 - 0 + 0))
  //         ];
  //       while (
  //         this.firstWord == this.secondWord ||
  //         this.secondWord == this.lastSecondWord
  //       ) {
  //         this.secondWord =
  //           this.nouns[
  //             Math.floor(Math.random() * (this.nouns.length - 1 - 0 + 0))
  //           ];
  //         while (this.secondWord == this.lastSecondWord) {
  //           this.secondWord =
  //             this.nouns[
  //               Math.floor(Math.random() * (this.nouns.length - 1 - 0 + 0))
  //             ];
  //         }
  //       }
  //     }

  //     console.log(this.firstWord.description)
  //     console.log(this.secondWord.description);
  //     console.log('test')

  //     let fullTitle: string = '';
  //     if (this.prefix) {
  //       fullTitle.concat(this.prefix + ' ');
  //     }

  //     if (this.firstWord) {
  //       fullTitle.concat(this.firstWord.description + this.secondWord.description ?? ' ');
  //     }

  //     if (this.secondWord) {
  //       fullTitle.concat(this.secondWord.description);
  //     }

  //     console.log(fullTitle)

  //     // #3 decide whether band should have 2 (if nothing was selected in stage 2) or 3 (if there was) words in the name

  //     // #4 pick genres for band

  //     // #5 random age number between 0-10 years

  //     // #6 pick random instruments band is looking for

  //     this.lastFirstWord = this.firstWord;
  //     this.lastSecondWord = this.secondWord;
  //     this.prefix = '';
  //   }
  // }
}
