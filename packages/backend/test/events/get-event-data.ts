import dayjs from "dayjs"

export const officialEventsList = [
  {
    id: "testgetevent1",
    eventName: "Test get event #1",
    createdBy: "officialrootpageacc",
    description: "## No description provided",
    website: "www.github.com/sindresorhus/ky",
    venueName: "Rajamangkala Stadium",
    venueCoordinates: {
      x: "13.755313892097984",
      y: "100.62221451070221"
    },
    openingDate: "2021-03-01T12:00:00.000+07:00",
    tags: ["concert", "stand-up-comedy"],
    ticketPrices: [
      {
        color: "#4C9141",
        price: 1000
      },
      {
        color: "#C1876B",
        price: 1500
      }
    ],
    datetimes: [
      {
        start: dayjs()
          .subtract(27, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(27, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      },
      {
        start: dayjs()
          .subtract(26, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(26, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      }
    ],
    minimumAge: 18,
    sections: [
      [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ],
      [
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ]
    ]
  },
  {
    id: "testgetevent2",
    eventName: "Test get event #2",
    createdBy: "officialrootpageacc",
    description: "## No description provided",
    website: "www.github.com/sindresorhus/ky",
    venueName: "Rajamangkala Stadium",
    venueCoordinates: {
      x: "13.755313892097984",
      y: "100.62221451070221"
    },
    openingDate: "2021-03-01T12:00:00.000+07:00",
    tags: ["concert", "stand-up-comedy"],
    ticketPrices: [
      {
        color: "#4C9141",
        price: 1000
      },
      {
        color: "#C1876B",
        price: 1500
      }
    ],
    datetimes: [
      {
        start: dayjs()
          .subtract(25, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(25, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      },
      {
        start: dayjs()
          .subtract(24, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(24, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      }
    ],
    minimumAge: 18,
    sections: [
      [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ],
      [
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ]
    ]
  },
  {
    id: "testgetevent3",
    eventName: "Test get event #3",
    createdBy: "officialrootpageacc",
    description: "## No description provided",
    website: "www.github.com/sindresorhus/ky",
    venueName: "Rajamangkala Stadium",
    venueCoordinates: {
      x: "13.755313892097984",
      y: "100.62221451070221"
    },
    openingDate: "2021-03-01T12:00:00.000+07:00",
    tags: ["concert", "stand-up-comedy"],
    ticketPrices: [
      {
        color: "#4C9141",
        price: 1000
      },
      {
        color: "#C1876B",
        price: 1500
      }
    ],
    datetimes: [
      {
        start: dayjs()
          .subtract(23, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(23, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      },
      {
        start: dayjs()
          .subtract(22, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(22, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      }
    ],
    minimumAge: 18,
    sections: [
      [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ],
      [
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ]
    ]
  },
  {
    id: "testgetevent4",
    eventName: "Test get event #4",
    createdBy: "officialrootpageacc",
    description: "## No description provided",
    website: "www.github.com/sindresorhus/ky",
    venueName: "Rajamangkala Stadium",
    venueCoordinates: {
      x: "13.755313892097984",
      y: "100.62221451070221"
    },
    openingDate: "2021-03-01T12:00:00.000+07:00",
    tags: ["concert", "stand-up-comedy"],
    ticketPrices: [
      {
        color: "#4C9141",
        price: 1000
      },
      {
        color: "#C1876B",
        price: 1500
      }
    ],
    datetimes: [
      {
        start: dayjs()
          .subtract(21, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(21, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      },
      {
        start: dayjs()
          .subtract(20, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(20, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      }
    ],
    minimumAge: 18,
    sections: [
      [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ],
      [
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ]
    ]
  }
]

export const localEventsList = [
  {
    id: "testgeteventlocal1",
    eventName: "Test get local event #1",
    createdBy: "localrootpageacc",
    description: "## No description provided",
    website: "www.github.com/sindresorhus/ky",
    venueName: "Rajamangkala Stadium",
    venueCoordinates: {
      x: "13.755313892097984",
      y: "100.62221451070221"
    },
    openingDate: "2021-03-01T12:00:00.000+07:00",
    tags: ["concert", "stand-up-comedy"],
    ticketPrices: [
      {
        color: "#4C9141",
        price: 1000
      },
      {
        color: "#C1876B",
        price: 1500
      }
    ],
    datetimes: [
      {
        start: dayjs()
          .subtract(19, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(19, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      },
      {
        start: dayjs()
          .subtract(18, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(18, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      }
    ],
    minimumAge: 18,
    sections: [
      [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ],
      [
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ]
    ]
  },
  {
    id: "testgeteventlocal2",
    eventName: "Test get local event #2",
    createdBy: "localrootpageacc",
    description: "## No description provided",
    website: "www.github.com/sindresorhus/ky",
    venueName: "Rajamangkala Stadium",
    venueCoordinates: {
      x: "13.755313892097984",
      y: "100.62221451070221"
    },
    openingDate: "2021-03-01T12:00:00.000+07:00",
    tags: ["concert", "stand-up-comedy"],
    ticketPrices: [
      {
        color: "#4C9141",
        price: 1000
      },
      {
        color: "#C1876B",
        price: 1500
      }
    ],
    datetimes: [
      {
        start: dayjs()
          .subtract(17, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(17, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      },
      {
        start: dayjs()
          .subtract(16, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(16, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      }
    ],
    minimumAge: 18,
    sections: [
      [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ],
      [
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ]
    ]
  },
  {
    id: "testgeteventlocal3",
    eventName: "Test get local event #3",
    createdBy: "localrootpageacc",
    description: "## No description provided",
    website: "www.github.com/sindresorhus/ky",
    venueName: "Rajamangkala Stadium",
    venueCoordinates: {
      x: "13.755313892097984",
      y: "100.62221451070221"
    },
    openingDate: "2021-03-01T12:00:00.000+07:00",
    tags: ["concert", "stand-up-comedy"],
    ticketPrices: [
      {
        color: "#4C9141",
        price: 1000
      },
      {
        color: "#C1876B",
        price: 1500
      }
    ],
    datetimes: [
      {
        start: dayjs()
          .subtract(15, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(15, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      },
      {
        start: dayjs()
          .subtract(14, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(14, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      }
    ],
    minimumAge: 18,
    sections: [
      [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ],
      [
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ]
    ]
  },
  {
    id: "testgeteventlocal4",
    eventName: "Test get local event #4",
    createdBy: "localrootpageacc",
    description: "## No description provided",
    website: "www.github.com/sindresorhus/ky",
    venueName: "Rajamangkala Stadium",
    venueCoordinates: {
      x: "13.755313892097984",
      y: "100.62221451070221"
    },
    openingDate: "2021-03-01T12:00:00.000+07:00",
    tags: ["concert", "stand-up-comedy"],
    ticketPrices: [
      {
        color: "#4C9141",
        price: 1000
      },
      {
        color: "#C1876B",
        price: 1500
      }
    ],
    datetimes: [
      {
        start: dayjs()
          .subtract(13, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(13, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      },
      {
        start: dayjs()
          .subtract(12, "days")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        end: dayjs()
          .subtract(12, "days")
          .add(2, "hours")
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString()
      }
    ],
    minimumAge: 18,
    sections: [
      [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ],
      [
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 0,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 1,
          seats: [
            [
              {
                seatRowPosition: 0,
                seatColumnPosition: 0,
                seatPrice: 1500
              },
              {
                seatRowPosition: 0,
                seatColumnPosition: 1,
                seatPrice: 1500
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ]
    ]
  }
]
