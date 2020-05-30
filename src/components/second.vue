<template>
    <div class="second">2222hp-dev
        <button @click="getNews">getNews</button>
    </div>
</template>
<script>
// import {} from '@/api/index'
export default {
     methods: {
        async getNews() {
           const res = this.$api.info()
           console.log(res)
    }
}
}
</script>
<style lang="scss" src="@/assets/scss/index.scss"></style>