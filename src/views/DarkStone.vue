<script setup>
  import TopStat from '../components/TopStat.vue'
  import Spaces from '../components/Spaces.vue'
  import icnDM from '../components/icons/IconDarkMatter.vue'
  import icnDC from '../components/icons/IconDarkCoin.vue'
  import icnDE from '../components/icons/IconDarkEnergy.vue'
  import icnSNG from '../components/icons/IconSingularity.vue'

  import { RouterLink, RouterView } from 'vue-router'

  import iBlackHole from '../assets/bh.png'
  import iDcoin from '../assets/dc.png'
  import iSun from '../assets/sun.jpg'
  import iSunRad from '../assets/bbh_rad.png'
  import iDMcolision from '../assets/dmtn.png'
  import iPlus from '../assets/Plus.png'
  import iSc from '../assets/sc.jpg'
  import iRps from '../assets/rps.jpg'
  import iBds from '../assets/bds.jfif'
</script>

<template>
  <main>
    <div class="topStats">
      <TopStat>
        <template #stat>
            {{ dDm }}
        </template>
        <template #icon>
          <icnDM />
        </template>
      </TopStat>
      <TopStat>
        <template #stat>
            {{ dH }}
        </template>
        <template #icon>
          <h3>H</h3>
        </template>
      </TopStat>
      <TopStat>
        <template #stat>
            {{ dc }}
        </template>
        <template #icon>
          <icnDC />
        </template>
      </TopStat>
    </div>
    <div class="btnNavigation">
      <div class="btnGame">
        <RouterLink to="/RPS">
          <img class="space_img" :src="iRps">
        </RouterLink>
      </div><br>
      <div class="btnGame">
        <RouterLink to="/SC">
          <img class="space_img" :src="iSc">
        </RouterLink>
      </div>
    </div>
    <div class="universe">
      <div class="centerU">
        <icnSNG class="ds_img" /> 
        <div class="deiz">
          <TopStat>
              <template #stat>
                  {{ dDe }}
              </template>
              <template #icon>
                  <icnDE/>
              </template>
          </TopStat>
        </div>
      </div>
      <div class="spc">
        <Spaces v-for="space in spaces" :id="'space'+space.id">
          <template #spot>
              <div :id="'spot'+space.id" @click="spaceClick(space.id)">
                <img :id="'simg'+space.id" class="space_img" :src="iPlus" >
              </div>
            </template>
            <template #stat><div :id="'stat'+space.id" v-if="space.state !== 'empty'">{{space.value.toFixed(1)}}</div></template>
            <template #number class="iz_spc">{{ space.id }}</template>
        </Spaces>
      </div>
    </div>
    <div class="inv_set" id="invset">
      <div v-show="tmp_inv === 'wh'">
        <div>Create White hole:</div>
        <div class="inv_setting" v-for="i in whm" :id="'it'+i" @click="whiteHole(i)">
          {{((0.1*(Math.PI)**i)).toFixed(2)}}
        </div >
        <div class="inv_setting" id="whup" @click="whiteHole('up')">{{((0.1*(Math.PI)**(whm+2))).toFixed(2)}}DM</div>
      </div>
      <div v-show="tmp_inv === 'sun_nebula'">
        <div>Create Sun:</div>
        <div class="inv_setting" v-for="i in 3" :id="'sun'+i" @click="sunSet(i)">{{10**i}}H</div>
      </div>
      <div v-show="tmp_inv === 'dcoin'">
        <div>Create DarkCoin:</div>
        <div class="inv_setting" v-for="i in 1" :id="'dc'+i">{{1}}DM</div>
      </div>
    </div>
    <div class="game_panel">
      <div class="cCrt" v-if="sCreate">
        <div class="navCrt">Create</div>
        <div class="navInv" @click="show('inv')">Inventory</div>
        <div class="creations">
          <div class="itm" id="sun_nebula">
            <img class="inv_img" :src="iSun" @click="invenClick('sun_nebula')">
            <div class="itm_stat" id="iz_sun"> Sun</div>
          </div>
          <div class="itm" id="wh">
            <img class="inv_img" :src="iBlackHole" @click="invenClick('wh')">
            <div class="itm_stat" id="iz_wh">WH</div>
          </div>
          <div class="itm" id="dcoin">
            <img class="inv_img" :src="iDcoin" @click="invenClick('dcoin')">
            <div class="itm_stat" id="iz_dc"> DC</div>
          </div>
        </div>
      </div>
      <div class="cInv" v-if="sInventory">
        <div class="navCrt2" @click="show('crt')">Create</div>
        <div class="navInv2">Inventory</div>
        <div class="storage">
          <div class="itm" v-for="sun in invSun" :id="sun.name" @click="invenClick(sun.name)">
            <img class="inv_img" :id="sun.name" :src="iDMcolision">
            <div>{{sun.name +":"+sun.qnt}}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const FORCE = 0.000666;
const PASSIVE = 0.000479;
let gSet = new Date()
let gTim = Math.round((gSet.getTime())/1000)
export default {
  data() {
    return {
      tmp_inv: "nic",
      tmp_sun: "bd",
      dcS: 1,
      sunS: 1,// selected sun
      whs: 1, // selected wh size
      wh_size: (0.1*(Math.PI)**1), //compute wh_size

      sCreate: true,
      sInventory: false,

      tim: localStorage.getItem("tim") || gTim,
      dm: Number(localStorage.getItem("dm")) || 0.999,
      de: Number(localStorage.getItem("de")) || 0.999,
      dc: Number(localStorage.getItem("dc")) || 5,
      dc_t: Number(localStorage.getItem("dc_t")) || 5,
      dc_count: Number(localStorage.getItem("dc_count")) || 0,
      h:  Number(localStorage.getItem("h")) || 99,
      sc: Number(localStorage.getItem("sc")) || 0,
      whm: Number(localStorage.getItem("whm")) || 1,
      spaces: JSON.parse(localStorage.getItem("spaces")) || [
        {id: 0, state:"empty", value: 0, end: 0, item: 'nic'},
      ],
      invSun: JSON.parse(localStorage.getItem("invSun")) || [
        {id: 0, name: "bd", qnt: 0, value: 10},
        {id: 1, name: "s", qnt: 0, value: 100},
        {id: 2, name: "ms", qnt: 0, value: 1000},
        //{id: 3, name: "gs", qnt: 0, value: 10000},
        //{id: 4, name: "sgs", qnt: 0, value: 100000},
      ],
    }
  },
  computed: {
    dDe(){
      return this.de.toFixed(3)
    },
    dDm(){
      return this.dm.toFixed(3)
    },
    dH(){
      return Math.floor(this.h)
    }
  },
  methods: {
    spaceTime: function(){
      if(this.de - PASSIVE > 0){
        this.dm += FORCE + PASSIVE
        this.de -= FORCE
      }else if(this.de > 0 && this.de<=PASSIVE){
          this.dm += this.de
          this.de = 0
      }else{
          this.de = 0
      }
      if(this.dc_t <5){
        this.dc_count ++
        if(this.dc_count >= 10000){
          this.dc_t ++
          this.dc ++
          this.dc_count = 0
        }
      }
    },
    spacesSpacetime: function() {
      for(let i = 0; i <= this.spaces.length-1; i++){
        if(this.spaces[i].state !== "empty"){
          switch(this.spaces[i].state){
            case "wh":
              if(this.spaces[i].value- 0.2>= 0){
                this.spaces[i].value -=0.2
                this.h += 0.2
                break
              }else if(this.spaces[i].value -0.2 <0){
                if(this.spaces[i].value >=0){
                  this.h += this.spaces[i].value
                  this.h = Math.round(this.h*1000)/1000
                  this.spaces[i] = {id: i, state:"empty", value: 0, end: 0, item: "nic"}
                  if(document.getElementById("simg"+i) !== null){
                    document.getElementById("simg"+i).setAttribute("src", iPlus)
                  }
                  break
                }
                break
              }
            break
            case "sun_nebula":
              if(this.spaces[i].value> 0){
                this.spaces[i].value -=1
                break
              }else if(this.spaces[i].value <=0){
                for(let y = 0; y < this.invSun.length; y++){
                  if(this.spaces[i].item === this.invSun[y].name){
                    this.invSun[y].qnt ++
                    this.spaces[i] = {id: i, state:"empty", value: 0, end: 0, item: "nic"}
                    break
                  }
                }
                if(document.getElementById("simg"+i) !== null){
                  document.getElementById("simg"+i).setAttribute("src", iPlus)
                }
                break
              }
            break
            case "sun":
              if(this.spaces[i].value- 0.5> 0){
                this.spaces[i].value -=0.5
                this.de += 0.005
                break
              }else if(this.spaces[i].value -0.5 <=0){
                if(this.spaces[i].value >0){
                  this.de += this.spaces[i].value/100
                  this.spaces[i] = {id: i, state:"empty", value: 0, end: 0, item: "nic"}
                  if(document.getElementById("simg"+i) !== null){
                    document.getElementById("simg"+i).setAttribute("src", iPlus)
                  }
                break
                }
              }
            break   
            case "dcoin":
              if(this.spaces[i].value > 0){
                this.spaces[i].value -= 1
                break
              }else{
                this.dc += 1
                this.spaces[i] = {id: i, state:"empty", value: 0, end: 0, item: "nic"}
                if(document.getElementById("simg"+i) !== null){
                  document.getElementById("simg"+i).setAttribute("src", iPlus)
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
        this.spaces.push({id: this.sc, state:"empty", value: 0, end: 0, item: 0})
      }else if(this.de < (1*(10**(this.sc-1))) && this.de > 1){
        if(this.sc > 1){
          if(this.spaces[this.sc] != undefined){
            if(this.spaces[this.sc].state != "empty") 
              switch(this.spaces[this.sc].state){
                case "sun_nebula":
                  this.h += (this.spaces[this.sc].end) * 0.9 
                break
                case "wh":
                  this.dm += (this.spaces[this.sc].value*0.9) * 0.01
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
                this.dm += (this.spaces[1].value*0.9)*0.01 
              break
              case "sun":
                this.h += this.spaces[1].value  * 0.9
              break
              case "sun_nebula":
                  this.h += (this.spaces[1].end) * 0.9 
              break   
            }
          }
          this.sc = 0
          this.spaces.pop()
        }
      }
    },
    spaceClick: function(id){
      let tmp_st = ""
      if(this.spaces[id].state === "empty" && this.tmp_inv !="nic"){
        switch(this.tmp_inv){
          case "wh":
            if(this.dm>= this.wh_size){
              this.dm -= this.wh_size
              this.spaces[id] = {id: id, state:"wh", value: this.wh_size*100, end: this.wh_size, item: "wh"}
              document.getElementById("simg"+id).setAttribute("src", iBlackHole)
              this.saveTime()
              break
            }
          break
          case "sun_nebula":
            for(let i = 0; i < this.invSun.length; i++){
              if(this.invSun[i].value === 10**this.sunS){
                this.tmp_sun = this.invSun[i].name
                tmp_st = i
              }
            }
            if(this.h >= (10**this.sunS)){ 
              if(tmp_st === 0){
                this.h -=10**this.sunS 
                this.spaces[id] = {id: id, state:"sun_nebula", value: 10**this.sunS/10, end: 10**this.sunS/10, item: this.tmp_sun}
                document.getElementById("simg"+id).setAttribute("src", iDMcolision)
                this.saveTime()
                break
              }else{
                console.log(tmp_st)
                console.log(this.invSun[(tmp_st-1)])
                if(this.invSun[tmp_st-1].qnt >= 1){
                  this.h -=10**this.sunS  
                  this.invSun[tmp_st-1].qnt -= 1     
                  this.spaces[id] = {id: id, state:"sun_nebula", value: 10**this.sunS/10, end: 10**this.sunS/10, item: this.tmp_sun}
                  document.getElementById("simg"+id).setAttribute("src", iDMcolision)
                  this.saveTime()
                  break
                } 
              }
            }
          break
          case "dcoin":
            if(this.dm >= 1){  
              this.dm -= 1       
              this.spaces[id] = {id: id, state:"dcoin", value: 974, end: 974, item: "dc"}
              document.getElementById("simg"+id).setAttribute("src", iDcoin)
              this.saveTime()
              break
            }
          break
          case "bd":
            if(this.invSun[0].qnt >= 1){  
              this.invSun[0].qnt -= 1       
              this.spaces[id] = {id: id, state:"sun", value: this.invSun[0].value, end: this.invSun[0].value, item: "bd"}
              document.getElementById("simg"+id).setAttribute("src", iSunRad)
              this.saveTime()
              break
            }
          break
          case "s":
            if(this.invSun[1].qnt >= 1){  
              this.invSun[1].qnt -= 1       
              this.spaces[id] = {id: id, state:"sun", value: this.invSun[1].value + this.invSun[0].value, end: this.invSun[1].value + this.invSun[0].value, item: "s"}
              document.getElementById("simg"+id).setAttribute("src", iSunRad)
              this.saveTime()
              break
            }
          break
          case "ms":
            if(this.invSun[2].qnt >= 1){  
              this.invSun[2].qnt -= 1       
              this.spaces[id] = {id: id, state:"sun", value: this.invSun[2].value + this.invSun[1].value, end: this.invSun[2].value + this.invSun[1].value, item: "ms"}
              document.getElementById("simg"+id).setAttribute("src", iSunRad)
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
          if(this.tmp_inv === "nic"){
            document.getElementById("wh").style.borderColor = "yellow"
            document.getElementById("invset").style.display = "block"
            document.body.style.cursor = "cell"
            this.tmp_inv = "wh"
            break
          }else if(this.tmp_inv === "wh"){
            document.body.style.cursor = "default"
            document.getElementById("wh").style.borderColor = "gray"
            document.getElementById("invset").style.display = "none"
            this.tmp_inv = "nic"
            break
          }else if(this.tmp_inv !== "wh"){
            document.getElementById(this.tmp_inv).style.borderColor = "gray"
            document.getElementById("invset").style.display = "block"
            document.getElementById("wh").style.borderColor = "yellow"
            this.tmp_inv = "wh"
            break
          }
          break
        case "sun_nebula":
          if(this.tmp_inv === "nic"){
            document.getElementById("sun_nebula").style.borderColor = "yellow"
            document.getElementById("invset").style.display = "block"
            document.body.style.cursor = "cell"
            this.tmp_inv = "sun_nebula"
            break
          }else if(this.tmp_inv === "sun_nebula"){
            document.body.style.cursor = "default"
            document.getElementById("sun_nebula").style.borderColor = "gray"
            document.getElementById("invset").style.display = "none"
            this.tmp_inv = "nic"
            break
          }else if(this.tmp_inv !== "sun_nebula"){
            document.getElementById(this.tmp_inv).style.borderColor = "gray"
            document.getElementById("sun_nebula").style.borderColor = "yellow"
            this.tmp_inv = "sun_nebula"
            break
          }
        break
        case "dcoin":
          console.log(this.dc_t)
          if(this.tmp_inv === "nic"){
            document.getElementById("dcoin").style.borderColor = "yellow"
            document.getElementById("invset").style.display = "block"
            document.body.style.cursor = "cell"
            this.tmp_inv = "dcoin"
            break
          }else if(this.tmp_inv === "dcoin"){
            document.body.style.cursor = "default"
            document.getElementById("dcoin").style.borderColor = "gray"
            document.getElementById("invset").style.display = "none"
            this.tmp_inv = "nic"
            break
          }else if(this.tmp_inv !== "dcoin"){
            document.getElementById(this.tmp_inv).style.borderColor = "gray"
            document.getElementById("dcoin").style.borderColor = "yellow"
            this.tmp_inv = "dcoin"
            break
          }
        break
        case "bd":
          if(this.tmp_inv === "nic"){
            document.getElementById("bd").style.borderColor = "yellow"
            document.getElementById("invset").style.display = "block"
            document.body.style.cursor = "cell"
            this.tmp_inv = "bd"
            break
          }else if(this.tmp_inv === "bd"){
            document.body.style.cursor = "default"
            document.getElementById("bd").style.borderColor = "gray"
            document.getElementById("invset").style.display = "none"
            this.tmp_inv = "nic"
            break
          }else if(this.tmp_inv !== "bd"){
            document.getElementById(this.tmp_inv).style.borderColor = "gray"
            document.getElementById("bd").style.borderColor = "yellow"
            this.tmp_inv = "bd"
            break
          }
        break
        case "s":
          if(this.tmp_inv === "nic"){
            document.getElementById("s").style.borderColor = "yellow"
            document.getElementById("invset").style.display = "block"
            document.body.style.cursor = "cell"
            this.tmp_inv = "s"
            break
          }else if(this.tmp_inv === "s"){
            document.body.style.cursor = "default"
            document.getElementById("s").style.borderColor = "gray"
            document.getElementById("invset").style.display = "none"
            this.tmp_inv = "nic"
            break
          }else if(this.tmp_inv !== "s"){
            document.getElementById(this.tmp_inv).style.borderColor = "gray"
            document.getElementById("s").style.borderColor = "yellow"
            this.tmp_inv = "s"
            break
          }
        break
        case "ms":
          if(this.tmp_inv === "nic"){
            document.getElementById("ms").style.borderColor = "yellow"
            document.getElementById("invset").style.display = "block"
            document.body.style.cursor = "cell"
            this.tmp_inv = "ms"
            break
          }else if(this.tmp_inv === "ms"){
            document.body.style.cursor = "default"
            document.getElementById("ms").style.borderColor = "gray"
            document.getElementById("invset").style.display = "none"
            this.tmp_inv = "nic"
            break
          }else if(this.tmp_inv !== "ms"){
            document.getElementById(this.tmp_inv).style.borderColor = "gray"
            document.getElementById("ms").style.borderColor = "yellow"
            this.tmp_inv = "ms"
            break
          }
        break
        case "gs":
          if(this.tmp_inv === "nic"){
            document.getElementById("gs").style.borderColor = "yellow"
            document.getElementById("invset").style.display = "block"
            document.body.style.cursor = "cell"
            this.tmp_inv = "gs"
            break
          }else if(this.tmp_inv === "gs"){
            document.body.style.cursor = "default"
            document.getElementById("gs").style.borderColor = "gray"
            document.getElementById("invset").style.display = "none"
            this.tmp_inv = "nic"
            break
          }else if(this.tmp_inv !== "gs"){
            document.getElementById(this.tmp_inv).style.borderColor = "gray"
            document.getElementById("gs").style.borderColor = "yellow"
            this.tmp_inv = "gs"
            break
          }
        break
        case "sgs":
          if(this.tmp_inv === "nic"){
            document.getElementById("sgs").style.borderColor = "yellow"
            document.getElementById("invset").style.display = "block"
            document.body.style.cursor = "cell"
            this.tmp_inv = "sgs"
            break
          }else if(this.tmp_inv === "sgs"){
            document.body.style.cursor = "default"
            document.getElementById("sgs").style.borderColor = "gray"
            document.getElementById("invset").style.display = "none"
            this.tmp_inv = "nic"
            break
          }else if(this.tmp_inv !== "sgs"){
            document.getElementById(this.tmp_inv).style.borderColor = "gray"
            document.getElementById("sgs").style.borderColor = "yellow"
            this.tmp_inv = "sgs"
            break
          }
        break
      }
    },
    whiteHole: function(i){
      if(i === "up"){
        if(this.dm >= ((0.1*(Math.PI)**(this.whm+2)))){
          this.dm -= ((0.1*(Math.PI)**(this.whm+2)))
          this.whm ++
        }
      }else{
        this.whs = i
        this.wh_size = ((0.1*(Math.PI)**(this.whs)))
        console.log(this.wh_size)
        for(let y = 1; y<=this.whm; y++){
          document.getElementById("it"+y).style.borderColor = "gray"
        }
        document.getElementById("it"+this.whs).style.borderColor = "yellow"
      }
    },
    show: function(show){
      if(show === 'inv'){
        this.sInventory = !this.sInventory
        this.sCreate = !this.sCreate
        document.body.style.cursor = "default"
            this.tmp_inv = "nic"
      }else if(show === 'crt'){
        this.sCreate = !this.sCreate
        this.sInventory = !this.sInventory
        document.body.style.cursor = "default"
        this.tmp_inv = "nic"
      }
    },
    resetImg: function(){
      for(let i = 0; i <= this.spaces.length-1; i++){
        switch(this.spaces[i].state){
          case "wh":
            document.getElementById("simg"+i).setAttribute("src", iBlackHole)
          break  
          case "sun_nebula":
            document.getElementById("simg"+i).setAttribute("src", iDMcolision)
          break  
          case "sun":
            document.getElementById("simg"+i).setAttribute("src", iSun)
          break  
          case "dcoin":
            document.getElementById("simg"+i).setAttribute("src", iDcoin)
          break  
        }
      }
    },
    saveTime: function(){
      let set = new Date()
      let tim = Math.round((set.getTime())/1000)
      localStorage.setItem('tim', tim)
      localStorage.setItem('dm', this.dm)
      localStorage.setItem('de', this.de)
      localStorage.setItem('dc', this.dc)
      localStorage.setItem('dc_t', this.dc_t)
      localStorage.setItem('dc_count', this.dc_count)
      localStorage.setItem('h', this.h)
      localStorage.setItem('sc', this.sc)
      localStorage.setItem('whm', this.whm)
      localStorage.setItem('spaces', JSON.stringify(this.spaces))
      localStorage.setItem('invSun', JSON.stringify(this.invSun))
    },
    rebuildTime: function(){
      let timeWarp = gTim - this.tim
      for(let i = 0; i<=timeWarp; i++){
        this.spaceTime()
        this.countSpaces()
        this.spacesSpacetime()
      }
    },
    sunSet: function(i){
      this.sunS = i      
      console.log(this.sunS)
        for(let y = 1; y <= 3; y++){
          document.getElementById("sun"+y).style.borderColor = "gray"
        }
        document.getElementById("sun"+i).style.borderColor = "yellow"
    },
    crtClick: function(i){
      if(this.crt[i].state === "empty" && this.tmp_crt !="nic"){
        switch(this.tmp_crt){
          case "gg":
            break
        }
      }
    },
    deleteTime: function(){
        localStorage.clear()
    },
  },
  created(){
    if(localStorage.getItem("dc") === null){
      console.log("saved")
      this.saveTime()
    }
    if(localStorage.getItem("dm") === "0"){
      this.dm = 0
    }
    if(localStorage.getItem("de") === "0"){
      this.de = 0
    }
    if(localStorage.getItem("dc") === "0"){
      this.dc = 0
    }
    if(localStorage.getItem("dc_t") === "0"){
      this.dc_t = 0
    }
    if(localStorage.getItem("h") === "0"){
      this.h = 0
    }
  },
  mounted(){
    this.time = setInterval(()=>{
      this.spaceTime()
      this.countSpaces()
      this.spacesSpacetime()
    },1000)
    this.rebuildTime()
    this.resetImg()
  },
  updated(){
    this.resetImg()
  }   
}
</script>

<style scoped>
#bd{
  content: v-bind(iBds);
}

.game_panel{
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0%;
  left: 0%;
  height: 13vh;
  width: 100vw;
  color: whitesmoke;
  z-index: 3;
}
.navCrt{
  background-color:#282828;
  box-shadow: 0.1vh -0.5vh 5vh black;
  text-shadow: 2px 2px black;
  text-align: center;
  width: 50vw;
  height: 3.5vh;
  border-radius: 50% 50% 100% 0 / 50% 100% 50% 0;
}
.navInv{
  position: absolute;
  border-top: 1px solid black;
  right: 0%;
  background-color: gray;
  text-align: center;
  width: 50vw;
  height: 3.5vh;
  top: -0.01em;
  z-index: 1;
  box-shadow:
  0.1vh -0.5vh 5vh black,
  inset 0.1vh -0.1vh 2vh black;
  text-shadow: 2px 2px black;
  border-radius: 50% 50% 0 100% / 100% 50% 0 50% ;
}
.creations{
  position: absolute;
  bottom: 0%;
  height: 10.5vh;
  width: 100vw;
  z-index: 0;
  background-color:#282828;
  background-size:16px 16px;
}
.navCrt2{
  position: absolute;
  background-color:#282828;
  box-shadow: 
  0.1vh -0.5vh 1vh black,
  inset 0.1vh -0.1vh 2vh black;
  text-shadow: 2px 2px black;
  background-size:16px 16px;
  background-size:16px 16px;
  text-align: center;
  z-index: 1;
  width: 50vw;
  height: 3.5vh;
  border-radius: 50% 50% 100% 0 / 50% 100% 50% 0;
}
.navInv2{
  position: absolute;
  border-top: 1px solid black;
  right: 0%;
  background-color: gray;
  text-align: center;
  width: 50vw;
  height: 3.5vh;
  top: -0.01em;
  z-index: 0;
  box-shadow: 
  0.1vh -0.5vh 5vh black;
  text-shadow: 2px 2px black;
  border-radius: 50% 50% 0 100% / 100% 50% 0 50% ;
}
.storage{
  position: absolute;
  bottom: 0%;
  height: 10.5vh;
  width: 100vw;
  z-index: 0;
  background-color:gray;
  background-size:16px 16px;
}
.topStats{
  position: fixed;
  width: 100vw;
  
  display: flex;
  justify-content: space-between;
}
.universe{
  position: absolute;
  top: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.btnNavigation{
  position: fixed;
  top: 7vh;
  right: 4vw;
  z-index: 2;
}
.btnGame{
  display: flex;
  align-self: flex-end;
  align-items: center; 
  justify-content: center;
  background-color: white;
  border-radius: 5em;
  width: 2em;
  height: 2em;
}
.centerU{
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
}
.ds_img{
  background-color: whitesmoke;
  border-radius: 5em;
}
.deiz{
    justify-content: center;
}
.inv_items{
  position: absolute;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  overflow-x: auto;
  border: 2px solid whitesmoke;
  background-image: linear-gradient(to bottom right, rgb(114, 103, 103), rgb(206, 206, 206));
  border-radius: 10px;
  width: 90%;
  height: 9%;
  margin: 0.5em;
  bottom: 0.01em;
  padding-bottom: 1em;
  z-index: 3;
}
.itm{
  display: inline-block;
  border: 2px solid whitesmoke;
  border-radius: 10px;
  height: 2em;
  width: 2em;
  margin: 0.9em;
}
#it1{
  border-color: yellow;
}
#dc1{
  border-color: yellow;
}
#whup{
  border-color: green;
}
#sun1{
  border-color: yellow;
}
.inv_img{
  height: 2em;
  width: 2em;
  background-color: white;
  border-radius: 7px;
}
.inv_set{
  display: none;
  position: fixed;
  border: 1px solid gray;
  background-color: whitesmoke;
  border-radius: 10px;
  width: 100vw;
  bottom: 13vh;
  z-index: 4;
}
.inv_setting{
  display: inline-flex;
  justify-content: center;
  border: 2px solid gray;
  border-radius: 10px;
  height: 1em;
  width: 4em;
  margin: 0.5em;
}
.crt_sun{
  color: white;
  display: inline-block;
  padding: 1vh;
  border: 2px solid whitesmoke;
  border-radius: 10px;
  height: 1.5em;
  width: 5em;}
.crt_wait{
  border: 2px solid white;
  background-color: whitesmoke;
  border-radius: 10px;
  width: 90%;
  height: 9%;
  margin: 1em;
  bottom: 3.8em;
}
.crt_img{
  height: 9vh;
  width: 9vw;
  background-color: white;
  border: 1px solid gray;
  border-radius: 7px;
  
}
.spc{
  position: absolute;
  width: 200vw;
  height: 100vh;
  color: whitesmoke;
  overflow: auto;
  z-index: 1;
}
#space0{
  top: 50vh;
  left: 100vw;
  animation: orbit0 239s linear infinite;
}
#space1{
  top: 50vh;
  left: 100vw;
  animation: orbit1 300s linear infinite;
}
#space2{
  top: 50vh;
  left: 100vw;
  animation: orbit2 369s linear infinite;
}
#space3{
  top: 50vh;
  left: 100vw;
  animation: orbit3 512s linear infinite;
}
#space4{
  top: 50vh;
  left: 100vw;
  animation: orbit4 444s linear infinite;
}
#space5{
  top: 50vh;
  left: 100vw;
  animation: orbit5 439s linear infinite;
}
#space6{
  top: 50vh;
  left: 100vw;
  animation: orbit6 916s linear infinite;
}
#space7{
  top: 50vh;
  left: 100vw;
  animation: orbit7 962s linear infinite;
}
.space_img{
  border-radius: 5em;
  width: 3em;
  height: 3em;
  z-index: -1;
  float: left;
}
@keyframes orbit0 {
  from {
    transform: rotate(0deg) translateX(8em) translateY(-5em) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(8em) translateY(-5em) rotate(-360deg);
  }
}
@keyframes orbit1 {
  from {
    transform: rotate(0deg) translateX(-13em) translateY(5em) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(-13em) translateY(5em) rotate(-360deg);
  }
}
@keyframes orbit2 {
  from {
    transform: rotate(0deg) translateX(-9em) translateY(-15em) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(-9em) translateY(-15em) rotate(-360deg);
  }
}
@keyframes orbit3 {
  from {
    transform: rotate(0deg) translateX(18em) translateY(10em) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(18em) translateY(10em) rotate(-360deg);
  }
}
@keyframes orbit4 {
  from {
    transform: rotate(0deg) translateX(11em) translateY(15em) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(11em) translateY(15em) rotate(-360deg);
  }
}
@keyframes orbit5 {
  from {
    transform: rotate(0deg) translateX(-10em) translateY(13em) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(-10em) translateY(13em) rotate(-360deg);
  }
}
@keyframes orbit6 {
  from {
    transform: rotate(0deg) translateX(0em) translateY(20em) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(0em) translateY(20em) rotate(-360deg);
  }
}
@keyframes orbit7 {
  from {
    transform: rotate(0deg) translateX(-3em) translateY(-20em) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(-3em) translateY(-20em) rotate(-360deg);
  }
}
</style>
