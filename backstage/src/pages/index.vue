<template>
  <div class="wrapper">
    <idx-header />
    <left-bar />
  </div>
</template>

<script>
import idxHeader from '../components/index/idxHeader'
import leftBar from '../components/index/leftBar'
export default {
  components: {
      idxHeader,
      leftBar
    },
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

html, body,.wrapper {
    height: 100%;
    background-color: #eee;
}
button {
    cursor: pointer;
}
.right-content {
    min-width: 800px;
    width: calc(100% - 200px);
    padding-left: 200px;
    position: relative;
}
</style>