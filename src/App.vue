<template>
  <div id="app">
    age: {{this.$store.state.age}} <br />
    a age: {{this.$store.state.aa.age}} <br />
    b age: {{this.$store.state.bb.age}} <br />
    c age: {{this.$store.state.aa.cc.age}} <br />
    totalAge: {{this.$store.getters.totalAge}} <br />
    <button @click="$store.commit('aa/add', 10)">click commit</button> 
    <button @click="$store.dispatch('bb/addAsync', 20)">click dispatch</button>
  </div>
</template>
<script>

export default {
  name: 'App',
}
</script>
