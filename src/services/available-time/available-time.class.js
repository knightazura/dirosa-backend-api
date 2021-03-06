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
    let response = null;
    if (data.hasOwnProperty('query')) {
      let commonQuery = {
        class_type: data.query.ct,
        implementation: data.query.imp,
        frequency: data.query.fq
      };
      let teacherIds = null;
  
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
  
        priority.data = priority.data.map(availableTime => {
          availableTime.priority = true
          return availableTime
        })
    
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
  
        lesser.data = lesser.data.map(availableTime => {
          availableTime.priority = false
          return availableTime
        })
    
        response = priority.data.concat(lesser.data);
      } else {
        // Get priority schedules
        response = await super.find({
          query: commonQuery
        });
  
        response = response.data;
      }
    } else {
      response = await super.find({
        query: {
          id: data
        }
      });

      response = response.data[0];
    }

    return response;
  }
};
