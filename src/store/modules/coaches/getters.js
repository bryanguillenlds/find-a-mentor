export default {
  coaches: state => state.coaches,
  hasCoaches: state => state.coaches && state.coaches.length > 0,
  isCoach: (state, getters, rootState, rootGetters) => {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;

    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate: state => {
    const lastFetch = state.lastFetch;

    if(!lastFetch) {
      //return true if its the first time
      return true;
    }

    const currentTimestamp = new Date().getTime();

    return (currentTimestamp - lastFetch) / 1000 > 60; //see if the latest update is greater than a minute ago
  }
};