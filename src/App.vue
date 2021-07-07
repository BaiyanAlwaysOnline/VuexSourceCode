<template>
  <div id="app">
    age: {{this.$store.state.age}} <br />
    a age: {{this.$store.state.aa.age}} <br />
    b age: {{this.$store.state.bb.age}} <br />
    totalAge: {{this.$store.getters.totalAge}} <br />
    <button @click="$store.state.age = 20">click state</button>
    <button @click="$store.commit('bb/add', 10)">click commit</button> 
    <button @click="$store.dispatch('addAsync', 20)">click dispatch</button>
  </div>
</template>
<script>

export default {
  name: 'App',
}
</script>
