<template>
  <div>
    <BaseDialog :show='!!error' title='An Error Ocurred' @close='handleError'>
      <p>{{error}}</p>
    </BaseDialog>
    <BaseDialog fixed title='Authenticating...' :show='isLoading'>
      <BaseSpinner></BaseSpinner>
    </BaseDialog>
    <BaseCard>
      <form @submit.prevent='submitForm'>
        <div class='form-control'>
          <label for='email'>Email</label>
          <input type='email' id='email' v-model.trim='email'>
        </div>
        <div class='form-control'>
          <label for='password'>Password</label>
          <input type='password' id='password' v-model.trim='password'>
        </div>
        <p v-if='!formIsValid'>Please enter a valid email and password (at least 6 characters long)</p>
        <BaseButton>{{ submitCaption }}</BaseButton>
        <BaseButton type='button' mode='flat' @click='switchAuthMode'>{{ switchModeCaption }}</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null
    };
  },
  computed: {
    submitCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'SignUp';
      }
    },
    switchModeCaption() {
      if (this.mode === 'login') {
        return 'SignUp Instead';
      } else {
        return 'Login Instead';
      }
    }
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async submitForm() {
      this.formIsValid = true;

      if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const payload = {
        email: this.email,
        password: this.password
      }

      try {
        if(this.mode === 'login') {
          await this.$store.dispatch('login', payload)
        } else {
          await this.$store.dispatch('signup', payload);
        }

        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches') ;
        this.$router.replace(redirectUrl);
      } catch(error) {
        this.error = error.message || 'Failed to Authenticate, try later.';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>