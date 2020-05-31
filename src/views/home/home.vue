<template>
  <div class="home-page">
    <section class="home">
    <p class="first-top">
      <span>{{transify['COMMON_CONTINUE_PURCHASE']}}</span>
    </p>
    <div class="first-middle">
      <div class="first-middle-left">
        <div class="inner-bg-left"></div>
      </div>
      <div class="first-middle-right">
        <div class="inner-bg-right"></div>
      </div>
    </div>
    <div class="joingame">
      <div class="join-button">JOIN THE GAME</div>
    </div>
    <div class="first-bottom">
      <div class="first-bottom-inner">
        <div class="first-bottom-left">THE  PROMOTION  ENDS  IN  DAYS</div>
      <div class="first-bottom-right">{{date}}</div>
      </div>
    </div>
    <div class="havemore">
      <i class="havemore_icon"></i>
    </div>
  </section>
    <Second />
    <Third />
    <Fourth />
  </div>
</template>
<script>
import {
  setSessionStorage,
  getSessionStorage,
  initGA,
  addGA,
  errorGA
} from "@/utils/assist";
import Second from '../../components/second';
import Third from '../../components/third';
import Fourth from '../../components/fourth';
 export default {
  name: "home",
  data() {
    return {
      globalConfig: this.$bus.$data, // 全局被观测数据对象
    };
  },
  created() {
    this.$api.info()
    .then(data => {
      console.log(data.data.transify)
    })
  },
  components: {Second,Third,Fourth},
  methods: {
    // initInfo() {
    // let accessToken = getSessionStorage(`${PROJECT_NAME}AccessToken`) || ''
    // let lang = getSessionStorage(`${PROJECT_NAME}Lang`) || "";
    // if (!accessToken) return this.$bus.handleError('TOAST_LOGIN_FAILED')
    //   this.$api
    //     .info({
    //       // access_token: accessToken,
    //       access_token: "123",
    //       lang: lang
    //     })
    //     .then(response => {
    //       let data = response.data;
    //       document.body.setAttribute("data-lang", data.common_config.lang);
    //       // initGA(data.common_config.region, this.$bus.uid)
    //     });
    // }
  },
  computed: {
    // this.initInfo();
    // var date = new Date()
    // console.log(date)
     transify() {
			return this.globalConfig.transify
		},
    date :() => {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getDay()
      let day = date.getDate()
      return `${year}-${month}-${day}`
    }
  }
};
</script>
<style lang="scss" src="@/assets/scss/index.scss"></style>