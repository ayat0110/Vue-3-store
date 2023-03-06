<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Username</label>
        <input type="text" v-model="username" required>
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/store.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const authStore = useAuthStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        const success = await authStore.login(username.value, password.value);
        if (success) {
          router.push('/');
        } else {
          error.value = 'Invalid username or password';
        }
      } catch (err) {
        error.value = 'Invalid username or password';
      }
    };

    return {
      username,
      password,
      error,
      handleSubmit
    };
  }
};
</script>
