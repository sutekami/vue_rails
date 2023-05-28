<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import api from './api';
export default ({
  name: 'App',
  created() {
    this.setCSRFToken();
  },
  methods: {
    async setCSRFToken() {
      const res = await api.get('/get_csrf_token');
      api.defaults.headers.common['X-CSRF-Token'] = res.headers['x-csrf-token'];
    }
  }
})
</script>

<style>
.mistake {
  color: red;
}
.under_line {
  text-decoration: line-through 5px red;
}
</style>
