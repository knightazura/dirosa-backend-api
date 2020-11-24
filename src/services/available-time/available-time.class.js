const { Service } = require('feathers-objection');

exports.AvailableTime = class AvailableTime extends Service {
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

  async find(data, params) {
    let commonQuery = {
      class_type: data.query.ct,
      implementation: data.query.imp,
      frequency: data.query.fq
    };
    let teacherIds = null;
    let response = null;

    // If student choose "offline" implementation
    if (Object.is(parseInt(data.query.imp), 1)) {
      const teachers = await this.app.service('teachers').find({
        query: {
          dpd_area: {
            id: parseInt(data.query.dpd_area)
          },
          $select: ['id']
        },
      });

      teacherIds = teachers.data.map(teacher => teacher.id);

      commonQuery = Object.assign(commonQuery, {
        teacher_id: {
          $in: teacherIds
        }
      })

      // Get priority schedules
      const priority = await super.find({
        query: commonQuery
      });
  
      // Remove teacher_id query
      delete commonQuery.teacher_id;
  
      const lesser = await super.find({
        query: Object.assign(
          {
            teacher_id: {
              $nin: teacherIds
            }
          },
          commonQuery
        )
      });
  
      response = priority.data.concat(lesser.data);
    } else {
      // Get priority schedules
      response = await super.find({
        query: commonQuery
      });

      response = response.data;
    }

    return response;
  }
};
