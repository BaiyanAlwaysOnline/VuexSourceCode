<template>
    <div>
        <!-- <Test /> -->
        <router-link to='/'>to home</router-link> <br />
        <router-link to='/detail/c' >to detail</router-link>
        <h3>---------------------------------------------------------</h3>
        <router-view />
    </div>
</template>
<script>

export default {
    components: {
    },
}
</script>