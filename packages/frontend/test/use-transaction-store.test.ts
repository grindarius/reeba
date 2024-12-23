import { createPinia, setActivePinia } from "pinia"
import { beforeEach, expect, test } from "vitest"

import { useTransactionStore } from "../src/store/use-transaction-store"
import type { TransactionStoreSeat } from "../src/types"

test("useTransactionStore", async () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test("initial state", async () => {
    const store = useTransactionStore()

    expect(store.transactionStore.eventId).toEqual("")
    expect(store.transactionStore.datetimeId).toEqual("")
    expect(store.transactionStore.section).toEqual({
      id: "",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
  })

  test("setting eventId", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("")
    expect(store.transactionStore.section).toEqual({
      id: "",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    expect(store.currentPrice).toEqual(0)
  })

  test("setting datetimeId", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")
    store.setDatetimeId("def")

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    expect(store.currentPrice).toEqual(0)
  })

  test("setting sectionId", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")
    store.setDatetimeId("def")
    store.setSection({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    expect(store.currentPrice).toEqual(0)
  })

  test("setting seat", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")
    store.setDatetimeId("def")
    store.setSection({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    store.setSeat("jkl", { rowPosition: 0, columnPosition: 0, price: 500 })

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ["jkl", { rowPosition: 0, columnPosition: 0, price: 500 }]
      ])
    })
    expect(store.currentPrice).toEqual(500)
  })

  test("adding another seat", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")
    store.setDatetimeId("def")
    store.setSection({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    store.setSeat("jkl", { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat("mno", { rowPosition: 0, columnPosition: 1, price: 500 })

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ["jkl", { rowPosition: 0, columnPosition: 0, price: 500 }],
        ["mno", { rowPosition: 0, columnPosition: 1, price: 500 }]
      ])
    })
    expect(store.currentPrice).toEqual(500)
  })

  test("adding different price seat", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")
    store.setDatetimeId("def")
    store.setSection({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    store.setSeat("jkl", { rowPosition: 0, columnPosition: 0, price: 500 })

    expect(() => {
      store.setSeat("mno", { rowPosition: 0, columnPosition: 1, price: 1000 })
    }).toThrowError("cannot set different price seat")

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ["jkl", { rowPosition: 0, columnPosition: 0, price: 500 }]
      ])
    })
    expect(store.currentPrice).toEqual(500)
  })

  test("removing a single seat", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")
    store.setDatetimeId("def")
    store.setSection({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    store.setSeat("jkl", { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat("mno", { rowPosition: 0, columnPosition: 1, price: 500 })

    store.removeSeat("mno")

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ["jkl", { rowPosition: 0, columnPosition: 0, price: 500 }]
      ])
    })
    expect(store.currentPrice).toEqual(500)
  })

  test("clearing a seat", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")
    store.setDatetimeId("def")
    store.setSection({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    store.setSeat("jkl", { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat("mno", { rowPosition: 0, columnPosition: 1, price: 500 })

    store.clearSeats()

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    expect(store.currentPrice).toEqual(0)
  })

  test("remove whole transaction (used when checked out already)", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")
    store.setDatetimeId("def")
    store.setSection({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    store.setSeat("jkl", { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat("mno", { rowPosition: 0, columnPosition: 1, price: 500 })

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ["jkl", { rowPosition: 0, columnPosition: 0, price: 500 }],
        ["mno", { rowPosition: 0, columnPosition: 1, price: 500 }]
      ])
    })
    expect(store.currentPrice).toEqual(500)

    store.removeTransaction()

    expect(store.transactionStore.eventId).toEqual("")
    expect(store.transactionStore.datetimeId).toEqual("")
    expect(store.transactionStore.section).toEqual({
      id: "",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
  })

  test("remove seat until no seat left", async () => {
    const store = useTransactionStore()
    store.setEventId("abc")
    store.setDatetimeId("def")
    store.setSection({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    store.setSeat("jkl", { rowPosition: 0, columnPosition: 0, price: 500 })
    store.setSeat("mno", { rowPosition: 0, columnPosition: 1, price: 500 })

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ["jkl", { rowPosition: 0, columnPosition: 0, price: 500 }],
        ["mno", { rowPosition: 0, columnPosition: 1, price: 500 }]
      ])
    })
    expect(store.currentPrice).toEqual(500)

    store.removeSeat("mno")

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>([
        ["jkl", { rowPosition: 0, columnPosition: 0, price: 500 }]
      ])
    })
    expect(store.currentPrice).toEqual(500)

    store.removeSeat("jkl")

    expect(store.transactionStore.eventId).toEqual("abc")
    expect(store.transactionStore.datetimeId).toEqual("def")
    expect(store.transactionStore.section).toEqual({
      id: "ghi",
      rowPosition: 0,
      columnPosition: 0,
      seats: new Map<string, TransactionStoreSeat>()
    })
    expect(store.currentPrice).toEqual(0)
  })

  test("cannot set datetimeId if eventId is empty", async () => {
    const store = useTransactionStore()

    expect(() => {
      store.setDatetimeId("abc")
    }).toThrowError("cannot set datetimeId if eventId is empty")
  })

  test("cannt set sectionId if eventId or datetimeId is empty", async () => {
    const store = useTransactionStore()

    expect(() => {
      store.setSection({
        id: "ghi",
        rowPosition: 0,
        columnPosition: 0,
        seats: new Map<string, TransactionStoreSeat>()
      })
    }).toThrowError("cannot set section if eventId or datetimeId is empty")
  })

  test("cannot set seatIds if eventId or datetimeId or sectionId is empty", async () => {
    const store = useTransactionStore()

    expect(() => {
      store.setSeat("jkl", { rowPosition: 0, columnPosition: 0, price: 1000 })
    }).toThrowError(
      "cannot set section if eventId or datetimeId or sectionId is empty"
    )
  })
})
