const { Service } = require('feathers-objection');

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
      password: "dirosa_" + data.phone_number
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
};
