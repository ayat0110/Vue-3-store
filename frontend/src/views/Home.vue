<template>
  <div>
    <h1 v-if="isLoggedIn">Hello {{ username }}</h1>
    <button @click="logout">Logout</button>
    <p v-if="!isLoggedIn">Please log in to access this page.</p>
  </div>
</template>

<script>
import { useAuthStore } from '../store/store.js';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const username = computed(() => authStore.username);
    const isLoggedIn = computed(() => authStore.isLoggedIn);

    const logout = async () => {
      await authStore.logout();
      router.push('/login');
    };

    return {
      username,
      isLoggedIn,
      logout
    };
  }
};
</script>
