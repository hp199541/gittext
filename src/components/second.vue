<template>
    <div class="second">
        <button style="color:white">{{time}}</button>
    </div>
</template>
<script>
// import {} from '@/api/index'
  export default{
    data () {
      return {
        time : '',
        flag : false,
        endTime:1690387009000
      }
    },
    mounted () {
      let time = setInterval(()=>{
        if(this.flag == true){
          clearInterval(time)
        }
        this.timeDown()
      },500)
    },
    methods : {
      timeDown () {
        const endTime = new Date(this.endTime)
        const nowTime = new Date();
        let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
        let d = parseInt(leftTime/(24*60*60))
        let h = this.formate(parseInt(leftTime/(60*60)%24))
        let m = this.formate(parseInt(leftTime/60%60))
        let s = this.formate(parseInt(leftTime%60))
        if(leftTime <= 0){
          this.flag = true
          this.$emit('time-end')
        }
        this.time = `${d}D,${h}:${m}:${s}`
      },
      formate (time) {
        if(time>=10){
          return time
        }else{
          return `0${time}`
        }
      }
    }
  }
</script>
<style lang="scss" src="@/assets/scss/index.scss"></style>