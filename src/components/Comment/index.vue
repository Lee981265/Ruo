<template>
  <div v-if="isShow" id="gitalk" />
</template>

<script>
import Gitalk from 'gitalk'

export default {
  name: 'Comment',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      isShow: this.$config.gitalk.display
    }
  },
  mounted() {
    this.renderGitalk()
  },
  methods: {
    renderGitalk() {
      const gitalk = new Gitalk({
        ...this.$config.gitalk,
        title: this.title
      })
      gitalk.render('gitalk')
    }
  }
}
</script>
