import dotenv from 'dotenv-flow'
import { resolve } from 'path'
import { Client } from 'pg'
import t from 'tap'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..')
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

void t.test('post event', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })
  try {
    await client.connect()
    await client.query('delete from "events" where user_username = \'postevent\'')
  } catch (error) {
    t.error(error)
    t.fail()
  }

  void t.test('missing eventNames (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          eventNames: 'BTS',
          createdBy: 'postindiveventtest',
          description: '## No description provided',
          website: 'www.github.com/sindresorhus/ky',
          venueName: 'Rajamangkala Stadium',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing eventNames')
      t.strictSame(response.json().message, 'body should have required property \'eventNames\'', 'Error message from missing eventNames')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing eventNames (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          createdBy: 'postindiveventtest',
          description: '## No description provided',
          website: 'www.github.com/sindresorhus/ky',
          venueName: 'Rajamangkala Stadium',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing eventNames')
      t.strictSame(response.json().message, 'body should have required property \'eventNames\'', 'Error message from missing eventNames')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing createdBy (as empty createdBy)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          eventNames: 'BTS Army',
          createdBy: '',
          description: '## No description provided',
          website: 'www.github.com/sindresorhus/ky',
          venueName: 'Rajamangkala Stadium',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing createdBy')
      t.strictSame(response.json().message, 'body should have required property \'createdBy\'', 'Error message from missing createdBy')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing createdBy (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          eventNames: 'BTS Army',
          description: '## No description provided',
          website: 'www.github.com/sindresorhus/ky',
          venueName: 'Rajamangkala Stadium',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing createdBy')
      t.strictSame(response.json().message, 'body should have required property \'createdBy\'', 'Error message from missing createdBy')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing description (as empty description)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          eventNames: 'BTS Army',
          createdBy: 'postindiveventtest',
          description: '',
          website: 'www.github.com/sindresorhus/ky',
          venueName: 'Rajamangkala Stadium',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing description')
      t.strictSame(response.json().message, 'body should have required property \'description\'', 'Error message from missing description')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing description (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          eventNames: 'BTS Army',
          createdBy: 'postindiveventtest',
          website: 'www.github.com/sindresorhus/ky',
          venueName: 'Rajamangkala Stadium',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing description')
      t.strictSame(response.json().message, 'body should have required property \'description\'', 'Error message from missing description')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing website (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          eventNames: 'BTS Army',
          createdBy: 'postindiveventtest',
          description: '## No description provided',
          website: '',
          venueName: 'Rajamangkala Stadium',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing website')
      t.strictSame(response.json().message, 'body should have required property \'website\'', 'Error message from missing website')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing website (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          eventNames: 'BTS Army',
          createdBy: 'postindiveventtest',
          description: '## No description provided',
          venueName: 'Rajamangkala Stadium',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing website')
      t.strictSame(response.json().message, 'body should have required property \'website\'', 'Error message from missing website')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing venueName (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          eventNames: 'BTS Army',
          createdBy: 'postindiveventtest',
          description: '## No description provided',
          website: 'www.github.com/sindresorhus/ky',
          venueName: '',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing venueName')
      t.strictSame(response.json().message, 'body should have required property \'venueName\'', 'Error message from missing venueName')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing venueName (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events/post-event',
        payload: {
          eventNames: 'BTS Army',
          createdBy: 'postindiveventtest',
          description: '## No description provided',
          website: 'www.github.com/sindresorhus/ky',
          venueCoordinates: {
            x: '13.755313892097984',
            y: '100.62221451070221'
          },
          openingDate: '2021-03-01T12:00:00.000+07:00',
          tags: ['concert', 'stand-up-comedy'],
          ticketPrices: [
            {
              color: '#4C9141',
              price: 1000
            },
            {
              color: '#C1876B',
              price: 1500
            }
          ],
          datetimes: [
            {
              start: '2021-03-07T20:00:00.000+07:00',
              end: '2021-03-08T00:00:00.000+07:00'
            },
            {
              start: '2021-03-08T20:00:00.000+07:00',
              end: '2021-03-09T00:00:00.000+07:00'
            }
          ],
          minimumAge: 18,
          sections: [
            [
              {
                sectionRowPosition: 0,
                sectionColumnPositon: 0,
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
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing venueName')
      t.strictSame(response.json().message, 'body should have required property \'venueName\'', 'Error message from missing venueName')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
