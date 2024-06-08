<script setup>
import TopStat from './TopStat.vue';
import Spaces from './Spaces.vue';
import IconDarkEnergy from './icons/IconDarkEnergy.vue';
import IconSingularity from './icons/IconSingularity.vue';
</script>

<template>
    <div class="uni">
        <IconSingularity />
        <div class="deiz">
            <TopStat>
                <template #stat>
                    {{ de.toFixed(3) }}
                </template>
                <template #icon>
                    <IconDarkEnergy/>
                </template>
            </TopStat>
        </div>
        <div class="spc">
            <Spaces v-for="space in spaces" :id="'space'+space.id">
                <template #spot>
                    <div :id="'spot'+space.id" @click="clickspace(space.id)">
                      <img :id="'simg'+space.id" class="space_img" src="../assets/Plus.png" >
                    </div>
                  </template>
                  <template #stat><div :id="'stat'+space.id" v-if="space.state !== 'empty'">{{space.value.toFixed(1)}}</div></template>
                  <template #number class="iz_spc">{{ space.id }}</template>
            </Spaces>
        </div>
        <div class="inv_set" id="invset">
            <div class="inv_setting" id="it0" @click="clickSet(0)">0.1</div>
            <div class="inv_setting" id="it1" @click="clickSet(1)">0.3</div>
            <div class="inv_setting" id="it2" @click="clickSet(2)">0.9</div>
        </div>
        <div class="inv_items">
            <div class="itm" id="wh">
            <img class="inv_img" src="../assets/bbh_rad.png" @click="clickinven('wh')">
            <div class="itm_stat" id="iz_wh">white</div>
            </div>
            <div class="itm" id="sun">
            <img class="inv_img" src="../assets/bbh.png" @click="clickinven('sun')">
            <div class="itm_stat" id="iz_wh"> sun{{ (3)**0 }}</div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Universe",
        props: {
            de:{
                type: Number,
                required: true,
            },
            spaces:{
                type: Object,
                required: true,
            }
        },
        methods: {
            clickspace(id) {
                this.$emit('spClick', id)
            },
            clickinven(itm) {
                this.$emit('inClick', itm)
            },
            clickSet(i){
                this.$emit('whs', i)
            }
        }
    }
</script>

<style scoped>
.uni{
    background-color: darkgray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.deiz{
    position: inherit;
    justify-content: center;
}
.inv_items{
    position: absolute;
    border: 2px solid gray;
    border-radius: 10px;
    width: 90%;
    margin: 1em;
    bottom: 3em;
  }
  .itm{
    display: inline-block;
    border: 2px solid gray;
    border-radius: 10px;
    height: 4em;
    width: 4em;
    margin: 0.5em;
  }
  #it0{
    border-color: yellow;
  }
.inv_img{
    height: 4em;
    width: 4em;
    background-color: white;
    border-radius: 7px;
  }
  .inv_set{
    display: none;
    position: absolute;
    border: 2px solid gray;
    border-radius: 10px;
    width: 90%;
    margin: 1em;
    bottom: 10em;
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
.spc{
    position: absolute;
}
#space0{
    animation: orbit0 256s linear infinite;
  }
  #space1{
    animation: orbit1 300s linear infinite;
  }
  #space2{
    animation: orbit2 365s linear infinite;
  }
  #space3{
    animation: orbit3 512s linear infinite;
  }
  #space4{
    animation: orbit4 444s linear infinite;
  }
  #space5{
    animation: orbit5 456s linear infinite;
  }
  .space_img{
    border-radius: 5em;
    width: 4em;
    height: 4em;
    z-index: -1;
    float: left;
  }
  @keyframes orbit0 {
    from {
      transform: rotate(0deg) translateX(6em) translateY(-5em) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(6em) translateY(-5em) rotate(-360deg);
    }
  }
  @keyframes orbit1 {
    from {
      transform: rotate(0deg) translateX(-10em) translateY(5em) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(-10em) translateY(5em) rotate(-360deg);
    }
  }
  @keyframes orbit2 {
    from {
      transform: rotate(0deg) translateX(-9em) translateY(-10em) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(-9em) translateY(-10em) rotate(-360deg);
    }
  }
  @keyframes orbit3 {
    from {
      transform: rotate(0deg) translateX(11em) translateY(-10em) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(11em) translateY(-10em) rotate(-360deg);
    }
  }
  @keyframes orbit4 {
    from {
      transform: rotate(0deg) translateX(11em) translateY(9em) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(11em) translateY(9em) rotate(-360deg);
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
</style>