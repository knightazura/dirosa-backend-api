const users = require('./users/users.service.js');
const students = require('./students/students.service.js');
const teachers = require('./teachers/teachers.service.js');
const availableTime = require('./available-time/available-time.service.js');

const faker = require("faker");
const Chance = require("chance");

const waitingList = require('./waiting-list/waiting-list.service.js');

const DPD_LIST = require('../constants/dpd-list');
const CLASS_TYPES = require('../constants/class-types');
const PROGRAM_IMPLEMENTATIONS = require('../constants/program-implementation');
const JOB_TYPES = require('../constants/student-jobs');

const halaqah = require('./halaqah/halaqah.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(students);
  app.configure(teachers);
  app.configure(availableTime);

  // Misc. routes
  app.use("/dpd-list", (request, response) => response.json(DPD_LIST));
  app.use("/class-types", (request, response) => response.json(CLASS_TYPES));
  app.use("/program-implementation", (request, response) => response.json(PROGRAM_IMPLEMENTATIONS));
  app.use("/job-types", (request, response) => response.json(JOB_TYPES));

  app.configure(waitingList);
  app.configure(halaqah);

  // temporary manual
  // app.configure()

  // dummy deed
  app.use("/dummy-seed/pengajar", async (request, response) => {
    faker.locale = "id_ID";
    const chance = new Chance();
    const wilayah = [
      {
        id: 3101,
        id_provinsi: 31,
        nama_provinsi: "DKI Jakarta",
        nama_kota: "Kabupaten Kepulauan Seribu"
      },
      {
        id: 3171,
        id_provinsi: 31,
        nama_provinsi: "DKI Jakarta",
        nama_kota: "Kota Jakarta Selatan"
      },
      {
        id: 3172,
        id_provinsi: 31,
        nama_provinsi: "DKI Jakarta",
        nama_kota: "Kota Jakarta Timur"
      },
      {
        id: 3173,
        id_provinsi: 31,
        nama_provinsi: "DKI Jakarta",
        nama_kota: "Kota Jakarta Pusat"
      },
      {
        id: 3174,
        id_provinsi: 31,
        nama_provinsi: "DKI Jakarta",
        nama_kota: "Kota Jakarta Barat"
      },
      {
        id: 3175,
        id_provinsi: 31,
        nama_provinsi: "DKI Jakarta",
        nama_kota: "Kota Jakarta Utara"
      },
      {
        id: 3276,
        id_provinsi: 32,
        nama_provinsi: "Jawa Barat",
        nama_kota: "Kota Depok"
      }
    ];

    for (let i = 0; i < request.query.jumlah; i++) {
      const selectedWilayah = chance.pickone(wilayah);
      const dataDpd = {
        id: selectedWilayah.id,
        name: selectedWilayah.nama_kota
      };

      /**
       * Waktu tersedia
       * @type {Number}
       */
      let times = [
        "05.00 - 06.00",
        "06.00 - 07.00",
        "07.00 - 08.00",
        "08.00 - 09.00",
        "09.00 - 10.00",
        "10.00 - 11.00",
        "11.00 - 12.00",
        "13.00 - 14.00",
        "14.00 - 15.00",
        "16.00 - 17.00",
        "18.30 - 19.30",
        "19.30 - 20.30"
      ];
      let availableTimes = [];
      
      // Maximum every teachers only have 5 days to teaching
      for (let x = 0; x < chance.natural({ min: 1, max: 5 }); x++) {
        let schedules = [];

        const frequency = chance.natural({ min: 1, max: 3 });
        
        if (frequency === 1) {
          schedules.push({
            days: faker.date.weekday(),
            time: chance.pickone(times)
          })
        } else {
          for (let z = 1; z <= frequency; z++) {
            schedules.push({
              days: faker.date.weekday(),
              time: chance.pickone(times)
            });
          }
        }
        const dataAvailableTime = {
          class_type: chance.natural({ min: 1, max: 4 }),
          frequency: frequency,
          implementation: chance.natural({ min: 1, max: 2 }),
          schedules: schedules,
          status: "NEW",
        };

        availableTimes.push(dataAvailableTime);
      }

      const dataPengajar = {
        email: faker.internet.email(),
        full_name: faker.name.findName(),
        address: {
          street_name: faker.address.streetName(),
          province: {
            id: selectedWilayah.id_provinsi,
            name: selectedWilayah.nama_provinsi
          },
          city: {
            id: selectedWilayah.id,
            name: selectedWilayah.nama_kota
          },
          district: {
            id: selectedWilayah.id + chance.natural({ min: 1, max: 30 }),
            name: faker.address.county()
          },
          zipcode: faker.address.zipCode()
        },
        age: chance.natural({ min: 18, max: 45 }),
        dpd_area: dataDpd,
        phone_number: faker.phone.phoneNumberFormat(),
        occupation: "Pegawai Swasta",
        available_times: availableTimes,
      };

      try {
        await app.service("teachers").create(dataPengajar);
      } catch (error) {
        console.error({ error });
      }
    }

    response.json("Dummy seeded!");
  });
  app.use('/test-session', (req, res) => {
    const n = req.session.views || 0;
    req.session.views = n + 1;
    res.end(`${n} views`);
  });
};
