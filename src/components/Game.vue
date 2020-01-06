<template>
  <div>
    <div class="d-flex justify-space-around ma-4">
      <h1 v-if="gameOver">{{ turn }} Has Won The Game</h1>
      <h1 v-else>{{ turn }}'s' Turn</h1>

      <v-btn x-large dark color="red darken-4" @click="resetGame()">Reset Game</v-btn>
    </div>

    <!-- Board -->
    <div class="game-board">
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
      Object.keys(this.board).forEach((x) => {
        this.board[x].value = null;
      });
    },
    updateBox(box) {
      if (!this.gameOver && !this.board[box].value) {
        this.board[box].value = this.turn === 'X' ? 'X' : 'O';
        this.gameOverCheck(box);
      }
    },
    gameOverCheck(box) {
      const chinkenDinner = this.board[box].bros || [];
      const winnerWinner = chinkenDinner.some((xs) => {
        const reverseCheck = xs.some(x => this.board[x].value !== this.turn);
        if (!reverseCheck === true) {
          this.setWinners(xs);
        }
        return !reverseCheck; // straiten it out
      });
      if (winnerWinner) {
        this.gameOver = true;
      } else {
        this.turn = this.turn === 'X' ? 'O' : 'X';
      }
    },
    setWinners(w) {
      this.winners = w.reduce((result, x) => ({ ...result, [x]: true }), {});
      console.log('winners', this.winners);
    },
  },
  data() {
    return {
      gameOver: false,
      turn: 'X', // 'O'
      winners: {},
      board: {
        one: {
          id: 1,
          value: null,
          bros: [
            ['one', 'two', 'three'], // line
            ['one', 'four', 'seven'], // col
            ['one', 'five', 'nine'], // diagonal
          ],
        },
        two: {
          id: 2,
          value: null,
          bros: [
            ['one', 'two', 'three'], // line
            ['two', 'five', 'eight'], // col
          ],
        },
        three: {
          id: 3,
          value: null,
          bros: [
            ['one', 'two', 'three'], // line
            ['three', 'six', 'nine'], // col
            ['three', 'five', 'seven'], // diagonal
          ],
        },
        four: {
          id: 4,
          value: null,
          bros: [
            ['four', 'five', 'six'], // line
            ['one', 'four', 'seven'], // col
          ],
        },
        five: {
          id: 5,
          value: null,
          bros: [
            ['four', 'five', 'six'], // line
            ['two', 'five', 'eight'], // col
            ['one', 'five', 'nine'], // diagonal
            ['three', 'five', 'seven'], // diagonal
          ],
        },
        six: {
          id: 6,
          value: null,
          bros: [
            ['four', 'five', 'six'], // line
            ['three', 'six', 'nine'], // col
          ],
        },
        seven: {
          id: 7,
          value: null,
          bros: [
            ['seven', 'eight', 'nine'], // line
            ['one', 'four', 'seven'], // col
            ['three', 'five', 'seven'], // diagonal
          ],
        },
        eight: {
          id: 8,
          value: null,
          bros: [
            ['seven', 'eight', 'nine'], // line
            ['two', 'five', 'eight'], // col
          ],
        },
        nine: {
          id: 9,
          value: null,
          bros: [
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
    width: 600px;
    height: 600px;
    margin: 0 auto;
    background-color: #34495e;
    color: #fff;
    border: 6px solid #2c3e50;
    border-radius: 10px;

    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
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
    background-color: pink;
  }
</style>
