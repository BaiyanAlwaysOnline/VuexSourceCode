<template>
    <div>
        <div>Detail</div>
        <router-link to='/detail/a'>to detail a</router-link> <br />
        <router-link to='/detail/c' >to detail c</router-link>
        <router-view />
    </div>
</template>
<script>
export default {
    mounted() {
        console.log(this.$route);
    }
}
</script>