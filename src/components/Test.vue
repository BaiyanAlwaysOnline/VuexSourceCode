<template>
    <div>Test</div>
</template>

<script>
export default {
    data() {
        return {
            name: 'by',
            age: 18
        }
    },
    computed: {
        total() {
            console.log('computed.total');
            return this.name + this.age
        }
    },
    watch: {
        total(val) {
            console.log('watch.total', val);
        }
    }
}
</script>

<style>

</style>
