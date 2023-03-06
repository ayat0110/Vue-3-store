<template>
  <div>
    <h1>Hello {{ username }}</h1>
    <button @click="logout">Logout</button>
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

    const logout = async () => {
      await authStore.logout();
      router.push('/login');
    };

    return {
      username,
      logout
    };
  }
};
</script>
