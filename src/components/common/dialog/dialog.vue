<template>
  <div class="dialog">
      <div class="dialog_con">
          <slot></slot>
            <div class="dialog_con_btn">
                <span @click="leftBtn">{{dialog.btn.leftText}}</span>
                <span @click="rightBtn">{{dialog.btn.rightText}}</span>
            </div>
      </div>
      <div class="dialog_mark" @click='tapMark'>

      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dialog: {
      type: Object,
      default: function () {
        return { 
            btn: {
                leftText: "取消",
                rightText: "确定"
            }
         }
      }
    },
  },
  methods: {
    leftBtn() {
      this.$emit("leftBtn");
    },
    rightBtn() {
      this.$emit("rightBtn");
    },
    tapMark() {
      this.$emit("tapMark");
    }
  }
};
</script>
<style lang='less' scoped>
.dialog {
  .dialog_con {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translateX(-50%) translateY(-50%);
    background-color: #fff;
    border-radius: 4px;
    z-index: 1002;
    .dialog_con_btn {
      border-top: 1px solid #ddd;
      span {
        display: block;
        float: left;
        box-sizing: border-box;
        width: 50%;
        text-align: center;
        font-size: 0.28rem;
        line-height: 0.8rem;
        &:first-child {
          border-right: 1px solid #ddd;
        }
      }
    }
  }
  .dialog_mark {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1001;
  }
}
</style>