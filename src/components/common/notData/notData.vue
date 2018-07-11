<template>
    <div class="notData">
      <img src="./lianlian@2x.png">
      <slot name='hint'></slot>
    </div>
</template>
<style lang="less" scoped>
  .notData {
    text-align: center;
      img {
        display: block;
        margin: 3rem auto 0.3rem;
        width: 1.5rem;
        height: 1.5rem;
      }
      p {
        font-size: 0.23rem;
        text-align: center;
        color: #9d9d9d;
      }
}
</style>
