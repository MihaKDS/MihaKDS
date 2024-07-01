<script setup>
    import TopStat from '../components/TopStat.vue'
    import icnDC from '../components/icons/IconDarkCoin.vue'

      import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <nav class="btnGame">
      <RouterLink to="/">DS</RouterLink>
    </nav>
    <div>Rock, paper, sccissors</div>
    <TopStat>
    <template #stat>
        {{ dc }}
    </template>
    <template #icon>
      <icnDC />
    </template>
    </TopStat>
    <div>
      won:{{ score.won }}<br>
      draw:{{ score.draw }}<br>
      lost:{{ score.lost }}<br>
      score:{{ score.num }}
    </div>
    <div v-if="gameon === 'start'">
    <button @click="play()">Play rps 1DC</button>
    </div>
    <div v-else-if="gameon === 'playing'">
      <p>Choose: </p>
    <button @click="choise(1)">Rock</button>
    <button @click="choise(2)">Paper</button>
    <button @click="choise(3)">Sccissors</button>
    </div>
    <div v-else-if="gameon === 'resault'">
    <button @click="play()">Play again</button><br>
    <div>Player: {{plres}}</div>
    <div>PC: {{pcres}}</div>
    <h3>{{res}}</h3>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        gameon: 'start',
        plres: 'nicg',
        pcres: 'nicg',
        res: 'nic',
        dc: Number(localStorage.getItem("dc")) || 0,
        dc_t: Number(localStorage.getItem("dc_t")) || 0,
        score: JSON.parse(localStorage.getItem("score")) || {
          won: 0,
          draw: 0,
          lost: 0,
          num: 0
        }
      }
    },
    methods: {
      play: function(){
        console.log(this.dc_t)
        if(this.dc -1 >= 0){
          if(this.dc_t > 0){
            this.dc_t --
            localStorage.setItem('dc_t', this.dc_t)
          }
          this.gameon = 'playing'
          this.dc --
          localStorage.setItem('dc', this.dc)
        }
      },
      choise: function(c){
        let rnd = Math.floor((Math.random() * 3) + 1)
        console.log(rnd)
        switch(c){
          /*0-rock, 1-papper, 2-sccissor*/
          /*first number player choise*/
          /*00 draw 01 lose 02 win*/
          /*10 win 11 draw 12 lose*/
          /*20 loose 21 win 22 draw*/
          case 1: /*rock*/
            if(rnd === 1){
              this.score.draw += 1
              this.plres = 'rock'
              this.pcres = 'rock'
              this.res = 'draw'
              this.gameon = 'resault'
              break
            }else if(rnd === 2){
              this.score.lost += 1
              this.plres = 'rock'
              this.pcres = 'paper'
              this.res = 'lost'
              this.gameon = 'resault'
              this.score.num -= 0.1
              break
            }else if(rnd === 3){
              this.score.won += 1
              this.plres = 'rock'
              this.pcres = 'sccissors'
              this.res = 'won'
              this.gameon = 'resault'
              this.score.num += 1
              break 
            }
            break
          case 2: /*paper*/ 
            if(rnd === 1){
                this.score.won += 1
                this.plres = 'paper'
                this.pcres = 'rock'
                this.res = 'won'
                this.gameon = 'resault'
                this.score.num += 1
                break
              }else if(rnd === 2){
                this.score.draw += 1
                this.plres = 'paper'
                this.pcres = 'paper'
                this.res = 'draw'
                this.gameon = 'resault'
                break
              }else if(rnd === 3){
                this.score.lost += 1
                this.plres = 'paper'
                this.pcres = 'sccissors'
                this.res = 'lost'
                this.gameon = 'resault'
                this.score.num -= 0.1
                break 
              }
            break
          case 3:  /*lose*/
            if(rnd === 1){
                this.score.lost += 1
                this.plres = 'sccissors'
                this.pcres = 'rock'
                this.res = 'lost'
                this.gameon = 'resault'
                this.score.num -= 0.1
                break
              }else if(rnd === 2){
                this.score.won += 1
                this.plres = 'sccissors'
                this.pcres = 'paper'
                this.res = 'won'
                this.gameon = 'resault'
                this.score.num += 1
                break
              }else if(rnd === 3){
                this.score.draw += 1
                this.plres = 'sccissors'
                this.pcres = 'sccissors'
                this.res = 'draw'
                this.gameon = 'resault'
                break 
              }
          break
        }
        localStorage.setItem('score', JSON.stringify(this.score))
      }
    },
    mounted(){
    },
  }
</script>

<style>
.container{
  color: whitesmoke;
}
.btnGame{
  display: flex;
  align-self: flex-end;
  align-items: center; 
  justify-content: center;
  border: 2px solid gray;
  border-radius: 5em;
  width: 2em;
  height: 2em;
  
}
</style>
