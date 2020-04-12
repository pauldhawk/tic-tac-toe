<template>
  <div>
    <div class="d-flex justify-space-around ma-4">
      <!-- Message -->
      <h1 v-if="gameOver">{{ turn }} Has Won The Game</h1>
      <h1 v-if="gameIsDraw">This Game Is At A Draw</h1>
      <h1 v-else>{{ turn }}'s Turn</h1>
      <br />
      <!-- Reset Button -->
      <v-btn x-large dark color="red darken-4" @click="resetGame()">Reset Game</v-btn>
    </div>
    <div class="select-board-size">
      <v-select
        v-model="board_size"
        :items="board_sizes"
        label="Solo field"
        solo
      ></v-select>
    </div>
    <!-- debug info -->
    <div v-if="debug">

      <h1>turn number: {{ turnNumber }}</h1>
      <h1>board size: {{ board_size }}</h1>
      <h1>draw: {{gameIsDraw}}</h1>
    </div>
    <!-- Board -->
    <div :class="{
      'game-board-600px': board_size == 'normal',
      'game-board-1000px': board_size == 'large'
      }"
        class="game-board">
      <div :class="{ winner: winners['one'] === true }"
          class="box" @click="updateBox('one')">{{ board.one.value }}</div>
      <div :class="{ winner: winners['two'] === true }"
        class="box" @click="updateBox('two')">{{ board.two.value }}</div>
      <div :class="{ winner: winners['three'] === true }"
        class="box" @click="updateBox('three')">{{ board.three.value }}</div>
      <div :class="{ winner: winners['four'] === true }"
        class="box" @click="updateBox('four')">{{ board.four.value }}</div>
      <div :class="{ winner: winners['five'] === true }"
        class="box" @click="updateBox('five')">{{ board.five.value }}</div>
      <div :class="{ winner: winners['six'] === true }"
        class="box" @click="updateBox('six')">{{ board.six.value }}</div>
      <div :class="{ winner: winners['seven'] === true }"
        class="box" @click="updateBox('seven')">{{ board.seven.value }}</div>
      <div :class="{ winner: winners['eight'] === true }"
        class="box" @click="updateBox('eight')">{{ board.eight.value }}</div>
      <div :class="{ winner: winners['nine'] === true }"
        class="box" @click="updateBox('nine')">{{ board.nine.value }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Game',
  methods: {
    resetGame() {
      this.gameOver = false;
      this.winners = {};
      this.gameIsDraw = false;
      Object.keys(this.board).forEach((x) => {
        this.board[x].value = null;
      });
      this.turnNumber = 0;
    },
    updateBox(box) {
      if (!this.gameOver && !this.board[box].value) {
        this.board[box].value = this.turn === 'X' ? 'X' : 'O';
        this.gameOverCheck(box);
      }
    },
    gameOverCheck(box) {
      const chinkenDinner = this.board[box].winning_pairs || []; // grabs winner combos
      const winnerWinner = chinkenDinner.some((xs) => { // check to see if any combo wins
        const reverseCheck = xs.some(x => this.board[x].value !== this.turn);
        // check to see if a combo wins
        if (!reverseCheck === true) { // if we have a winner
          this.setWinners(xs); // set them
        }
        return !reverseCheck; // straiten it out
      });
      if (winnerWinner) {
        this.gameOver = true;
      } else if (this.turnNumber === 8) {
        this.gameIsDraw = true;
      } else {
        this.turn = this.turn === 'X' ? 'O' : 'X';
        this.turnNumber += 1;
      }
    },
    setWinners(w) { // so we can highlight the winning sqrs
      this.winners = w.reduce((result, x) => ({ ...result, [x]: true }), {});
    },
  },
  data() {
    return {
      debug: false,
      gameOver: false,
      gameIsDraw: false,
      turnNumber: 0,
      turn: 'X', // 'O'
      winners: {}, // to highlist winning cols
      board_size: 'normal', // large
      board_sizes: ['normal', 'large'],
      board: {
        one: {
          id: 1,
          value: null,
          winning_pairs: [
            ['one', 'two', 'three'], // line
            ['one', 'four', 'seven'], // col
            ['one', 'five', 'nine'], // diagonal
          ],
        },
        two: {
          id: 2,
          value: null,
          winning_pairs: [
            ['one', 'two', 'three'], // line
            ['two', 'five', 'eight'], // col
          ],
        },
        three: {
          id: 3,
          value: null,
          winning_pairs: [
            ['one', 'two', 'three'], // line
            ['three', 'six', 'nine'], // col
            ['three', 'five', 'seven'], // diagonal
          ],
        },
        four: {
          id: 4,
          value: null,
          winning_pairs: [
            ['four', 'five', 'six'], // line
            ['one', 'four', 'seven'], // col
          ],
        },
        five: {
          id: 5,
          value: null,
          winning_pairs: [
            ['four', 'five', 'six'], // line
            ['two', 'five', 'eight'], // col
            ['one', 'five', 'nine'], // diagonal
            ['three', 'five', 'seven'], // diagonal
          ],
        },
        six: {
          id: 6,
          value: null,
          winning_pairs: [
            ['four', 'five', 'six'], // line
            ['three', 'six', 'nine'], // col
          ],
        },
        seven: {
          id: 7,
          value: null,
          winning_pairs: [
            ['seven', 'eight', 'nine'], // line
            ['one', 'four', 'seven'], // col
            ['three', 'five', 'seven'], // diagonal
          ],
        },
        eight: {
          id: 8,
          value: null,
          winning_pairs: [
            ['seven', 'eight', 'nine'], // line
            ['two', 'five', 'eight'], // col
          ],
        },
        nine: {
          id: 9,
          value: null,
          winning_pairs: [
            ['seven', 'eight', 'nine'], // line
            ['three', 'six', 'nine'], // col
            ['one', 'five', 'nine'], // diagonal
          ],
        },
      },
    };
  },
};
</script>

<style scoped>
  .game-board {
    margin: 0 auto;
    background-color: #34495e;
    color: #fff;
    border: 6px solid #2c3e50;
    border-radius: 10px;

    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  }

  .game-board-600px {
    width: 600px;
    height: 600px;
  }
  .game-board-1000px {
    width: 750px;
    height: 750px;
  }

  .box {
    cursor: pointer;
    border: 6px solid #2c3e50;
    border-radius: 2px;
    font-family: Helvetica;
    font-weight: bold;
    font-size: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .winner {
    background-color: purple;
  }
  .select-board-size {
    width: 30%;
    margin-left: 1rem;
  }
</style>
