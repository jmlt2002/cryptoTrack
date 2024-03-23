<template>
  <PageHeader />
  <CorrelationGraph class="flex align-middle justify-center"/>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import CorrelationGraph from './components/CorrelationGraph.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    CorrelationGraph,
  }
}
</script>
