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

      //console.log(this.generateSyllableLength())


    });
  }

  public generateRandomNumber(wordList: Word[]): number {
    return Math.floor(Math.random() * (wordList.length - 1 - 0 + 0))
  }

  public generateRandomWord(wordType: string, length?: number): Word {
    let words;
    if(!length) {
      words = this.words.filter(x => x.category.toLocaleLowerCase() == wordType);
    } else {
      words = this.words.filter(x => x.category.toLocaleLowerCase() == wordType && x.syllables <= length);
    }

    return words[this.generateRandomNumber(words)]
  }

  public generateBoolean(): boolean {
    return Math.random() >= 0.5 
  }

  public generateRandomWordType(): string {
    return this.generateBoolean() ? this.wordTypes[0] : this.wordTypes[1]
  }

  public generateSyllableLength(length: number): number {
    return Math.floor(Math.random() * (length - 0 + 0))
  }

  public translateLengthSettingToSyllableCount(length: number): number[] {
  // short 1-2 syllables
  // medium 2-3 syllables
  // long 3-4 syllables
  // XL 4-6 syllables
  // random 

    switch(length) {
      case(1):
        return [1, 2];
      case(2):
        return [2,3];
      case(3):
        return [3,4];
      case(4): 
        return [4,5];
      case(5):
        return [5,6];
      
    }

  }



  public generateName(length: number): GeneratedName {

    let syllableCountChoice = this.translateLengthSettingToSyllableCount(length);
    let syllableCount = syllableCountChoice[Math.floor(Math.random() * syllableCountChoice.length - 0 + 0)];
    console.log(`total syllable count: ${syllableCount}`);

    let wordType = this.generateRandomWordType();

    this.firstWord = this.generateRandomWord(wordType, syllableCount);
    console.log(`total count minus first word count: ${syllableCount - this.firstWord.syllables} [${this.firstWord.description}]`);

    let secondWordLength = syllableCount - this.firstWord.syllables
    wordType = this.generateRandomWordType();
    this.secondWord = this.generateRandomWord(wordType, secondWordLength);


    console.log(this.firstWord.description + this.secondWord.description)

    this.lastFirstWord = this.firstWord;
    this.lastSecondWord = this.secondWord;
    this.prefix = '';

    let name: GeneratedName = { firstWord: this.firstWord.description, secondWord: this.secondWord.description, thirdWord: '' };

    return name;
  }

}
