<template>
  <div class="imgbox">
    <img class="img" :src="src" alt="">
  </div>
</template>
<script>
export default {
  data(){
    return{
      src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585327425601&di=7c2641dbedcd1f2da8145960501f0a87&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181104%2Fe2b9ef5db51b4b769a7545dabb986058.jpeg'
    }
  }
}
</script>

<style scoped>
.imgbox{
  display: flex;
  align-items: center;
  justify-content: center;
}
.img{
  margin-top: 20px;
}
</style>