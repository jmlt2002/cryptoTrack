<template>
  <PageHeader />
  <CorrelationGraph />
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
