<template>
    <div class="item">
        <div class="content">
          <slot name="stat"></slot>
        </div>
        <div class="icon">
          <slot name="icon"></slot>
        </div>
    </div>
</template>

<style scoped>
.item{
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0.2em;
  justify-content: end;
  padding: 0.1em;
  max-height: 2em;
  width: 6em;
  min-width: 5em;
  max-width:  8em;
  border:1px solid black;
  color: black;
  background-color: whitesmoke;
  border-radius: 10px;
}
</style>