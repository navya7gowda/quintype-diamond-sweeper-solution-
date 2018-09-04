import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  data = [
    ['diamond', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'diamond', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'diamond', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'diamond', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'diamond', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'diamond', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'diamond', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'diamond']
];
visited = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
];
score = 64;
completed = false;
board_view = [
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '']
];
keys: String[];

  constructor() {
    this.data.map((row, rowIndex) => {
      this.renderRow(row, rowIndex);
    });
   }

  ngOnInit() {
  }

  renderCell(cell, rowIndex, colIndex) {
    const image = this.imageOf(cell, rowIndex, colIndex);
    const divData =
    image
    ? `<div class="box"><img src=${image} width="30px" height="30px"/></div>`
    : null;
    this.board_view[rowIndex][colIndex] = divData;
}

onClick(rowIndex, colIndex) {

  if (!this.completed) {
    if (this.visited[rowIndex][colIndex] === false) {
      if (this.data[rowIndex][colIndex] === 'diamond' && this.visited[rowIndex][colIndex] === false) {
        this.board_view[rowIndex][colIndex] = `<div class="box"><img src="/assets/images/diamond.png" width="30px" height="30px"/></div>`;
      }
      this.visited[rowIndex][colIndex] = true;
      if (this.game_completed(rowIndex, colIndex)) {
          this.score = this.score - 1;
          this.completed = true;
      } else {
        if (this.data[rowIndex][colIndex] === 'unknown' && this.visited[rowIndex][colIndex] === true) {
          this.board_view[rowIndex][colIndex] = `<div class="box" width="30px" height="30px"></div>`;
        }
          this.score = this.score - 1;
      }
    }
  }
}

game_completed(rowIndex, colIndex) {
  const visited = this.visited, score = this.score;
  for (let i = 0; i < visited.length; i++) {
      for (let j = 0; j < visited.length; j++) {
          if (this.data[i][j] === 'diamond' && this.visited[i][j] === false) {

          return false;
          }
      }
  }

  return true;
}

imageOf(cell, rowIndex, colIndex) {
    if (!this.visited[rowIndex][colIndex]) {
        return '/assets/images/question.png';
    } else if (cell === 'diamond') {
        return '/assets/images/diamond.png';
    }
}

renderRow(row, rowIndex) {
    return row.map((cell, colIndex) => {
      return this.renderCell(cell, rowIndex, colIndex);
    });
}

}
