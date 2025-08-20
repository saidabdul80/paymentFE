<template>
  <Special>
    <div class="md:tw-max-w-md tw-w-[80%] tw-mx-auto tw-p-6 tw-bg-white tw-shadow-lg tw-rounded-lg">
      <div class="tw-text-center tw-mb-6">
        <h2 class="tw-text-2xl tw-font-bold tw-mb-2">UGCC Member Login</h2>
        <p class="tw-text-gray-600">Welcome back to the University of Guyana Computer Club</p>
      </div>
      
      <form @submit.prevent="login">
        <!-- Username/Email Field -->
        <div class="tw-mb-4">
          <TextField 
            v-model="loginData.username" 
            label="Username or Email" 
            :error-messages="errors.username" 
            type="text"
            required 
          />
        </div>
        
        <!-- Password Field -->
        <div class="tw-mb-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Password
            <span class="tw-text-red-500">*</span>
          </label>
          <Password 
            :feedback="false" 
            toggleMask 
            v-model="loginData.password" 
            fluid 
            id="password" 
            class="tw-w-full tw-rounded-lg" 
            :class="{ 'p-invalid': errors.password }" 
          />
          <small v-if="errors.password" class="tw-text-red-500">{{ errors.password }}</small>
        </div>
        
        <!-- Remember Me -->
        <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
          <div class="tw-flex tw-items-center">
            <Checkbox 
              v-model="loginData.remember" 
              inputId="remember" 
              class="tw-mr-2"
            />
            <label for="remember" class="tw-text-sm tw-text-gray-600">Remember me</label>
          </div>
          <router-link to="/ugcc/forgot-password" class="tw-text-sm tw-text-blue-600 tw-underline">
            Forgot Password?
          </router-link>
        </div>
        
        <!-- Login Button -->
        <v-btn 
          @click="login" 
          type="submit" 
          :loading="loading"
          class="tw-w-full tw-bg-blue-600 tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded-lg tw-mb-4"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </v-btn>
        
        <!-- Alternative Actions -->
        <div class="tw-text-center tw-space-y-2">
          <p class="tw-text-gray-600">
            Not a member yet?
            <router-link to="/ugcc/register" class="tw-text-blue-600 tw-underline">
              Register as a Member
            </router-link>
          </p>
          <p class="tw-text-gray-600">
            Just interested in joining?
            <router-link to="/ugcc/interest" class="tw-text-blue-600 tw-underline">
              Register Your Interest
            </router-link>
          </p>
        </div>
        
        <!-- Back to Main Site -->
        <div class="tw-text-center tw-mt-6 tw-pt-4 tw-border-t tw-border-gray-200">
          <router-link to="/" class="tw-text-sm tw-text-gray-500 tw-underline">
            ← Back to Main Site
          </router-link>
        </div>
      </form>
    </div>
  </Special>
</template>

<script>
import Special from '@/components/Special.vue';
import TextField from '@/components/TextField.vue';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';
import ls from '@/services/ls';

export default {
  components: {
    Special,
    TextField,
    Password,
    Checkbox,
  },
  
  data() {
    return {
      global: useGlobalsStore(),
      loginData: {
        username: '',
        password: '',
        remember: false
      },
      errors: {},
      loading: false
    };
  },
  
  methods: {
    async login() {
      this.errors = {}; // Reset errors
      
      if (!this.validateForm()) {
        return;
      }
      
      this.loading = true;
      
      try {
        const response = await useClient().http({
          method: 'post',
          path: '/api/ugcc/login',
          data: {
            username: this.loginData.username,
            password: this.loginData.password,
            remember: this.loginData.remember
          }
        });
        
        if (response && response.token) {
          // Store the authentication token
          ls.set('auth.ugcc_token', response.token);
          ls.set('auth.ugcc_user', response.user);
          
          this.global.palert({
            title: 'Welcome Back!',
            text: `Hello ${response.user.first_name}, welcome to your UGCC dashboard.`,
            callback: () => {
              this.$router.push('/ugcc/dashboard');
            },
          });
        } else {
          this.errors.general = 'Invalid login response';
        }
      } catch (error) {
        console.error('Login error:', error);
        
        // Handle specific error messages
        if (error.response?.status === 401) {
          this.errors.general = 'Invalid username or password';
        } else if (error.response?.status === 403) {
          this.errors.general = 'Your account may be inactive. Please contact the club administrator.';
        } else {
          this.errors.general = 'Login failed. Please try again.';
        }
        
        this.global.palert({
          title: 'Login Failed',
          text: this.errors.general,
          type: 'error'
        });
      } finally {
        this.loading = false;
      }
    },
    
    validateForm() {
      let valid = true;
      
      // Username/Email Validation
      if (!this.loginData.username) {
        this.errors.username = 'Username or Email is required';
        valid = false;
      }
      
      // Password Validation
      if (!this.loginData.password) {
        this.errors.password = 'Password is required';
        valid = false;
      }
      
      return valid;
    }
  }
};
</script>

<style scoped>
/* Component-specific styles if needed */
</style>