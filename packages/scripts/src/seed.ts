// * Generate data to be put in the database, all of them.

import chalk from 'chalk'
import { countries } from 'countries-list'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as csv from 'fast-csv'
import got from 'got'
import { nanoid } from 'nanoid'
import { createWriteStream } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { faker } from '@faker-js/faker'
import {
  event_datetimes,
  event_seats,
  event_sections,
  event_tags,
  event_tags_bridge,
  groupBy,
  t_event_price,
  t_event_status,
  t_user_role,
  transaction_details,
  transactions,
  user_followers,
  users
} from '@reeba/common'

dayjs.extend(customParseFormat)

faker.seed(112233)

const compatibleExcelNanoid = (): string => {
  const id = nanoid()

  if (id.startsWith('-')) {
    return '\'' + id
  }

  return id
}

interface EventGroup {
  event: Array<CustomEvent>
  datetimes: Array<event_datetimes>
  sections: Array<event_sections>
  seats: Array<event_seats>
}

interface CustomEvent {
  event_id: string
  user_username: string
  event_name: string
  event_description: string
  event_cover_image_path: string
  event_website: string
  event_venue_name: string
  event_venue_coordinates: string
  event_creation_date: string
  event_opening_date: string
  event_status: t_event_status
  event_ticket_prices: string
  event_minimum_age: string
  prices_array?: Array<t_event_price>
}

function * range (start: number, stop?: number, step: number = 1): IterableIterator<number> {
  // * 1 parameter case
  if (stop == null) {
    stop = start
    start = 0
  }

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i
  }
}

const eventPricesToString = (prices: Array<t_event_price>): string => {
  return prices.map(p => `{ ${p.price_color}, ${p.price_value} }`).join(', ')
}

const generateEventPrices = (): Array<t_event_price> => {
  const arrayLength = faker.mersenne.rand(3, 7)
  const pricesSet: Set<number> = new Set()

  while (pricesSet.size !== arrayLength) {
    pricesSet.add(Math.floor(faker.mersenne.rand(1001, 9999) / 1000) * 1000)
  }

  return [...pricesSet].map(price => {
    return {
      price_color: faker.internet.color(),
      price_value: price
    }
  }).sort((a, b) => a.price_value - b.price_value)
}

const getAndSaveImage = async (avatarUrl: string): Promise<string> => {
  const response = await got.get(avatarUrl)

  const filename = `${compatibleExcelNanoid()}.${response.headers['content-type']?.split('/')[1] ?? 'png'}`
  await writeFile(
    resolve(__dirname, '..', '..', 'backend', 'uploads', filename),
    response.rawBody
  )

  return filename
}

const generateUserList = async (amount: number): Promise<Array<users>> => {
  const userList: Array<users> = []

  // eslint-disable-next-line
  for await (const _ of [...range(amount)]) {
    const card = faker.helpers.contextualCard()

    const user: users = {
      user_username: card.username.replace(/\./g, ''),
      user_email: card.email,
      user_password: 'asdfghjkl123',
      user_role: faker.mersenne.rand(1, 100) > 60 ? t_user_role.admin : t_user_role.user,
      user_image_profile_path: await getAndSaveImage(card.avatar),
      user_verification_status: faker.mersenne.rand(1, 100) < 70,
      user_telephone_country_code: faker.random.arrayElement(Object.values(countries)).phone.split(',')[0],
      user_telephone_number: faker.phone.phoneNumber('09########'),
      user_birthdate: dayjs(faker.date.between('1960-01-01', '2006-01-01')).format('YYYY-MM-DD')
    }

    console.log(chalk.green('Welcome', card.username, 'to ReebA!'))
    userList.push(user)
  }

  return userList
}

const generateFollowersList = (userList: Array<users>, amount: number = 50): Array<user_followers> => {
  return Array.from({ length: amount }, () => {
    const follower = faker.random.arrayElement(userList).user_username
    let following = faker.random.arrayElement(userList).user_username
    while (following === follower) {
      following = faker.random.arrayElement(userList).user_username
    }

    console.log(chalk.green('Woohoo!', follower, 'now follows', following))
    return {
      follow_id: compatibleExcelNanoid(),
      base_username: follower,
      base_username_following: following
    }
  })
}

const generateEvent = async (userList: Array<users>, amount: number = 30): Promise<EventGroup> => {
  const eventList: Array<CustomEvent> = []
  const eventDatetimeList: Array<event_datetimes> = []
  const eventSectionList: Array<event_sections> = []
  const eventSeatList: Array<event_seats> = []

  // eslint-disable-next-line
  for await (const _ of [...range(amount)]) {
    const creationDateString = dayjs(faker.date.between('2000-01-01', dayjs().format('YYYY-MM-DD'))).format('YYYY-MM-DD HH:mm:ss.SSS Z')
    const pricesArray = generateEventPrices()
    const coordinates = {
      x: Number(faker.address.latitude()),
      y: Number(faker.address.longitude())
    }

    const reebaEvent: CustomEvent = {
      event_id: compatibleExcelNanoid(),
      user_username: faker.random.arrayElement(userList).user_username,
      event_name: faker.commerce.product(),
      event_description: faker.lorem.paragraphs(5, ''),
      event_cover_image_path: await getAndSaveImage(faker.image.animals(100, 100, true)),
      event_website: faker.internet.url(),
      event_venue_name: faker.address.streetName(),
      event_venue_coordinates: `${coordinates.x}, ${coordinates.y}`,
      event_creation_date: creationDateString,
      event_opening_date: dayjs(faker.date.soon(90, dayjs(creationDateString, 'YYYY-MM-DD HH:mm:ss.SSS Z').format('YYYY-MM-DD')))
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0)
        .format('YYYY-MM-DD HH:mm:ss.SSS Z'),
      event_status: faker.mersenne.rand(1, 100) > 50 ? t_event_status.open : t_event_status.closed,
      event_ticket_prices: eventPricesToString(pricesArray),
      prices_array: pricesArray,
      event_minimum_age: faker.mersenne.rand(1, 100) > 60 ? faker.mersenne.rand(18, 20).toString() : '0'
    }

    eventList.push(reebaEvent)
  }

  console.log(chalk.blue('Generating each event\'s datetimes'))
  for (const indivEvent of eventList) {
    let openingDate = dayjs(indivEvent.event_opening_date, 'YYYY-MM-DD HH:mm:ss.SSS Z')

    // eslint-disable-next-line
    for (const _ of [...range(faker.mersenne.rand(2, 5))]) {
      const datetime: event_datetimes = {
        event_datetime_id: compatibleExcelNanoid(),
        event_id: indivEvent.event_id,
        event_start_datetime: openingDate.add(7, 'days').format('YYYY-MM-DD HH:mm:ss.SSS Z'),
        event_end_datetime: openingDate.add(7, 'days').add(2, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS Z')
      }

      eventDatetimeList.push(datetime)
      openingDate = dayjs(openingDate).add(3, 'days')
    }
  }

  console.log(chalk.blue('Generating event\'s section'))
  for (const indivEvent of eventList) {
    const sectionRowAmount = faker.mersenne.rand(1, 8)
    const sectionColumnAmount = faker.mersenne.rand(1, 8)

    for (const indivDatetime of eventDatetimeList.filter((datetime) => datetime.event_id === indivEvent.event_id)) {
      const sections = Array.from<Array<event_sections>, Array<event_sections>>({ length: sectionRowAmount }, (_, i) => {
        return Array.from<event_sections, event_sections>({ length: sectionColumnAmount }, (_, j) => {
          return {
            event_section_id: compatibleExcelNanoid(),
            event_datetime_id: indivDatetime.event_datetime_id,
            event_section_row_position: i,
            event_section_column_position: j
          }
        })
      })

      eventSectionList.push(...sections.flat())
    }
  }

  console.log(chalk.blue('Generating each event\'s seats'))
  for (const indivEvent of eventList) {
    for (const indivDatetime of eventDatetimeList.filter((datetime) => datetime.event_id === indivEvent.event_id)) {
      const seatRowAmount = (indivEvent.prices_array ?? []).length
      const seatColumnAmount = faker.mersenne.rand(8, 30)
      for (const indivSection of eventSectionList.filter(sec => sec.event_datetime_id === indivDatetime.event_datetime_id)) {
        const seats = Array.from<Array<event_seats>, Array<event_seats>>({ length: seatRowAmount }, (_, i) => {
          return Array.from<event_seats, event_seats>({ length: seatColumnAmount }, (_, j) => {
            return {
              event_seat_id: compatibleExcelNanoid(),
              event_section_id: indivSection.event_section_id,
              event_seat_price: (indivEvent.prices_array ?? [])[i].price_value,
              event_seat_row_position: i,
              event_seat_column_position: j
            }
          })
        })

        eventSeatList.push(...seats.flat())
      }
    }
  }

  return {
    event: eventList,
    datetimes: eventDatetimeList,
    sections: eventSectionList,
    seats: eventSeatList
  }
}

const getSectionId = (eventId: string, eventData: EventGroup): string => {
  const sectionsList: Array<event_sections> = []

  for (const datetime of eventData.datetimes.filter(datetime => eventId === datetime.event_id)) {
    for (const section of eventData.sections.filter(sec => sec.event_datetime_id === datetime.event_datetime_id)) {
      sectionsList.push(section)
    }
  }

  return faker.random.arrayElement(sectionsList).event_section_id
}

const getAllSeatsFromSectionId = (sectionId: string, eventData: EventGroup): Array<event_seats> => {
  const seatsList: Array<event_seats> = eventData.seats.filter(seat => seat.event_section_id === sectionId)
  return seatsList
}

const generateTransactions = (users: Array<users>, eventData: EventGroup): {
  transactions: Array<transactions>
  details: Array<transaction_details>
} => {
  const transactions = Array.from<transactions, transactions>({ length: 300 }, () => {
    const ticketBuyer = faker.random.arrayElement(users)
    let eventsThatGoTo = faker.random.arrayElement(eventData.event)

    while (eventsThatGoTo.user_username === ticketBuyer.user_username) {
      eventsThatGoTo = faker.random.arrayElement(eventData.event)
    }

    const lastDateEvent = eventData.datetimes
      .filter(datetime => datetime.event_id === eventsThatGoTo.event_id)
      .sort((a, b) => dayjs(b.event_start_datetime, 'YYYY-MM-DD HH:mm:ss.SSS Z').unix() - dayjs(a.event_start_datetime, 'YYYY-MM-DD HH:mm:ss.SSS Z').unix())

    return {
      transaction_id: compatibleExcelNanoid(),
      user_username: ticketBuyer.user_username,
      event_id: eventsThatGoTo.event_id,
      transaction_time: dayjs(faker.date.between(
        dayjs(eventsThatGoTo.event_opening_date, 'YYYY-MM-DD HH:mm:ss.SSS Z').format(),
        dayjs(lastDateEvent[0].event_start_datetime, 'YYYY-MM-DD HH:mm:ss.SSS Z').format()
      )).format('YYYY-MM-DD HH:mm:ss.SSS Z')
    }
  })

  const details: Array<transaction_details> = []

  transactions.forEach(transact => {
    const randomSectionId = getSectionId(transact.event_id, eventData)
    const allSeatsGroupedByPrice = groupBy(getAllSeatsFromSectionId(randomSectionId, eventData), (s) => s.event_seat_price)
    const priceKey = faker.random.arrayElement(Object.keys(allSeatsGroupedByPrice))
    const selectedSeat = faker.random.arrayElements(allSeatsGroupedByPrice[parseInt(priceKey)], faker.mersenne.rand(1, 4)).map(s => {
      return {
        event_seat_id: s.event_seat_id,
        transaction_id: transact.transaction_id
      }
    })

    details.push(...selectedSeat)
  })

  return {
    transactions,
    details
  }
}

const generateEventTags = (): Array<event_tags> => {
  const tags: Array<event_tags> = [
    'sports',
    'business',
    'stand-up-comedy',
    'technology',
    'concert',
    'entertainment',
    'fan-meet',
    'gameshow',
    'lifestyle',
    'musical',
    'online',
    'live',
    'seminar',
    'variety'
  ].map(t => { return { event_tag_label: t } })

  return tags
}

const generateTagsBridge = (tags: Array<event_tags>, events: Array<CustomEvent>): Array<event_tags_bridge> => {
  const bridge: Array<event_tags_bridge> = []

  events.forEach(ev => {
    const tagForEv = faker.random.arrayElements(tags, faker.mersenne.rand(1, 5))

    tagForEv.forEach(t => bridge.push({ event_tag_label: t.event_tag_label, event_id: ev.event_id }))
  })

  return bridge
}

// eslint-disable-next-line
(async () => {
  console.log(chalk.blue('Generating users...'))
  const users = await generateUserList(20)

  console.log(chalk.blue('Generating users followers...'))
  const followersList = generateFollowersList(users, 1000)

  console.log(chalk.blue('Generating events related data...'))
  const eventData = await generateEvent(users, 5)

  console.log(chalk.blue('Generating transactions...'))
  const transactions = generateTransactions(users, eventData)

  console.log(chalk.blue('Generating event tags...'))
  const tags = generateEventTags()

  console.log(chalk.blue('Generating event tags bridge...'))
  const bridge = generateTagsBridge(tags, eventData.event)

  console.log(chalk.yellow('Writing ./output/users.csv'))
  const usersDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'users.csv'))
  const usersStream = csv.format({ headers: true, delimiter: ',', quote: true })

  usersStream.pipe(usersDestinationFile)

  users.forEach(user => {
    usersStream.write(user)
  })

  usersStream.end()

  console.log(chalk.yellow('Writing ./output/user_followers.csv'))
  const followersDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'user_followers.csv'))
  const followersStream = csv.format({ headers: true, delimiter: ',', quote: true })

  followersStream.pipe(followersDestinationFile)

  followersList.forEach(follow => {
    followersStream.write(follow)
  })

  followersStream.end()

  console.log(chalk.yellow('Writing ./output/events.csv'))
  const normalizedEvents = eventData.event.map(ev => {
    delete ev.prices_array

    return ev
  })

  const eventDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'events.csv'))
  const eventsStream = csv.format({ headers: true, delimiter: ',', quote: true })

  eventsStream.pipe(eventDestinationFile)

  normalizedEvents.forEach(ev => {
    eventsStream.write(ev)
  })

  eventsStream.end()

  console.log(chalk.yellow('Writing ./output/event_datetimes.csv'))
  const eventDatetimesDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'event_datetimes.csv'))
  const eventDatetimesStream = csv.format({ headers: true, delimiter: ',', quote: true })

  eventDatetimesStream.pipe(eventDatetimesDestinationFile)

  eventData.datetimes.forEach(datetime => {
    eventDatetimesStream.write(datetime)
  })

  eventDatetimesStream.end()

  console.log(chalk.yellow('Writing ./output/event_sections.csv'))
  const eventSectionsDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'event_sections.csv'))
  const eventSectionsStream = csv.format({ headers: true, delimiter: ',', quote: true })

  eventSectionsStream.pipe(eventSectionsDestinationFile)

  eventData.sections.forEach(section => {
    eventSectionsStream.write(section)
  })

  eventSectionsStream.end()

  console.log(chalk.yellow('Writing ./output/event_seats.csv'))
  const eventSeatsDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'event_seats.csv'))
  const eventSeatsStream = csv.format({ headers: true, delimiter: ',', quote: true })

  eventSeatsStream.pipe(eventSeatsDestinationFile)

  eventData.seats.forEach(seat => {
    eventSeatsStream.write(seat)
  })

  eventSeatsStream.end()

  console.log(chalk.yellow('Writing ./output/transactions.csv'))
  const transactionsDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'transactions.csv'))
  const transactionsStream = csv.format({ headers: true, delimiter: ',', quote: true })

  transactionsStream.pipe(transactionsDestinationFile)

  transactions.transactions.forEach(t => {
    transactionsStream.write(t)
  })

  transactionsStream.end()

  console.log(chalk.yellow('Writing ./output/transaction_details.csv'))
  const transactionDetailsDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'transaction_details.csv'))
  const transactionsDetailsStream = csv.format({ headers: true, delimiter: ',', quote: true })

  transactionsDetailsStream.pipe(transactionDetailsDestinationFile)

  transactions.details.forEach(d => {
    transactionsDetailsStream.write(d)
  })

  transactionsDetailsStream.end()

  console.log(chalk.yellow('Writing ./output/event_tags.csv'))
  const eventTagsDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'event_tags.csv'))
  const eventTagsStream = csv.format({ headers: true, delimiter: ',', quote: true })

  eventTagsStream.pipe(eventTagsDestinationFile)

  tags.forEach(d => {
    eventTagsStream.write(d)
  })

  eventTagsStream.end()

  console.log(chalk.yellow('Writing ./output/event_tags_bridge.csv'))
  const tagsBridgeDestinationFile = createWriteStream(resolve(__dirname, '..', 'output', 'event_tags_bridge.csv'))
  const tagsBridgeStream = csv.format({ headers: true, delimiter: ',', quote: true })

  tagsBridgeStream.pipe(tagsBridgeDestinationFile)

  bridge.forEach(d => {
    tagsBridgeStream.write(d)
  })

  tagsBridgeStream.end()
})()
