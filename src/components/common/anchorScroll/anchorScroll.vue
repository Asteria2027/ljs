
<template>
  <div class="scrollBox" ref="scrollBox">
      <slot>

      </slot>
  </div>
</template>

<script>
export default {
  props: {
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isScrolling: false
    };
  },
  mounted() {
    this.initScorllTo(this.scrollTop);
  },

  methods: {
    scrollTo(start, end){
      if(this.isScrolling) {
        clearInterval(timerId);
      }
      const step = (end - start)/100;
      let _this = this;
      // 注意了 _this.$refs.scrollBox.scrollTop 只能取整数啊 不会有小数的，会自己取整数
      let timerId = setInterval(function () {
        _this.$refs.scrollBox.scrollTop += step;
        _this.isScrolling = true;
        if( Math.abs(end - _this.$refs.scrollBox.scrollTop)  < Math.abs(step) ) {
          _this.$refs.scrollBox.scrollTop = end;
            clearInterval(timerId);
        }
       }, 1)
    },
    initScorllTo(end) {
      this.$refs.scrollBox.scrollTop = end;
    }
  },
  watch: {
    scrollTop(newScrollTop, oldScrollTop) {
      this.scrollTo(oldScrollTop,newScrollTop);
    }
  }
}

</script>
<style lang='less' scoped>
.scrollBox {
    overflow: auto;
    position: absolute;
    top: 1.75rem;
    left: 0;
    right: 0;
    bottom: 0;
}


</style>