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

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDd3vyyJRZAaGHTZtYnAx7DokFMQMXNh6s",
  authDomain: "cryptotrack-8f547.firebaseapp.com",
  projectId: "cryptotrack-8f547",
  storageBucket: "cryptotrack-8f547.appspot.com",
  messagingSenderId: "919350814434",
  appId: "1:919350814434:web:64e0c5f1725aa25858e0bb",
  measurementId: "G-BNKJRFMVZS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/
</script>
