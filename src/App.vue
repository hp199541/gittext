<template>
  <div id="app">
    <router-view />
    <div class="wp_pop">
			<div class="wp_content">
				<div class="wp_pop_img"></div>
				<p class="wp_tips">Please rotate your phone for the best browsing experience</p>
			</div>
		</div>
  </div>
</template>
<script>
import {
  setSessionStorage,
  getSessionStorage,
  loadStyle,
  deleteUrlParam
} from "@/utils/assist";
export default {
  data() {
    return {};
  },
  methods: {
    cacheQueryData() {
      // NOTE `PROJECT_NAME` is defined via webpack DefinePlugin
      let { access_token = "", lang = "", region = "" } = this.$route.query;
      access_token &&
        setSessionStorage(`${PROJECT_NAME}AccessToken`, access_token);
      lang && setSessionStorage(`${PROJECT_NAME}Lang`, lang);
      region && setSessionStorage(`${PROJECT_NAME}Region`, region);
    },
    getCSS() {
      let region = getSessionStorage(`${PROJECT_NAME}Region`) || "";
      let lang = getSessionStorage(`${PROJECT_NAME}Lang`) || "";
      loadStyle(`/api/css?region=${region}&lang=${lang}`);
    }
  },
  created() {
    // this.cacheQueryData()
    this.getCSS()
    // deleteUrlParam('access_token')
  }
};
</script>
<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  overflow: auto
}
.wp_pop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #091222;
  z-index: 9999;
  display: none;
}

.wp_content {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.wp_pop_img {
  width: 50vw;
  height: 30vw;
  margin: auto;
  animation: rotateA 1.5s ease infinite alternate;
}

.wp_tips {
  width: 60%;
  font-size: 5vw;
  color: #ffffff;
  text-align: center;
  margin: 12vw auto 0;
}

@media screen and (max-width: 768px) and (orientation: portrait) {
  .wp_pop {
    display: block;
  }
}
</style>
