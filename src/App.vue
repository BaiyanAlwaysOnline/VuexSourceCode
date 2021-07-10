<template>
  <div id="app">
    age: {{age}} <br />
    a age: {{this.$store.state.aa.age}} <br />
    b age: {{this.$store.state.bb.age}} <br />
    c age: {{this.$store.state.aa.cc.age}} <br />
    totalAge: {{totalAge}} <br />
    <button @click="add(10)">click commit</button> 
    <button @click="$store.dispatch('bb/addAsync', 20)">click dispatch</button>
  </div>
</template>
<script>

import { mapState, mapGetters, mapMutations } from '@/vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['age']),
    ...mapGetters(['totalAge'])
  },
  methods: {
    ...mapMutations('cc', ['add'])
  }
}
</script>
