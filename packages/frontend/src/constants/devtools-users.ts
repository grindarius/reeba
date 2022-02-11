export const devtoolsUsers: Array<{ country_code: string, amount: number }> = [
  { country_code: 'FR', amount: 2200 },
  { country_code: 'RU', amount: 109 },
  { country_code: 'PE', amount: 1390 },
  { country_code: 'ID', amount: 692 },
  { country_code: 'CN', amount: 2366 },
  { country_code: 'UA', amount: 554 },
  { country_code: 'CN', amount: 136 },
  { country_code: 'CN', amount: 1837 },
  { country_code: 'KR', amount: 1611 },
  { country_code: 'TH', amount: 783 },
  { country_code: 'UA', amount: 1717 },
  { country_code: 'RU', amount: 1847 },
  { country_code: 'CO', amount: 540 },
  { country_code: 'ID', amount: 1765 },
  { country_code: 'PT', amount: 2235 },
  { country_code: 'IT', amount: 239 },
  { country_code: 'FR', amount: 685 },
  { country_code: 'PK', amount: 2237 },
  { country_code: 'PL', amount: 1317 },
  { country_code: 'NZ', amount: 326 },
  { country_code: 'RU', amount: 2416 },
  { country_code: 'CN', amount: 1482 },
  { country_code: 'TH', amount: 371 },
  { country_code: 'ID', amount: 1910 },
  { country_code: 'PT', amount: 1056 },
  { country_code: 'RU', amount: 227 },
  { country_code: 'MY', amount: 373 },
  { country_code: 'AR', amount: 1729 },
  { country_code: 'RU', amount: 956 },
  { country_code: 'SY', amount: 1806 },
  { country_code: 'BR', amount: 1987 },
  { country_code: 'CO', amount: 966 },
  { country_code: 'PH', amount: 598 },
  { country_code: 'CN', amount: 1371 },
  { country_code: 'LT', amount: 1279 },
  { country_code: 'RS', amount: 1094 },
  { country_code: 'ID', amount: 380 },
  { country_code: 'CN', amount: 144 },
  { country_code: 'CN', amount: 2060 },
  { country_code: 'PE', amount: 1057 },
  { country_code: 'ZA', amount: 1241 },
  { country_code: 'MW', amount: 2417 },
  { country_code: 'FI', amount: 622 },
  { country_code: 'RU', amount: 1344 },
  { country_code: 'ID', amount: 259 },
  { country_code: 'PL', amount: 537 },
  { country_code: 'NG', amount: 225 },
  { country_code: 'CN', amount: 732 },
  { country_code: 'CN', amount: 541 },
  { country_code: 'CN', amount: 1020 },
  { country_code: 'ID', amount: 277 },
  { country_code: 'CN', amount: 118 },
  { country_code: 'US', amount: 13 },
  { country_code: 'PT', amount: 1813 },
  { country_code: 'CU', amount: 2391 },
  { country_code: 'CN', amount: 837 },
  { country_code: 'PT', amount: 2008 },
  { country_code: 'ID', amount: 1281 },
  { country_code: 'CN', amount: 1350 },
  { country_code: 'US', amount: 631 },
  { country_code: 'CN', amount: 1523 },
  { country_code: 'VI', amount: 1590 },
  { country_code: 'CI', amount: 123 },
  { country_code: 'CN', amount: 1347 },
  { country_code: 'PL', amount: 744 },
  { country_code: 'FR', amount: 99 },
  { country_code: 'CN', amount: 2429 },
  { country_code: 'FI', amount: 1207 },
  { country_code: 'CN', amount: 2219 },
  { country_code: 'HN', amount: 1506 },
  { country_code: 'FR', amount: 1121 },
  { country_code: 'CN', amount: 2111 },
  { country_code: 'ID', amount: 677 },
  { country_code: 'ID', amount: 170 },
  { country_code: 'DE', amount: 965 },
  { country_code: 'CN', amount: 2080 },
  { country_code: 'MX', amount: 108 },
  { country_code: 'CN', amount: 140 },
  { country_code: 'NG', amount: 1550 },
  { country_code: 'BY', amount: 369 },
  { country_code: 'MX', amount: 2065 },
  { country_code: 'PT', amount: 2266 },
  { country_code: 'CA', amount: 10 },
  { country_code: 'ID', amount: 1618 },
  { country_code: 'CN', amount: 1647 },
  { country_code: 'HR', amount: 2005 },
  { country_code: 'SE', amount: 1214 },
  { country_code: 'CN', amount: 1432 },
  { country_code: 'PE', amount: 1774 },
  { country_code: 'CO', amount: 1742 },
  { country_code: 'CR', amount: 1812 },
  { country_code: 'AF', amount: 1620 },
  { country_code: 'ID', amount: 437 },
  { country_code: 'DO', amount: 304 },
  { country_code: 'FR', amount: 504 },
  { country_code: 'PL', amount: 2029 },
  { country_code: 'CN', amount: 2200 },
  { country_code: 'JP', amount: 412 },
  { country_code: 'CN', amount: 917 },
  { country_code: 'CN', amount: 1942 }
]

export const devtoolsUsersObject: Record<string, number> = devtoolsUsers.reduce<Record<string, number>>((obj, item) => {
  obj[item.country_code] = item.amount
  return obj
}, {})

export const devtoolsEvents = [
  { country: 'SI', amount: 9 },
  { country: 'PL', amount: 8 },
  { country: 'ID', amount: 4 },
  { country: 'NP', amount: 10 },
  { country: 'ID', amount: 5 },
  { country: 'RU', amount: 7 },
  { country: 'TH', amount: 9 },
  { country: 'ID', amount: 3 },
  { country: 'MA', amount: 3 },
  { country: 'ID', amount: 8 },
  { country: 'CN', amount: 5 },
  { country: 'CN', amount: 8 },
  { country: 'UA', amount: 7 },
  { country: 'PK', amount: 6 },
  { country: 'CN', amount: 1 },
  { country: 'CN', amount: 4 },
  { country: 'SN', amount: 9 },
  { country: 'BR', amount: 10 },
  { country: 'CN', amount: 2 },
  { country: 'ID', amount: 10 },
  { country: 'TH', amount: 3 },
  { country: 'UA', amount: 3 },
  { country: 'NC', amount: 2 },
  { country: 'FR', amount: 7 },
  { country: 'ID', amount: 6 },
  { country: 'PK', amount: 4 },
  { country: 'FR', amount: 5 },
  { country: 'CN', amount: 6 },
  { country: 'KZ', amount: 7 },
  { country: 'MA', amount: 6 },
  { country: 'RU', amount: 4 },
  { country: 'SE', amount: 8 },
  { country: 'ID', amount: 3 },
  { country: 'FR', amount: 3 },
  { country: 'SE', amount: 9 },
  { country: 'BF', amount: 6 },
  { country: 'PT', amount: 10 },
  { country: 'RU', amount: 7 },
  { country: 'GR', amount: 1 },
  { country: 'JP', amount: 7 },
  { country: 'SE', amount: 1 },
  { country: 'BR', amount: 6 },
  { country: 'PL', amount: 3 },
  { country: 'CZ', amount: 1 },
  { country: 'LB', amount: 9 },
  { country: 'SE', amount: 2 },
  { country: 'ID', amount: 2 },
  { country: 'IE', amount: 3 },
  { country: 'BR', amount: 6 },
  { country: 'FR', amount: 3 }
]

export const devtoolsEventsObject: Record<string, number> = devtoolsEvents.reduce<Record<string, number>>((obj, item) => {
  obj[item.country] = item.amount
  return obj
}, {})

export const users = [
  { username: 'grindarius', email: 'sgammidge0@tumblr.com', birthdate: '1991-07-13T15:24:23Z', role: 1 },
  { username: 'vkeepin1', email: 'ahairyes1@nbcnews.com', birthdate: '1993-07-06T07:49:45Z', role: 1 },
  { username: 'kraulstone2', email: 'pion2@msn.com', birthdate: '1994-12-25T05:32:20Z', role: 1 },
  { username: 'bbenting3', email: 'hakester3@webeden.co.uk', birthdate: '1997-06-30T13:56:57Z', role: 0 },
  { username: 'nespinos4', email: 'mtreen4@example.com', birthdate: '1996-05-14T22:55:18Z', role: 0 },
  { username: 'bscamel5', email: 'mhabishaw5@ft.com', birthdate: '1998-06-27T01:06:55Z', role: 1 },
  { username: 'jtogher6', email: 'isterzaker6@sphinn.com', birthdate: '1995-03-21T14:18:04Z', role: 0 },
  { username: 'jquinnell7', email: 'cmascall7@devhub.com', birthdate: '1997-04-28T11:03:53Z', role: 0 },
  { username: 'tlewerenz8', email: 'abourhill8@engadget.com', birthdate: '1999-03-29T04:34:10Z', role: 0 },
  { username: 'emaryman9', email: 'gdanilchev9@drupal.org', birthdate: '1998-05-04T14:27:30Z', role: 1 }
]

export const popularEventTypes: Record<string, number> = {
  business: 219,
  concert: 433,
  live: 27,
  musical: 90,
  technology: 13
}
