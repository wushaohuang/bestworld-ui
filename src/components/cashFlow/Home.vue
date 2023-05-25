<template>
  <div>
    home
  </div>
</template>

<script>
export default {
  name: 'HomeVue',
  props: {
    msg: String
  },
  methods: {
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {
        console.log('res.data')
        console.log(res)
      })
    }
  },
  created() {
    this.getCaptcha()
  }
}
</script>

<style scoped>

</style>
