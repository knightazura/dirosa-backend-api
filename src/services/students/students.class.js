const { Service } = require('feathers-objection');
const shortid = require('shortid');

exports.Students = class Students extends Service {
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
      password: "dirosa_" + data.phone_number,
      referral_code: shortid.generate(),
      referrer: data.hasOwnProperty('referrer') ? data.referrer : null,
    };
    
    const userService = this.app.service("users");
    const newUser = await userService.create(userData);

    if (newUser) {
      const student = {
        account_id: newUser.id,
        address: data.address,
        full_name: data.full_name,
        age: data.age,
        phone_number: data.phone_number,
        occupation: data.occupation
      };

      const newStudent = await super.create(student, params);

      return {
        message: "Berhasil mencatat data calon peserta baru",
        type: "success",
        candidate: {
          id: newStudent.id,
          dpd_area: newStudent.address.city.id
        }
      };
    }
  }

  async get(id, params) {
    const student = await this.app.service('students').find({
      query: {
        id: id,
        $eager: 'stillWaiting'
      }
    })

    const { schedule_id, available_time_id } = student.data[0].stillWaiting

    const availableTime = await this.app.service('available-time').get(available_time_id)

    const selectedSchedule = availableTime.schedules.find(schedule => schedule.id === schedule_id)

    return {
      candidate: {
        full_name: student.data[0].full_name,
        selected_schedule: selectedSchedule
      }
    }
  }
};
