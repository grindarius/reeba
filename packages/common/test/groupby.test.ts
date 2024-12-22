import { expect, test } from 'vitest'
import { groupBy } from '../src/utils/index.js'

type Fruit = 'orange' | 'banana' | 'grape'

interface TestSubject {
  type: Fruit
  value: number
}

const testArray: Array<TestSubject> = [
  {
    type: 'orange',
    value: 400
  },
  {
    type: 'banana',
    value: 300
  },
  {
    type: 'grape',
    value: 503
  },
  {
    type: 'grape',
    value: 224
  },
  {
    type: 'grape',
    value: 1144
  },
  {
    type: 'orange',
    value: 638
  },
  {
    type: 'banana',
    value: 664
  },
  {
    type: 'orange',
    value: 467
  }
]

const answer: Record<Fruit, Array<TestSubject>> = {
  orange: [
    {
      type: 'orange',
      value: 400
    },
    {
      type: 'orange',
      value: 638
    },
    {
      type: 'orange',
      value: 467
    }
  ],
  banana: [
    {
      type: 'banana',
      value: 300
    },
    {
      type: 'banana',
      value: 664
    }
  ],
  grape: [
    {
      type: 'grape',
      value: 503
    },
    {
      type: 'grape',
      value: 224
    },
    {
      type: 'grape',
      value: 1144
    }
  ]
}

test('groupBy', async t => {
  const grouped = groupBy(testArray, t => t.type)
  expect(grouped).toEqual(answer)
})
