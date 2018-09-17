<template lang="pug">
ul
 li 
  span +
  span 1
  ul 
   li 
    span 1-1
 li 
  span 2
 li 
  span 3
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    click(e) {
      console.log(e);
    },
    test(e) {
      // console.log(e)
    }
  },
  mounted() {}
}
</script>
