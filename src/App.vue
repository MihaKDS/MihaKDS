<script setup>
import TopIzpis from '../src/components/TopIzpis.vue'
import Universe from './components/Universe.vue';
</script>

<template>
  <main>
    <div class="ti">
      <TopIzpis :dm="dm" :h="h"/>
    </div>
    <div class="uni">
      <Universe :de="de" :spaces="spaces" @spClick ="spaceClick" @inClick="invenClick" @whs="whiteHole" />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return{
      dm: 0.999,
      de: 0.999,
      h: 0,
      sc: 0,
      whs: 0,
      wh_size: (0.1*(Math.PI)**0),
      force: 0.000666,
      passive: 0.0004796,
      tmp_inv: 'none',
      spaces: [
        {id: 0, state:"empty", value: 0, end: 0},
      ],
    }
  },
  components: {
    TopIzpis,
    Universe,
  },
  methods: {
    spaceTime: function() {
      if(this.de - this.passive > 0){
        this.dm += this.force + this.passive
        this.de -= this.force
      }else if(this.de > 0 && this.de<=this.passive){
        this.dm += this.de
        this.de = 0
      }else{
        this.de = 0
      }
    },
    spacesSpacetime: function() {
      for(let i = 0; i <= this.spaces.length-1; i++){
        if(this.spaces[i].state !== "empty"){
          switch(this.spaces[i].state){
            case "wh_nebula":
              if(this.spaces[i].value> 0){
                this.spaces[i].value -=1
                break
              }else if(this.spaces[i].value <=0){
                this.spaces[i].state = "wh"
                this.spaces[i].value = this.spaces[i].end*100
                document.getElementById("simg"+i).setAttribute("src", "../src/assets/bbh_rad.png")
                break
              }
            break
            case "wh":
              if(this.spaces[i].value- 0.2>= 0){
                this.spaces[i].value -=0.2
                this.h += 0.2
                break
              }else if(this.spaces[i].value -0.2 <0){
                if(this.spaces[i].value >=0){
                  this.h += this.spaces[i].value
                  this.h = Math.round(this.h*1000)/1000
                  this.spaces[i] = {id: i, state:"empty", value: 0, end: 0}
                  document.getElementById("simg"+i).setAttribute("src", "../src/assets/Plus.png")
                  break
                }
                break
              }
            break
            case "sun_nebula":
              if(this.spaces[i].value> 0){
                this.spaces[i].value -=1
              }else if(this.spaces[i].value <=0){
                this.spaces[i].state = "sun"
                this.spaces[i].value = this.spaces[i].end
                document.getElementById("simg"+i).setAttribute("src", "../src/assets/bbh.png")
              }
            break
            case "sun":
              if(this.spaces[i].value- 0.5> 0){
                this.spaces[i].value -=0.5
                this.de += 0.005
              }else if(this.spaces[i].value -0.5 <=0){
                if(this.spaces[i].value >0){
                  this.de += this.spaces[i].value/100
                  this.spaces[i].value = 0
                  this.spaces[i] = {id: i, state:"empty", value: 0, end: 0}
                  document.getElementById("simg"+i).setAttribute("src", "../src/assets/Plus.png")
                }
              }
            break   
          }
        }
      }
    },
    countSpaces:  function(){
      if(this.de>= (1*(10**this.sc))){
        this.sc += 1
        this.spaces.push({id: this.sc, state:"empty", value: 0, end: 0})
      }else if(this.de < (1*(10**(this.sc-1))) && this.de > 1){
        if(this.sc > 1){
          if(this.spaces[this.sc] != undefined){
            if(this.spaces[this.sc].state != "empty") 
              switch(this.spaces[this.sc].state){
                case "wh_nebula":
                  this.dm += this.spaces[this.sc].end * 0.9 
                break
                case "wh":
                  this.dm += (this.spaces[this.sc].value/100) * 0.9
                break
                case "sun":
                  this.h += this.spaces[this.sc].value *0.9
                break   
              }
            }
          this.sc --
          this.spaces.pop()
        }
      }else if(this.de<1 && this.de >=0){
        if(this.sc > 0){
          if(this.spaces[1] != undefined){
            switch(this.spaces[1].state){
              case "empty":
              break
              case "wh":
                this.dm += this.spaces[1].value 
              break
              case "sun":
                this.h += this.spaces[1].value 
              break   
            }
          }
          this.sc = 0
          this.spaces.pop()
        }
      }
    },
    spaceClick: function(id){
      if(this.spaces[id].state === "empty" && this.tmp_inv !="none"){
        switch(this.tmp_inv){
          case "wh":
            if(this.dm>= this.wh_size){
              this.dm -= this.wh_size
              this.spaces[id] = {id: id, state:"wh_nebula", value: Math.floor(this.wh_size)*20+10, end: this.wh_size}
              document.getElementById("simg"+id).setAttribute("src", "../src/assets/dmtn.png")
              this.saveTime()
              break
            }
          break
          case "sun":
            if(this.h >= 100){  
              this.h -=100       
              this.spaces[id] = {id: id, state:"sun_nebula", value: 2, end: 100}
              document.getElementById("simg"+id).setAttribute("src", "../src/assets/dmtn.png")
              this.saveTime()
              break
            }
          break
        }
  }
    },
    invenClick: function(itm){
      switch(itm){
        case "wh":
          if(this.tmp_inv === "none"){
            document.getElementById("wh").style.borderColor = "yellow"
            document.getElementById("invset").style.display = "block"
            document.body.style.cursor = "cell"
            this.tmp_inv = "wh"
            break
          }else if(this.tmp_inv === "wh"){
            document.body.style.cursor = "default"
            document.getElementById("wh").style.borderColor = "gray"
            document.getElementById("invset").style.display = "none"
            this.tmp_inv = "none"
          }
          break
        case "sun":
          if(this.tmp_inv === "none"){
            document.getElementById("sun").style.borderColor = "yellow"
            document.body.style.cursor = "cell"
            this.tmp_inv = "sun"
            break
          }else if(this.tmp_inv === "sun"){
            document.body.style.cursor = "default"
            document.getElementById("sun").style.borderColor = "gray"
            this.tmp_inv = "none"
          }
        break
      }
    },
    whiteHole: function(i){
      this.whs = i
      this.wh_size = 0.1*(Math.PI)**this.whs
      for(let y = 0; y<=2; y++){
        document.getElementById("it"+y).style.borderColor = "gray"
      }
      document.getElementById("it"+this.whs).style.borderColor = "yellow"
    },
    saveTime: function(){
      let set = new Date()
      let tim = Math.round((set.getTime())/1000)
      localStorage.setItem('tim', tim)
      localStorage.setItem('dm', this.dm)
      localStorage.setItem('de', this.de)
      localStorage.setItem('h', this.h)
      localStorage.setItem('sc', this.sc)
      localStorage.setItem('whs', this.whs)
      localStorage.setItem('spaces', JSON.stringify(this.spaces))
    },
    rebuildSpace: function(saved){
      let nSet = new Date()
      let nTim = Math.round((nSet.getTime())/1000)
      let timeWarp = nTim - saved
      console.log(timeWarp)
      for(let i = 0; i<=timeWarp; i++){
        this.spaceTime()
        this.spacesSpacetime()
        this.countSpaces()
      }
      for(let y = 0; y<= this.spaces.length-1; y++){
        switch(this.spaces[y].state){
          case "wh_nebula":
            document.getElementById("simg"+y).setAttribute("src", "../src/assets/dmtn.png")
          break  
          case "wh":
            document.getElementById("simg"+y).setAttribute("src", "../src/assets/bbh_rad.png")
          break  
          case "sun_nebula":
            document.getElementById("simg"+y).setAttribute("src", "../src/assets/dmtn.png")
          break  
          case "sun":
            document.getElementById("simg"+y).setAttribute("src", "../src/assets/bbh.png")
          break  
        }
      }
      timeWarp = 0
      this.saveTime()
    },
    rebuildTime: function(){
      if(localStorage.getItem("de") !== null){
        let tim = Number(localStorage.getItem("tim"))
        this.dm = Number(localStorage.getItem("dm"))
        this.de = Number(localStorage.getItem("de"))
        this.h = Number(localStorage.getItem("h"))
        this.sc = Number(localStorage.getItem("sc"))
        this.spaces = JSON.parse(localStorage.getItem("spaces"))
        this.rebuildSpace(tim)
      }
    },
  },
  mounted() {
    this.time = setInterval(()=>{
      this.spaceTime()
      this.spacesSpacetime()
      this.countSpaces()
    },1000)
    this.rebuildTime()
  }
}
</script>

<style scoped>
.ti{
  position:absolute;
  left:0.2em;
}
.uni{
  height: 95vh;
  position: inherit;
}
</style>
