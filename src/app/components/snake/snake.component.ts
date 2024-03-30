import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent {
   grid: number[][] = []; 
  rows = 20;
  columns = 20; 
  score: number = 0;
  food: number[] = [];
  snake: number[][] = [[10, 8], [10,9], [10, 10],[10, 11],[10, 12]];
  directions: number[] = [0, 1];
  playing: boolean = true;
  buttonText: string = "Pause";
  buttonClass: string = "btn btn-stop";
  pauseButtonDisplay: string = 'inline';
  restartButtonDisplay: string = 'none';



  constructor() { }

  drawSnake() {
    for (let i = 0; i < this.snake.length; i++)
      this.grid[this.snake[i][0]][this.snake[i][1]] = 1;
  }
  async play() {
      this.placeFood();
    while (this.playing) {
      await this.delay(200);
      this.moveSnake();
      this.darwGrid();
      this.drawSnake();
  
    }
  }

  isCollide(newPosition: number[]): boolean {
    for (let i = 0; i < this.snake.length; i++) {
        if (this.snake[i][0] === newPosition[0] && this.snake[i][1] === newPosition[1])
          return true;
    }
    return false;
  }


  moveSnake() {
    let newX = this.snake[this.snake.length - 1][0] + this.directions[0];
    newX = newX == -1 ? this.grid.length -1 : newX;
    newX = newX == this.grid.length ? 0 : newX;

    let newY = this.snake[this.snake.length - 1][1] + this.directions[1];
    newY = newY == -1 ? this.grid[0].length - 1 : newY;
    newY = newY == this.grid[0].length ? 0 : newY;


    let newPosition =   [newX, newY];

    if (this.isCollide(newPosition)) {
        this.playing = false;

      this.grid[newPosition[0]][newPosition[1]] = 3;
      this.pauseButtonDisplay = 'none';
      this.restartButtonDisplay = 'inline';
        return;
    }
    this.snake.push(newPosition);
    

    if (newPosition[0] == this.food[0] && newPosition[1] == this.food[1]) {
      this.score++;
        this.placeFood();
        return;
    }

 
    
    this.snake.shift();
  }

  placeFood() {
    while (this.isCollide(this.food)) {
      this.food[0] = Math.floor(Math.random() * this.grid.length);
      this.food[1] = Math.floor(Math.random() * this.grid[0].length);
    }
  }

togglePause() {
    if (this.playing) {
      this.buttonText = "Continue";
      this.buttonClass = "btn btn-cont";
    } else {
      this.buttonText = "Pause";
      this.buttonClass = "btn btn-stop";
    }

    this.playing = !this.playing;
    this.play();
  }
 restart() {
    location.reload();
  }






  ngOnInit(): void {
    this.initializeGrid();
    this.food = [Math.floor(Math.random() * this.grid.length), Math.floor(Math.random() * this.grid[0].length)];
    this.play();
  }
  getCellColor(value: number): any {
    switch (value) {
      case 0: return { 'background-color': 'darkgray' };
      case 1: return { 'background-color': 'lime' };
      case 2: return { 'background-color': 'black' };
      case 3: return { 'background-color': 'red' };
      default: return {};
    }
  }
  initializeGrid(): void {
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.grid[i][j] = 0;

       
          
      }
    }
  }
  darwGrid(): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = 0;
         if (i == this.food[0] && j == this.food[1])
          this.grid[i][j] = 2;
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let newDirection: number[] = [... this.directions];
    
    switch (event.key) {
      case 'ArrowUp':
        newDirection = [-1, 0];
        break;
      case 'ArrowDown':
        newDirection = [1, 0];
        break;
      case 'ArrowLeft':
        newDirection = [0, -1];
        break;
      case 'ArrowRight':
        newDirection = [0, 1];
        break;
      default:
        // Handle other keys if needed
        break;
    }
    this.directions = (newDirection[0] + this.directions[0] == 0 && newDirection[1] + this.directions[1] == 0) ? this.directions : newDirection; 
  }
}
