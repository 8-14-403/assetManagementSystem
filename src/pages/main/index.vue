<template>
  <div id="app">
    <itemheader></itemheader>
    <itemsidebar></itemsidebar>
    <div class="content">
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
    <itemsfoot></itemsfoot>
  </div>
</template>

<script>
import itemheader from '../../components/public/header'
import itemsidebar from '../../components/public/sidebar'
import itemsfoot from '../../components/public/footer'
export default {
  name: 'app',
  components: {
    itemheader,
    itemsidebar,
    itemsfoot
  }
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
  #app {
    color: black;
  }
  .content{
    background: none repeat scroll 0 0 #F9FAFC;
    position: absolute;
    left: 220px;
    right: 0;
    top:60px;
    bottom: 0;
    width: auto;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .billtable{
    margin-top:20px;
  }
</style>
