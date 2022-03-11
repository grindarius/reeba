import { defineStore } from 'pinia'

import {
  TransactionStore,
  TransactionStoreSeat,
  TransactionStoreSection
} from '@/types'

export const useTransactionStore = defineStore('seatStore', {
  state: () => {
    const transactionStore: TransactionStore = {
      eventId: '',
      datetimeId: '',
      section: {
        id: '',
        rowPosition: 0,
        columnPosition: 0,
        seats: new Map<string, TransactionStoreSeat>()
      }

    }
    const currentPrice: number = 0

    return {
      transactionStore,
      currentPrice
    }
  },
  actions: {
    removeTransaction (): void {
      this.transactionStore = {
        eventId: '',
        datetimeId: '',
        section: {
          id: '',
          rowPosition: 0,
          columnPosition: 0,
          seats: new Map<string, TransactionStoreSeat>()
        }
      }
      this.currentPrice = 0
    },
    setEventId (eventId: string): void {
      this.transactionStore.eventId = eventId
      this.currentPrice = 0
    },
    setDatetimeId (datetimeId: string): void {
      this.transactionStore.datetimeId = datetimeId
      this.transactionStore.section = {
        id: '',
        rowPosition: 0,
        columnPosition: 0,
        seats: new Map<string, TransactionStoreSeat>()
      }
      this.currentPrice = 0
    },
    setSection (section: TransactionStoreSection): void {
      this.transactionStore.section = section
      this.transactionStore.section.seats = new Map<string, TransactionStoreSeat>()
      this.currentPrice = 0
    },
    setSeat (seatId: string, seatData: TransactionStoreSeat): void {
      // * if it's the first seat, set current price too.
      // * if not, check price before putting in. if not the same, throw error and do not push in
      // * the seat with different price
      if (this.transactionStore.section.seats.size === 0) {
        this.transactionStore.section.seats.set(seatId, seatData)
        this.currentPrice = seatData.price
        return
      }

      if (seatData.price === this.currentPrice) {
        this.transactionStore.section.seats.set(seatId, seatData)
        return
      }

      throw new Error('cannot set different price seat')
    },
    removeSeat (seatId: string): void {
      this.transactionStore.section.seats.delete(seatId)

      if (this.transactionStore.section.seats.size === 0) {
        this.currentPrice = 0
      }
    },
    clearSeats (): void {
      this.transactionStore.section.seats.clear()
      this.currentPrice = 0
    }
  }
})
