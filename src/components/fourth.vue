<template>
  <div class="fourth">
    <div class="gamerules_title">{{transify['RULES']}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed : {
    transify() {
      return this.$bus.$data.transify
    }
  }
}
</script>