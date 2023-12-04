<template>

    <!-- SOURCE -->
  <!--   <div id="printMe">
      <h1>Print me!</h1>
    </div> -->
    <!-- OUTPUT -->
    <button @click="print"></button>

</template>

<script >

export default {
  data() {
    return {
      output: null
    }
  },
  methods: {
    print() {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    }
  }
}
</script>