<template>
  <div class="container">
    <div id="header">
      <div class="buttonGroup">
        <button @click="changeFirst"
                style="border-right: solid 1px beige;border-bottom-right-radius: 0;border-top-right-radius: 0"><p
            :style="isAiFirst?'color: brown':'color: deepskyblue'">[{{ isAiFirst ? "电脑" : "玩家" }}]</p><br/>先手
        </button>
        <button @click="changeDifficult"
                style="border-left: solid 1px beige;border-bottom-left-radius: 0;border-top-left-radius: 0"><p
            :style="difficult === 2 ? 'color:red' : (difficult === 1 ? 'color:blue' : 'color:green')">
          [{{ difficult === 2 ? "困难" : (difficult === 1 ? "中等" : "简单") }}]</p><br/>难度
        </button>
      </div>
      <div v-if="winner!==-2" class="win"
           :style="winner === 1 ? 'color:aliceblue' : (winner === -1 ? 'color:rgb(113, 206, 168)' : '')">
        {{ winner === 1 ? "AI获胜" : (winner === -1 ? "玩家获胜" : "平局") }}
      </div>
      <div v-else class="title">井字棋</div>
      <button @click="reStart" class="button">重新<br/>开始对局</button>
    </div>
    <div id="main">
      <div id="table">
        <table class="checkerboard">
          <tr v-for="(row, rowindex) in this.chess" :key="rowindex">
            <td v-for="(col,colindex) in row" :key="colindex" :class="cellStyle(col)"
                @click="placePiece(rowindex,colindex,false)">{{ cellText(col) }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="footer">
      <div id="footer-item"><span style="font-family:arial;font-size: 2vh">Copyright © 2022 Wenjie Sha<br/><span
          style="font-size: 60%;padding-top: 2vh">Designed for AI🤖 course<br/>With ❤️ at Xidian University🦄</span></span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicTacToe",
  data() {
    return {
      chess: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      allowClick: true,
      gameStart: false,
      isAiFirst: false,
      aiNext: false,
      winner: -2,
      difficult: 2,
      san: [0.5, 0.8, 1]
    }
  },
  methods: {
    randomRange(min, max) {
      //返回[min,max]的随机数
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getDifferentArr(allArr, partArr) {
      for (let i = allArr.length - 1; i >= 0; i--) {
        for (let j = 0; j < partArr.length; j++) {
          if (allArr[i].x === partArr[j].x && allArr[i].y === partArr[j].y) {
            allArr.splice(i, 1);
            break;
          }
        }
      }
      return allArr;
    },
    changeFirst() {
      if (!this.gameStart) {
        this.isAiFirst = !this.isAiFirst;
        this.startGame();
      }
    },
    changeDifficult() {
      if (!this.gameStart) {
        this.difficult = (this.difficult + 1) % 3;
      }
    },
    cellStyle(value) {
      return {
        noneSelect: (value === 0),
        computerSelect: (value === 1),
        humanSelect: (value === -1)
      }
    },
    cellText(value) {
      if (value === -1) {
        return "◯";
      } else if (value === 1) {
        return "✕";
      } else {
        return "";
      }
    },
    placePiece(row, col, isAi) {
      if ((!this.allowClick && !isAi) || this.chess[row][col] !== 0) {
        return;
      }
      console.log('place', row, col, isAi);
      let update = JSON.parse(JSON.stringify(this.chess));
      if (isAi) {
        update[row][col] = 1;
        this.aiNext = false;
        this.allowClick = true;
      } else {
        if (!this.gameStart) {
          this.gameStart = true;
        }
        update[row][col] = -1;
        this.aiNext = true;
        this.allowClick = false;
      }
      this.chess = update;
    },
    startGame() {
      if (this.isAiFirst && !this.gameStart) {
        //切换为电脑先手时，AI第一步棋，若为困难难度,选择四角，其他难度随机选取
        let ori = JSON.parse(JSON.stringify(this.chess));
        let r1 = this.randomRange(0, 2);
        let r2 = this.randomRange(0, 2);
        if (this.difficult === 2) {
          r1 = (Math.floor(Math.random() * 2) === 0) ? 0 : 2;
          r2 = (Math.floor(Math.random() * 2) === 0) ? 0 : 2;
        }
        ori[r1][r2] = 1;
        this.chess = ori;
        this.gameStart = true;
      }
    },
    aiEmplace() {
      let best_val = -2;
      let possible_place = [];
      let all_place = [];
      let board = JSON.parse(JSON.stringify(this.chess));
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            all_place.push({x: i, y: j});
            board[i][j] = 1;
            let val = this.abPruneNode(board, -2, 2, false);
            board[i][j] = 0;
            console.log("ai如果选择", i, j, "最终结果是", (val === 1) ? "ai获胜" : ((val === 0) ? "平局" : "玩家获胜"));
            if (val > best_val) {
              best_val = val;
              possible_place = [{x: i, y: j}];
            } else if (val === best_val) {
              possible_place.push({x: i, y: j})
            }
          }
        }
      }
      //非最优解
      let kind_place = this.getDifferentArr(JSON.parse(JSON.stringify(all_place)), possible_place);
      console.log(kind_place);
      console.log(possible_place)
      //根据所选难度，AI有不同的概率去最优解中选择
      let evil = Math.random();
      let action = {};
      if (evil <= this.san[this.difficult]) {
        console.log('根据概率', this.san[this.difficult], "从最优解选择")
        //从最优解中随机选择
        action = possible_place[Math.floor(Math.random() * possible_place.length)]
      } else {
        console.log('根据概率', 1 - this.san[this.difficult], "从非最优解选择")
        //从非最优解中选择，若非最优解为空，则随机选择一个可行解
        if (kind_place.length === 0) {
          console.log("随机选择")
          action = all_place[Math.floor(Math.random() * all_place.length)]
        } else {
          action = kind_place[Math.floor(Math.random() * kind_place.length)]
        }
      }
      this.placePiece(action.x, action.y, true);
    },
    reStart() {
      this.chess = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      this.allowClick = true;
      this.gameStart = false;
      this.isAiFirst = false;
      this.aiNext = false;
      this.winner = -2;
    },
    abPruneNode(currentChess, a, b, isMAX) {
      //a-b剪枝
      //统计空余位置
      let openpos = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (currentChess[i][j] === 0) {
            openpos.push({x: i, y: j});
          }
        }
      }
      let eva = this.scoreEvaluate(currentChess);
      if (eva !== 0 && eva !== 2) {
        return eva;
      } else if (eva === 0) {
        return 0;
      }

      for (let i = 0; i < openpos.length; i++) {
        //尝试下一步
        let pos = openpos[i];
        if (isMAX) {
          currentChess[pos.x][pos.y] = 1;
        } else {
          currentChess[pos.x][pos.y] = -1;
        }
        //评估下一步得分
        let score = this.abPruneNode(currentChess, a, b, !isMAX);
        //回退尝试的这一步
        currentChess[pos.x][pos.y] = 0;

        //根据得分修建博弈树
        if (isMAX) {
          if (a < score) {
            a = score;
          }
          if (a >= b) {
            return b;
          }
        } else {
          if (b > score) {
            b = score;
          }
          if (b <= a) {
            return a;
          }
        }
      }
      if (isMAX) {
        return a;
      } else {
        return b;
      }
    },
    scoreEvaluate(currentChess) {
      //棋盘状态评估 玩家胜出返回-1，平局返回0，电脑胜出返回1，游戏还未结束返回2
      if (currentChess[0][0] === currentChess[0][1] && currentChess[0][1] === currentChess[0][2] && currentChess[0][0] !== 0) {
        return currentChess[0][0];
      } else if (currentChess[1][0] === currentChess[1][1] && currentChess[1][1] === currentChess[1][2] && currentChess[1][0] !== 0) {
        return currentChess[1][0];
      } else if (currentChess[2][0] === currentChess[2][1] && currentChess[2][1] === currentChess[2][2] && currentChess[2][0] !== 0) {
        return currentChess[2][0];
      } else if (currentChess[0][0] === currentChess[1][0] && currentChess[1][0] === currentChess[2][0] && currentChess[0][0] !== 0) {
        return currentChess[0][0];
      } else if (currentChess[0][1] === currentChess[1][1] && currentChess[1][1] === currentChess[2][1] && currentChess[0][1] !== 0) {
        return currentChess[0][1];
      } else if (currentChess[0][2] === currentChess[1][2] && currentChess[1][2] === currentChess[2][2] && currentChess[0][2] !== 0) {
        return currentChess[0][2];
      } else if (currentChess[0][0] === currentChess[1][1] && currentChess[1][1] === currentChess[2][2] && currentChess[0][0] !== 0) {
        return currentChess[0][0];
      } else if (currentChess[0][2] === currentChess[1][1] && currentChess[1][1] === currentChess[2][0] && currentChess[0][2] !== 0) {
        return currentChess[0][2];
      }
      //对局未结束
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (currentChess[i][j] === 0) {
            return 2;
          }
        }
      }
      //平局
      return 0;
    }
  },
  computed: {},
  mounted() {
    if (this.isAiFirst) {
      this.allowClick = false;
    }
    this.startGame();
  },
  watch: {
    chess: {
      handler() {
        console.log('update');
        let state = this.scoreEvaluate(this.chess);
        if (state === 2) {
          if (this.aiNext) {
            this.aiEmplace();
          }
        } else {
          this.winner = state;
          this.allowClick = false;
        }
      },
      deep: true,
      immediate: false
    },
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}

#header {
  background-color: beige;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#main {
  background-color: rgb(235, 235, 215);
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, .3) inset;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#footer {
  background-color: beige;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#table {
  height: 52vh;
  width: 52vh;
}

.checkerboard {
  height: 100%;
  width: 100%;
  border-collapse: collapse;
  border: 0;
}

.checkerboard tr td {
  box-sizing: border-box;
  height: 33%;
  width: 33%;
  border-top: 5px solid white;
  border-left: 5px solid white;
  text-align: center;
  font-size: 10vh;
  border-radius: 10px;
}

.checkerboard tr td:first-child {
  border-left: 0;
}

.checkerboard tr:first-child td {
  border-top: 0;
}

.checkerboard tr td:hover {
  transform: translate(10px, -10px);
  background-color: rgba(252, 85, 49, 0.3);
}

.noneSelect {
  background-color: lightblue;
}

.computerSelect {
  background-color: brown;
  color: black;
}

.humanSelect {
  background-color: deepskyblue;
  color: black;
}

.buttonGroup {
  background-color: rgb(231, 160, 61);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 0.2rem;
  border-radius: 10px;
  width: 20%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.buttonGroup button {
  background-color: rgb(231, 160, 61);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 0.16rem;
  width: 50%;
  height: 100%;
  border-radius: 10px;
}

.buttonGroup button p {
  color: antiquewhite;
  display: inline;
}

.button {
  background-color: rgb(231, 160, 61);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 0.2rem;
  border-radius: 10px;
  width: 20%;
  height: 70%;
}

button:hover {
  background-color: orange;
}

.win {
  background-color: orangered;
  height: 80%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: cadetblue;
  font-size: 0.4rem;
  border-radius: 10px;
}

.title {
  background-color: deepskyblue;
  height: 80%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.4rem;
  border-radius: 10px;
}

#footer-item {
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>