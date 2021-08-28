import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // }

  heroes: Hero[] = [];
  // selectedHero?: Hero;

  constructor(private heroService: HeroService) { } //private messageService:MessageService

  ngOnInit(): void {
    this.getHeroes(); // this class.getHerores
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  // }

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes(); // get heroes from service into this.heroes variable
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; } // don't add 
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      })
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero ); // don't get that selected one (delete it)
    this.heroService.deleteHero(hero.id).subscribe(); //nothing to do with return observable but it "MUST" subscribe!
    
    //Observable does nothing ..until something subscribes

  }

}
