<template>
    <div class="space">
        <div class="spots">
          <slot name="spot"></slot>
        </div>
        <div class="stats">
            <slot name="stat"></slot>
        </div>
        <div class="numbers">
          <slot name="number"></slot>
        </div>
    </div>
</template>

<style scoped>
.space{
  font-size: 0.74em;
  position: absolute;
  align-items: center;
}
.spots{
  display: flex;
  align-items: center; 
  justify-content: center;
  border: 2px solid whitesmoke;
  background-color: white;
  border-radius: 5em;
  width: 3em;
  height: 3em;
}
.stats{
  display: flex;
  align-items: center;
}
.numbers{
  position: inherit;
  border: 2px solid violet;
  border-radius: 10em;
  top: -0.2em;
  width: 1em;
  height: 1em;
  text-align: center;
  color: violet;
  background-color: white;
  z-index: 1;
}
</style>