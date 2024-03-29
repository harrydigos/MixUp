import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;
declare var webkitSpeechGrammarList: any;
const SpeechGrammarList = (<any>window).SpeechGrammarList || webkitSpeechGrammarList;

@Injectable({
  providedIn: 'root',
})
export class SmartSpeakerService {
  private recognition: any;
  private commands: any = {};
  private grammar: string = '';

  public retValue: string = '';
  public isListening: boolean = false;

  constructor() {
    this.recognition = new webkitSpeechRecognition();
  }

  public initialize() {
    this.grammar = this.createGrammar();
    let speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(this.grammar, 1);

    this.recognition.grammars = speechRecognitionList;

    this.recognition.lang = 'en-US';
  }

  public start() {
    this.recognition.start();
    this.recognition.onresult = (event: any) => {
      let command = event.results[0][0].transcript;
      this.retValue = command;
      console.log('Command given: ' + command);
      if (this.commands[command]) {
        this.commands[command](command);
      }
    };

    // this.recognition.onend = () => {
    //   this.recognition.start();
    // };
    this.isListening = true;
  }

  public stop() {
    this.recognition.stop();
    console.log('Stop listening');
    this.isListening = false;
  }

  public addCommand(text: string | string[], callback: (result: string) => void) {
    if (typeof text === 'string') this.commands[text.toLowerCase()] = callback;
    else
      text.forEach((command) => {
        this.commands[command.toLowerCase()] = callback;
      });
  }

  public speak(text: string, callback?: Function) {
    let utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = speechSynthesis.getVoices()[0];
    utterance.rate = 1;
    utterance.onerror = (event: any) => {
      console.log(event);
    };
    speechSynthesis.speak(utterance);
    if (callback) callback();
  }

  private createGrammar() {
    let grammar = '#JSGF V1.0; grammar commands; public <command> = ';
    for (let command in this.commands) {
      grammar += command.split(' ').join(' | ') + ' | ';
    }
    grammar = grammar.slice(0, grammar.length - 3);
    return grammar + ' ;';
  }
}
