<script setup>
    import TopStat from '../components/TopStat.vue'
    import icnDC from '../components/icons/IconDarkCoin.vue'

      import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <div v-if="gameon != 'playing'">
      <nav class="btnGame">
        <RouterLink to="/">DS</RouterLink>
      </nav>
      <TopStat>
      <template #stat>
          {{ dc }}
      </template>
      <template #icon>
        <icnDC />
      </template>
      </TopStat>
      <div>Highcore: {{highclck}}</div>
    </div>
    <div class="game">
      <div v-if="gameon === 'start'">
        <div>Speed Clicking</div>
        <button class="btnPlay" @click="play()">Play (1DC)</button>
      </div>
      <div v-if="gameon === 'playing'">
        <div class="back" @click="voidclick()"></div>
        <div class="stats">
          <div class="lives" v-for="n in life">O</div>
          <div>| Score: {{clck}}</div>
        </div>
        <div class="spaces">
          <div class="space" v-for="spc in space" :id="'spc'+spc.id" @click="click(spc.id)" v-show="spc.show">{{space[spc.id].value}}</div>
        </div>
      </div>
      <div v-else-if="gameon === 'over'">
        <button class="btnPlay" @click="play()">Play Again (1DC)</button>
        <div>Time: {{gametime/100}}s</div>
        <div>Clicks: {{clck}}</div>
        <div v-if="newH">New highscore!</div>
      </div>
    </div>
  </div>

</template>

<script>
let h = window.innerHeight - 75;
let w = window.innerWidth - 75;
let nw = null
let nh  =null
let spcInterval = null
  export default {
    data() {
      return {
        gameon: 'start',
        dc: Number(localStorage.getItem("dc")) || 0,
        dc_t: Number(localStorage.getItem("dc_t")) || 0,
        highclck: Number(localStorage.getItem("highclck")) || 0,
        highgametime: Number(localStorage.getItem("highgametime")) || 0, 

        gametime: 0,
        clck: 0,
        life: 3,
        spcLast: 300,
        spcInt: 150,
        spcCur: 0,
        newH: false,
        space: [
          {id: 0, show: false, value: 0},
          {id: 1, show: false, value: 0},
          {id: 2, show: false, value: 0},
          {id: 3, show: false, value: 0},
          {id: 4, show: false, value: 0},
        ]
      }
    },
    methods: {
      play: function(){
        if(this.dc -1 >= 0){
          if(this.dc_t > 0){
            this.dc_t --
            localStorage.setItem('dc_t', this.dc_t)
          }
          this.gameon = 'playing'
          this.newH = false

          this.dc --
          localStorage.setItem('dc', this.dc)
          this.gametime = 0
          this.life = 3
          this.clck = 0
          this.spcLast = 300
          this.spcInt = 200
          this.spcCur = 0
          this.space = [
          {id: 0, show: false, value: 0},
          {id: 1, show: false, value: 0},
          {id: 2, show: false, value: 0},
          {id: 3, show: false, value: 0},
          {id: 4, show: false, value: 0},
        ]

          this.interval()
        }
      },
      interval: function(){
         spcInterval = setInterval(()=>{
          this.gametime += 10
          this.spcCur += 10
          if(this.spcCur >= this.spcInt){
            this.show_spc()
            this.spcCur = 0
            if(this.spcInt >=52){
              this.spcInt -= 2
            }
          }

          for(let i = 0; i<= this.space.length-1; i++ ){
            if(this.space[i].show === true){
              if(this.space[i].value > 0){
                this.space[i].value -= 10
              }else{
                this.space[i].show = false
                this.life --
                if(this.life < 1){
                 clearInterval(spcInterval)
                 this.gameon = 'over'
                 this.checkHigh()
                }
              }
            }
          }
        },100)
      },

      show_spc: function(){
        for(let i = 0; i<= this.space.length-1; i++ ){
          if(this.space[i].show === false){
            this.space[i].value = this.spcLast
            this.spcLast -=1
            nw = Math.floor(Math.random() * w)
            nh = Math.floor(Math.random() * h)
            document.getElementById("spc"+i).style.top = nh+"px"
            document.getElementById("spc"+i).style.left = nw+"px"
            this.space[i].show = true
            break
          }
        }
      },
      click: function(n){
        console.log(this.spcInt)
        this.space[n].show = false
        this.clck ++
      },
      voidclick: function(){
        this.life--
        if(this.life <1){
          this.gameon = 'over'
          clearInterval(spcInterval)
          this.checkHigh()
        }
      },
      checkHigh: function() {
        if(this.clck > this.highclck){
          this.highclck = this.clck
          this.newH = true
          localStorage.setItem('highclck', this.highclck)
          localStorage.setItem('highgametime', this.highgametime)
        }
      }

    },
    mounted(){
    },
  }
</script>

<style scoped>
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
.game{
  position: absolute;
  width: 94%;
  height: 96%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.back{
  position: absolute;
  top:0;
  left:0;
  width: 94%;
  height: 96%; 
}
.stats{
  position: absolute;
  top: 1em;
  left: 1em;
  display: flex;
  flex-direction: row;
}
.space{
  position: absolute;
  display: flex;
  align-items: center; 
  justify-content: center;
  border: 2px solid whitesmoke;
  background-color: white;
  border-radius: 5em;
  width: 3em;
  height: 3em;
}
</style>
