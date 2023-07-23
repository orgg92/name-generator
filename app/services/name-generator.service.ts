import { Injectable } from '@angular/core';
import { DependenciesService, GeneratedName, Vibe, Word } from './dependencies.service';
import { v4 as uuidv4 } from 'uuid';
import { syllable } from 'syllable';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NameGeneratorService {

  private adjectives: any[] = [];
  private nouns: any[] = [];

  private prefixes = ['Lil', 'The', 'DJ', 'MC'];

  private wordTypes: string[] = ['adjective', 'noun']

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

  private stylizeWord(word: string): string {
    let styleIndicator;

    // remove vowels

    // substitute number

    return 'test'
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


    });
  }

  public generateRandomNumber(wordList: Word[]): number {
    return Math.floor(Math.random() * (wordList.length - 1 - 0 + 0))
  }

  public generateRandomWord(wordType: string): Word {
    let words = this.words.filter(x => x.category.toLocaleLowerCase() == wordType);

    return words[this.generateRandomNumber(words)]
  }

  public generateBoolean(): boolean {
    return Math.random() >= 0.5 
  }

  public generateRandomWordType(): string {
    return this.generateBoolean() ? this.wordTypes[0] : this.wordTypes[1]
  }

  // short 1-2 syllables
  // medium 2-3 syllables
  // long 3-4 syllables
  // XL 4-6 syllables
  // random 

  public generateName(length: number): GeneratedName {

    let wordType = this.generateRandomWordType();

    this.firstWord = this.generateRandomWord(wordType)

    wordType = this.generateRandomWordType();
    this.secondWord = this.generateRandomWord(wordType);

    // #2 pick random word

    while ((this.firstWord.syllables + this.secondWord.syllables) > length)
    {

      let wordType = this.generateRandomWordType();

      this.firstWord = this.generateRandomWord(wordType)
  
      wordType = this.generateRandomWordType();
      this.secondWord = this.generateRandomWord(wordType);
  
      while (this.firstWord.description.endsWith('y') && this.secondWord.description.endsWith('y')  ) {
        this.secondWord = this.generateRandomWord(wordType);
      }
  
    }

    console.log(this.firstWord.description + this.secondWord.description)

    this.lastFirstWord = this.firstWord;
    this.lastSecondWord = this.secondWord;
    this.prefix = '';

    let name: GeneratedName = { firstWord: this.firstWord.description, secondWord: this.secondWord.description, thirdWord: '' };

    return name;
  }

}
