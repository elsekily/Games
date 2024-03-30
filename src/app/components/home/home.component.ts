import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
products = [
    { name: 'Color Sort Solver', imageUrl: 'assets/images/colortube.png' ,link : '/color-tube', description: 'Input your game and I show you how to solve it' },
    { name: 'Snake', imageUrl: 'assets/images/snake.png' ,link : '/snake', description: 'Just Play Snake' },
    { name: 'Maze Explorer and Solver', imageUrl: 'assets/images/maze.png' ,link : '/maze', description: 'Build your maze and I will explorer it' },
  ];
}
