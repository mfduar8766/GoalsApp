import { Component, OnInit } from '@angular/core';
import {trigger, style, transition, animate, query, stagger, keyframes} from '@angular/animations';
import {DataService} from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('addRemoveGoals', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),            
          ]))]), {optional: true}),

          query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
              style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),            
            ]))]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item'; 
  gaoltext: string =  ''; 
  goals = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;    
    this.data.changeGoal(this.goals);
  }

  addItem() {
      this.goals.push(this.gaoltext);
      this.gaoltext = '';
      this.itemCount = this.goals.length;
      this.data.changeGoal(this.goals);      
    }

    removeGoals(i) {
      this.goals.splice(i, 1);
      this.itemCount = this.goals.length;      
      this.data.changeGoal(this.goals);      
      }
    }
