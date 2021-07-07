<template>
    <button @click='handleClick'>
        {{age}} - Click
    </button>
</template>
<script>
export default {
    name: 'Age',
    props: {
        age: [Number]
    },
    methods: {
        handleClick() {
            this.$emit('update:age', Math.random())
        }
    }
}
</script>
<style lang="">
    
</style>