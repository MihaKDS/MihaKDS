<template>
    <div class="item">
        <div class="content">
          <slot name="stat"></slot>
        </div>
        <div class="icon">
          <slot name="icon">
          </slot>
        </div>
    </div>
</template>

<style scoped>
.item{
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0.1em;
  justify-content: end;
  align-items: center;
  text-align: center;
  max-height: 1.5em;
  min-width: 3em;
  max-width:  8em;
  border:1px solid black;
  color: black;
  background-color: whitesmoke;
  border-radius: 10px;
}
</style>