module.exports = function(app) {
  const teachers = [
    // Ust. Syarif
    {
      email: "saripuddin@mail.com",
      full_name: "Saripudin",
      address: {
        street_name: "Jl. Warakas 6, Gang 7 No 154",
        province: {
          id: 31,
          name: "DKI Jakarta"
        },
        city: {
          id: 3175,
          name: "Kota Jakarta Utara"
        },
        district: {
          id: 3175030,
          name: "Tanjung Priok"
        }
      },
      dpd_area: {
        id: 3175,
        name: "Kota Jakarta Utara"
      },
      phone_number: "081322195723",
      occupation: "Pegawai Swasta",
      available_times: [
        {
          class_type: 1,
          frequency: 3,
          implementation: 2,
          schedules: [
            { day: "Selasa", time: "10:00 - 11:00" },
            { day: "Rabu", time: "10:00 - 11:00" },
            { day: "Kamis", time: "10:00 - 11:00" }
          ],
          status: "NEW"
        },
        {
          class_type: 1,
          frequency: 1,
          implementation: 1,
          schedules: [{ day: "Senin", time: "19:30 - 20:30" }],
          status: "NEW"
        },
        {
          class_type: 2,
          frequency: 1,
          implementation: 1,
          schedules: [{ day: "Sabtu", time: "18:15 - 19:00" }],
          status: "NEW"
        }
      ]
    },

    // Ust. Waulat
    {
      email: "muhammad.waulat@mail.com",
      full_name: "Muhamad Waulat",
      address: {
        street_name: "Jalan Balai Pustaka Timur Blok D No 7",
        province: {
          id: 31,
          name: "DKI Jakarta"
        },
        city: {
          id: 3172,
          name: "Kota Jakarta Timur"
        },
        district: {
          id: 3172090,
          name: "Pulo Gadung"
        }
      },
      dpd_area: {
        id: 3172,
        name: "Kota Jakarta Timur"
      },
      phone_number: "085244086434",
      occupation: "Pegawai Swasta",
      available_times: [
        {
          class_type: 2,
          frequency: 1,
          implementation: 2,
          schedules: [{ day: "Kamis", time: "19:30 - 20:30" }],
          status: "NEW"
        },
        {
          class_type: 1,
          frequency: 1,
          implementation: 2,
          schedules: [{ day: "Sabtu", time: "19:30 - 20:30" }],
          status: "NEW"
        },
        {
          class_type: 3,
          frequency: 3,
          implementation: 2,
          schedules: [
            { day: "Kamis", time: "19:30 - 20:30" },
            { day: "Kamis", time: "19:30 - 20:30" },
            { day: "Kamis", time: "19:30 - 20:30" }
          ],
          status: "NEW"
        }
      ]
    },

    // Ust. Suharpin
    {
      email: "suharpin@mail.com",
      full_name: "Suharpin",
      address: {
        street_name: "Jl. Tebet Utara IV, No. 06",
        province: {
          id: 31,
          name: "DKI Jakarta"
        },
        city: {
          id: 3171,
          name: "Kota Jakarta Selatan"
        },
        district: {
          id: 3171090,
          name: "Tebet"
        }
      },
      dpd_area: {
        id: 3172,
        name: "Kota Jakarta Timur"
      },
      phone_number: "08119111563",
      occupation: "Pegawai Swasta",
      available_times: [
        {
          class_type: 1,
          frequency: 1,
          implementation: 2,
          schedules: [{ day: "Sabtu", time: "18:30 - 20:00" }],
          status: "NEW"
        }
      ]
    },

    // Ust. Hermawan
    {
      email: "hermawan.sumarlin@mail.com",
      full_name: "Hermawan Sumarlin",
      address: {
        street_name:
          "Masjid Baitul Mukhlisiin, Vila Cinere Mas. Jl. Matahari L2 , Cipayung, Ciputat timur, Tangsel",
        province: {
          id: 31,
          name: "DKI Jakarta"
        },
        city: {
          id: 3171,
          name: "Kota Jakarta Selatan"
        },
        district: {
          id: 3171030,
          name: "Cilandak"
        }
      },
      dpd_area: {
        id: 3171,
        name: "Kota Jakarta Selatan"
      },
      phone_number: "085242253950",
      occupation: "Pegawai Swasta",
      available_times: [
        {
          class_type: 1,
          frequency: 2,
          implementation: 2,
          schedules: [
            { day: "Selasa", time: "07:00 - 08:30" },
            { day: "Kamis", time: "07:00 - 08:30" }
          ],
          status: "NEW"
        }
      ]
    },

    // Ust. Roni
    {
      email: "roni.fuad.alam@mail.com",
      full_name: "Roni Fuad Alam",
      address: {
        street_name: "Jl. Elit Raya Komplek Timah BB.53 Cimanggis Depok",
        province: {
          id: 32,
          name: "Jawa Barat"
        },
        city: {
          id: 3276,
          name: "Kota Depok"
        },
        district: {
          id: 3276040,
          name: "Cimanggis"
        }
      },
      dpd_area: {
        id: 3276,
        name: "Kota Depok"
      },
      phone_number: "085954641101",
      occupation: "Pegawai Swasta",
      available_times: [
        {
          class_type: 1,
          frequency: 2,
          implementation: 2,
          schedules: [
            { day: "Senin", time: "16:00 - 17:30" },
            { day: "Kamis", time: "16:00 - 17:30" }
          ],
          status: "NEW"
        }
      ]
    },

    // Akh. Adit
    {
      email: "aditia.subardi@mail.com",
      full_name: "Aditia Subardi",
      address: {
        street_name: "Jl. RTM, No 48 C, RT 8/10",
        province: {
          id: 32,
          name: "Jawa Barat"
        },
        city: {
          id: 3276,
          name: "Kota Depok"
        },
        district: {
          id: 3276040,
          name: "Cimanggis"
        }
      },
      dpd_area: {
        id: 3276,
        name: "Kota Depok"
      },
      phone_number: "089620339562",
      occupation: "Pegawai Swasta",
      available_times: [
        {
          class_type: 1,
          frequency: 2,
          implementation: 2,
          schedules: [
            { day: "Rabu", time: "17:00 - 18:00" },
            { day: "Kamis", time: "17:00 - 18:00" }
          ],
          status: "NEW"
        }
      ]
    },

    // Ust. Alir
    {
      email: "alir.retno@mail.com",
      full_name: "Alir Retno",
      address: {
        street_name:
          "Perum Muslim Orchid Green Park Blok F No 8, Pasir Putih, Sawangan",
        province: {
          id: 32,
          name: "Jawa Barat"
        },
        city: {
          id: 3276,
          name: "Kota Depok"
        },
        district: {
          id: 3276010,
          name: "Sawangan"
        }
      },
      dpd_area: {
        id: 3276,
        name: "Kota Depok"
      },
      phone_number: "081287557325",
      occupation: "Pegawai Swasta",
      available_times: [
        {
          class_type: 2,
          frequency: 2,
          implementation: 1,
          schedules: [
            { day: "Senin", time: "16:30 - 18:00" },
            { day: "Rabu", time: "16:30 - 18:00" }
          ],
          status: "NEW"
        }
      ]
    },

    // Ust. Arofah
    {
      email: "arofah.syarifuddin@mail.com",
      full_name: "Arofah Syarifuddin",
      address: {
        street_name:
          "Jl. Komjen Yasin 2 E Komplek Restoran Pondok Laras, Kelapa Dua",
        province: {
          id: 32,
          name: "Jawa Barat"
        },
        city: {
          id: 3276,
          name: "Kota Depok"
        },
        district: {
          id: 3276040,
          name: "Cimanggis"
        }
      },
      dpd_area: {
        id: 3276,
        name: "Kota Depok"
      },
      phone_number: "08111110948",
      occupation: "Pegawai Swasta"
    },

    // Ust. Anas
    {
      email: "m.anas.syukur@mail.com",
      full_name: "M. Anas Syukur",
      address: {
        street_name: "Jl. Bakti, Tugu",
        province: {
          id: 32,
          name: "Jawa Barat"
        },
        city: {
          id: 3276,
          name: "Kota Depok"
        },
        district: {
          id: 3276040,
          name: "Cimanggis"
        },
        zipcode: "16451"
      },
      dpd_area: {
        id: 3276,
        name: "Kota Depok"
      },
      phone_number: "085732780889",
      occupation: "Pegawai Swasta"
    },

    // Ust. Sinatra
    {
      email: "sinatra.nata@mail.com",
      full_name: "Sinatra Nata",
      address: {
        street_name: "Jakarta Barat",
        province: {
          id: 31,
          name: "DKI Jakarta"
        },
        city: {
          id: 3174,
          name: "Kota Jakarta Barat"
        }
      },
      dpd_area: {
        id: 3174,
        name: "Kota Jakarta Barat"
      },
      phone_number: "085732780889",
      occupation: "Pegawai Swasta",
      available_times: [
        {
          class_type: 1,
          frequency: 3,
          implementation: 1,
          schedules: [
            { day: "Senin", time: "20:00 - 21:00" },
            { day: "Selasa", time: "20:00 - 21:00" },
            { day: "Rabu", time: "20:00 - 21:00" }
          ],
          status: "NEW"
        },
        {
          class_type: 2,
          frequency: 3,
          implementation: 1,
          schedules: [
            { day: "Rabu", time: "16:00 - 17:00" },
            { day: "Kamis", time: "16:00 - 17:00" },
            { day: "Jum'at", time: "16:00 - 17:00" }
          ],
          status: "NEW"
        },
        {
          class_type: 2,
          frequency: 2,
          implementation: 1,
          schedules: [
            { day: "Senin", time: "16:00 - 17:00" },
            { day: "Selasa", time: "16:00 - 17:00" }
          ],
          status: "NEW"
        }
      ]
    }
  ];

  app.use("/manual/register-teachers", async (req, res) => {
    for (let i = 0; i < teachers.length; i++) {
      try {
        await app.service("teachers").create(teachers[i]);
      } catch (error) {
        res.json(error);
      }
    }

    res.json("Data berhasil dimasukkan");
  });
};
