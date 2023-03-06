import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isLoggedIn: false,
        username: null,
    }),
    actions: {
        login(username, password) {
            // This is where you would check the username and password against your
            // backend API or some other authentication mechanism
            if (username === 'admin' && password === 'password') {
                this.isLoggedIn = true;
                this.username = username;
                return true;
            } else {
                return false;
            }
        },
        logout() {
            this.isLoggedIn = false;
            this.username = null;
        },
    },
});
