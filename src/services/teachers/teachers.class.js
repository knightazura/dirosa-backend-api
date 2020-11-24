const { Service } = require('feathers-objection');

exports.Teachers = class Teachers extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }

  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    const userData = {
      email: data.email,
      password: "dirosa_" + data.phone_number
    };
    
    const userService = this.app.service("users");
    const newUser = await userService.create(userData);

    if (newUser) {
      const teacher = {
        account_id: newUser.id,
        full_name: data.full_name,
        age: data.age,
        phone_number: data.phone_number,
        address: data.address,
        dpd_area: data.dpd_area,
        occupation: data.occupation
      };

      const newTeacher = await super.create(teacher, params);

      const availableTime = data.available_time;

      // Save the available time too
      const dataAvailableTime = {
        teacher_id: newTeacher.id,
        class_type: availableTime.class_type,
        frequency: availableTime.frequency,
        implementation: availableTime.implementation,
        schedules: availableTime.schedules,
        status: 'NEW'
      };

      await this.app.service('available-time').create(dataAvailableTime);

      return {
        message: "Berhasil mendaftarkan pengajar baru",
        type: "success",
        teacher: {
          id: newTeacher.id,
          dpd_area: newTeacher.dpd_area
        }
      };
    }
  }
};
