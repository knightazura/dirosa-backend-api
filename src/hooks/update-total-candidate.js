// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const availableTimeService = context.app.service('available-time')
    const scheduleId = context.data.schedule_id
 
    // Get current status
    const availableTime = await availableTimeService.find(scheduleId);
    
    await availableTimeService.patch(
      scheduleId,
      {
        total_candidate: Object.is(availableTime.total_candidate, null) 
          ? 1 
          : parseInt(availableTime.total_candidate) + 1
      }
    )

    return context;
  };
};
