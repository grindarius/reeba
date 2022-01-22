<template>
  <div class="event-page">
    <div class="event-page-content">
      <div class="event-top-part">
        <div class="rounded-lg">
          <img class="mx-auto rounded-lg md:mx-0" src="@/assets/bts-world-tour.jpg" alt="image">
        </div>
        <div class="grow">
          <h1 class="clear-right font-sans text-4xl text-white">
            BTS WORLD TOUR 'LOVE YOURSELF' BANGKOK
          </h1>
          <div class="event-details">
            <div class="event-calendar">
              <v-mdi name="mdi-calendar-blank" size="60" fill="#D5A755" />
              <div class="calendar-content">
                <h1 class="detail-header">
                  Show details
                </h1>
                <h1 class="detail-sub-header">
                  6-7 April 2022 • 19:00
                </h1>
              </div>
            </div>
            <div class="event-times">
              <v-mdi name="mdi-alarm" size="60" fill="#D5A755" />
              <div class="times-content">
                <h1 class="detail-header">
                  Opening date
                </h1>
                <h1 class="detail-sub-header">
                  15 March 2022 • 0:00
                </h1>
              </div>
            </div>
            <div class="event-prices">
              <v-mdi name="mdi-currency-usd" size="60" fill="#D5A755" />
              <div class="prices-content">
                <h1 class="detail-header">
                  Prices
                </h1>
                <h1 class="detail-sub-header">
                  2,000 / 2,800 / 3,800 / 4,800 / 5,800 / 6,400 / 6,800 THB
                </h1>
              </div>
            </div>
            <div class="event-place">
              <v-mdi name="mdi-map-marker-account" size="60" fill="#D5A755" />
              <div class="place-content">
                <h1 class="detail-header">
                  Place
                </h1>
                <h1 class="detail-sub-header">
                  Rajamangkala National Stadium
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="event-bottom-part">
        <div class="order-2 col-span-1 md:order-1 md:col-span-2">
          <div class="mb-4 font-sans text-4xl text-white">
            Description
          </div>
          <p class="font-sans text-white break-words">
            ขอขอบคุณอาร์มี่ทุกคนอีกครั้งที่ให้การตอบรับเป็นอย่างดีกับการร่วมกันสร้างประวัติศาสตร์หน้าใหม่ในการจัดคอนเสิร์ตใหญ่ของศิลปินเกาหลีในประเทศไทยบนพื้นที่สนามกีฬาที่ใหญ่ที่สุดในประเทศไทย
          </p>
          <p class="mt-3 font-sans text-white break-words">
            “สนามราชมังคลากีฬาสถาน” กับงาน BTS WORLD TOUR ‘LOVE YOURSELF’ BANGKOK บัตรจำนวน 80,000 กว่าใบทั้ง 2 รอบการแสดง ถูกจำหน่ายหมดภายในเวลาอันรวดเร็วโดย BTS
            ถือเป็นศิลปินเกาหลีวงแรกที่เปิดคอนเสิร์ตที่นี่!!! แต่สำหรับใครที่ยังนกบัตรอยู่ไม่ต้องเสียใจไป “ไอมี่ไทยแลนด์” และ “บิ๊กฮิต เอนเตอร์เทนเม้น” มีข่าวดีมาบอก!! เราจะเปิดขายบัตรเพิ่มเติมในราคา 6,400 บาท
            ทั้ง 2 รอบการแสดง (เสาร์ที่ 6 เมษายน และ อาทิตย์ที่ 7 เมษายน 2562) รวมทั้งทีมงานยังได้ตรวจสอบบัตรที่มีการขายต่อเพิ่มราคา / การซื้อ-ขายบัตรนอกระบบ และพบว่ามีบัตรจำนวนหนึ่งที่เข้าข่ายผิดกฎจริง
            จึงจะนำบัตรเหล่านั้นกลับเข้าสู่ระบบขายใหม่ในครั้งนี้ด้วย โดยสามารถตรวจสอบบัตรที่นำเข้าระบบได้ผ่านทางหน้าซื้อบัตร ในวันเปิดขายบัตรพร้อมกับ บัตรที่ขายเพิ่มเติมข้างต้น และในครั้งนี้จะใช้ระบบ Best Seat
            สำหรับการซื้อบัตร นั่นคือสามารถเลือกได้เพียงโซนที่ต้องการ และทางระบบจะเลือกที่นั่งที่ดีที่สุดที่เหลืออยู่ในโซนนั้นมาให้ และต้องชำระเงินทันทีตามรายละเอียดดังนี้
          </p>
        </div>
        <div class="order-1 md:order-2">
          <div class="mb-4 font-sans text-4xl text-white">
            Tickets
          </div>
          <div class="ticket-date-selector">
            <h1 class="font-sans text-2xl font-medium text-pale-gray">
              Rajamangkala National Stadium
            </h1>
            <div>
              <h1 class="mt-2 font-sans text-2xl font-medium text-pale-gray">
                Prices
              </h1>
              <h1 class="font-sans text-xl font-medium text-pale-gray">
                2,000 / 2,800 / 3,800 / 4,800 / 5,800 / 6,400 / 6,800 THB
              </h1>
            </div>
            <h1 class="mt-2 text-2xl font-medium text-pale-gray">
              Show date
            </h1>
            <div class="date-selector">
              <div class="show-date">
                <div class="show-date-schedule">
                  Wednesday, 6 April 2022
                </div>
                <router-link to="/select-seat" class="buy-button">
                  Buy
                </router-link>
              </div>
              <div class="show-date">
                <div class="show-date-schedule">
                  Thursday, 7 April 2022
                </div>
                <router-link to="/select-seat" class="buy-button">
                  Buy
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'event'
})
</script>

<style scoped lang="scss">
.event-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.event-top-part {
  @apply flex flex-col gap-6 md:flex-row;
}

.event-bottom-part {
  @apply grid grid-cols-1 gap-6 mt-12 md:grid-cols-3;
}

.event-page-content {
  @apply container px-4 mt-10;
}

.event-details {
  @apply grid grid-cols-1 grid-flow-row gap-4 mt-12 md:grid-cols-2;
}

.event-calendar, .event-prices, .event-times, .event-place {
  @apply flex flex-row gap-3;
}

.event-prices, .event-place {
  @apply col-span-1 md:col-span-2;
}

.detail-header {
  @apply font-sans text-xl text-white;
}

.detail-sub-header {
  @apply font-sans text-sm text-white;
}

.ticket-date-selector {
  @apply p-4 rounded-lg bg-pale-yellow;
}

.show-date {
  @apply flex flex-row justify-between my-2;
}

.show-date-schedule {
  @apply font-sans text-lg font-medium text-pale-gray;
}

.buy-button {
  @apply inline-block py-2 px-8 text-white rounded-lg bg-pale-gray hover:bg-gray-hover;
}
</style>
