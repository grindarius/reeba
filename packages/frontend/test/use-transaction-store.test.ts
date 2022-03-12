import { createPinia, setActivePinia } from 'pinia'
import t from 'tap'

import { useTransactionStore } from '../src/store/use-transaction-store'
import { TransactionStoreSeat } from '../src/types'

void t.test('useTransactionStore', async t => {
  t.beforeEach(() => {
    setActivePinia(createPinia())
  })

  void t.test('initial state', async t => {
    const store = useTransactionStore()

    t.strictSame(store.transactionStore.eventId, '')
    t.strictSame(store.transactionStore.datetimeId, '')
    t.strictSame(store.transactionStore.section, {
      id: '',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
  })

  void t.test('setting eventId', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, '')
    t.strictSame(store.transactionStore.section, {
      id: '',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    t.strictSame(store.currentPrice, 0)
  })

  void t.test('setting datetimeId', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')
    store.setDatetimeId('def')

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, {
      id: '',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    t.strictSame(store.currentPrice, 0)
  })

  void t.test('setting sectionId', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')
    store.setDatetimeId('def')
    store.setSection({ id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, { id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })
    t.strictSame(store.currentPrice, 0)
  })

  void t.test('setting seat', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')
    store.setDatetimeId('def')
    store.setSection({ id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })
    store.setSeat('jkl', { rowPosition: 0, columnPosition: 0, price: 500 })

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, { id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>([['jkl', { rowPosition: 0, columnPosition: 0, price: 500 }]]) })
    t.strictSame(store.currentPrice, 500)
  })

  void t.test('adding another seat', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')
    store.setDatetimeId('def')
    store.setSection({ id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })
    store.setSeat('jkl', { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat('mno', { rowPosition: 0, columnPosition: 1, price: 500 })

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, {
      id: 'ghi',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ['jkl', { rowPosition: 0, columnPosition: 0, price: 500 }],
        ['mno', { rowPosition: 0, columnPosition: 1, price: 500 }]
      ])
    })
    t.strictSame(store.currentPrice, 500)
  })

  void t.test('adding different price seat', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')
    store.setDatetimeId('def')
    store.setSection({ id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })
    store.setSeat('jkl', { rowPosition: 0, columnPosition: 0, price: 500 })

    t.throws(() => {
      store.setSeat('mno', { rowPosition: 0, columnPosition: 1, price: 1000 })
    }, 'cannot set different price seat')

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, {
      id: 'ghi',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ['jkl', { rowPosition: 0, columnPosition: 0, price: 500 }]
      ])
    })
    t.strictSame(store.currentPrice, 500)
  })

  void t.test('removing a single seat', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')
    store.setDatetimeId('def')
    store.setSection({ id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })
    store.setSeat('jkl', { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat('mno', { rowPosition: 0, columnPosition: 1, price: 500 })

    store.removeSeat('mno')

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, {
      id: 'ghi',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ['jkl', { rowPosition: 0, columnPosition: 0, price: 500 }]
      ])
    })
    t.strictSame(store.currentPrice, 500)
  })

  void t.test('clearing a seat', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')
    store.setDatetimeId('def')
    store.setSection({ id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })
    store.setSeat('jkl', { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat('mno', { rowPosition: 0, columnPosition: 1, price: 500 })

    store.clearSeats()

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, {
      id: 'ghi',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    t.strictSame(store.currentPrice, 0)
  })

  void t.test('remove whole transaction (used when checked out already)', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')
    store.setDatetimeId('def')
    store.setSection({ id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })
    store.setSeat('jkl', { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat('mno', { rowPosition: 0, columnPosition: 1, price: 500 })

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, {
      id: 'ghi',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ['jkl', { rowPosition: 0, columnPosition: 0, price: 500 }],
        ['mno', { rowPosition: 0, columnPosition: 1, price: 500 }]
      ])
    })
    t.strictSame(store.currentPrice, 500)

    store.removeTransaction()

    t.strictSame(store.transactionStore.eventId, '')
    t.strictSame(store.transactionStore.datetimeId, '')
    t.strictSame(store.transactionStore.section, {
      id: '',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
  })

  void t.test('remove seat until no seat left', async t => {
    const store = useTransactionStore()
    store.setEventId('abc')
    store.setDatetimeId('def')
    store.setSection({ id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })
    store.setSeat('jkl', { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat('mno', { rowPosition: 0, columnPosition: 1, price: 500 })

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, {
      id: 'ghi',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ['jkl', { rowPosition: 0, columnPosition: 0, price: 500 }],
        ['mno', { rowPosition: 0, columnPosition: 1, price: 500 }]
      ])
    })
    t.strictSame(store.currentPrice, 500)

    store.removeSeat('mno')

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, {
      id: 'ghi',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ['jkl', { rowPosition: 0, columnPosition: 0, price: 500 }]
      ])
    })
    t.strictSame(store.currentPrice, 500)

    store.removeSeat('jkl')

    t.strictSame(store.transactionStore.eventId, 'abc')
    t.strictSame(store.transactionStore.datetimeId, 'def')
    t.strictSame(store.transactionStore.section, {
      id: 'ghi',
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    t.strictSame(store.currentPrice, 0)
  })

  void t.test('cannot set datetimeId if eventId is empty', async t => {
    const store = useTransactionStore()

    t.throws(() => {
      store.setDatetimeId('abc')
    }, 'cannot set datetimeId if eventId is empty')
  })

  void t.test('cannt set sectionId if eventId or datetimeId is empty', async t => {
    const store = useTransactionStore()

    t.throws(() => {
      store.setSection({ id: 'ghi', rowPosition: 0, columnPosition: 0, seats: new Map<string, TransactionStoreSeat>() })
    }, 'cannot set section if eventId or datetimeId is empty')
  })

  void t.test('cannot set seatIds if eventId or datetimeId or sectionId is empty', async t => {
    const store = useTransactionStore()

    t.throws(() => {
      store.setSeat('jkl', { rowPosition: 0, columnPosition: 0, price: 1000 })
    }, 'cannot set section if eventId or datetimeId or sectionId is empty')
  })
})
