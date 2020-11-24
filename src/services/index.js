const users = require('./users/users.service.js');
const students = require('./students/students.service.js');
const teachers = require('./teachers/teachers.service.js');
const availableTime = require('./available-time/available-time.service.js');

const faker = require("faker");
const Chance = require("chance");

const waitingList = require('./waiting-list/waiting-list.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(students);
  app.configure(teachers);
  app.configure(availableTime);

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
      const frequency = chance.natural({ min: 1, max: 3 });
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
      let schedules = [];

      // Maximum every teachers only have 5 days to teaching
      for (let x = 0; x < chance.natural({ min: 1, max: 5 }); x++) {
        let sc = {};
        if (frequency === 1) {
          sc = Object.assign(sc, {
            id: faker.random.uuid(),
            days: faker.date.weekday(),
            time: chance.pickone(times)
          });
          app.configure(waitingList);
        } else {
          let freqSc = [];
          for (let z = 1; z <= frequency; z++) {
            freqSc.push({
              days: faker.date.weekday(),
              time: chance.pickone(times)
            });
            app.configure(waitingList);
          }
          sc = Object.assign(sc, {
            id: faker.random.uuid(),
            times: freqSc
          });
          app.configure(waitingList);
        }

        schedules.push(sc);
        app.configure(waitingList);
      }

      const dataAvailableTime = {
        class_type: chance.natural({ min: 1, max: 2 }),
        frequency: frequency,
        implementation: chance.natural({ min: 1, max: 2 }),
        schedules: schedules,
        status: "NEW",
      };

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
        available_time: dataAvailableTime,
      };

      try {
        await app.service("teachers").create(dataPengajar);
        app.configure(waitingList);
      } catch (error) {
        console.error({ error });
        app.configure(waitingList);
      }
      app.configure(waitingList);
    }

    response.json("Dummy seeded!");
    app.configure(waitingList);
  });
  app.configure(waitingList);
};
