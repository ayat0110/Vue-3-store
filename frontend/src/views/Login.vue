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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/store.js';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();
    const authStore = useAuthStore();

    const handleSubmit = async () => {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username.value, password: password.value }),
          mode: 'cors'
        });

        if (response.ok) {
          // If authentication succeeds, set isLoggedIn to true in your auth store
          authStore.isLoggedIn = true;
          router.push('/');
        } else {
          // If authentication fails, show an error message to the user
          error.value = 'Invalid username or password';
        }
      } catch (err) {
        console.error(err);
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
