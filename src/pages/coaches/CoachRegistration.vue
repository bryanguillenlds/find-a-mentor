<template>
  <div>
    <section>
      <BaseCard>
        <h2>Register as a Mentor now</h2>
        <CoachForm @save-data='saveData' />
      </BaseCard>
    </section>
  </div>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';

export default {
  components: { CoachForm },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.push('/coaches');
    }
  }
};
</script>

<style scoped>

</style>