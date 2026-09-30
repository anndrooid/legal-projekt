// Wartości wspólne dla schematów i frontendu (lista praktyk musi odpowiadać podstronom).

export const LANGUAGES = [
  {id: 'pl', title: 'Polski'},
  {id: 'en', title: 'English'},
]

export const PRACTICES = [
  {title: 'Rozwiązywanie Sporów', value: 'rozwiazywanie-sporow'},
  {title: 'Life Sciences', value: 'life-sciences'},
  {title: 'Fundusze i Pomoc Publiczna', value: 'fundusze-pomoc-publiczna'},
  {title: 'Digital', value: 'digital'},
  {title: 'Spory Podatkowe', value: 'spory-podatkowe'},
]

export const TIERS = [
  {title: 'Partnerzy', value: 'partner'},
  {title: 'Counsel', value: 'counsel'},
  {title: 'Associates', value: 'associate'},
  {title: 'Pozostały zespół', value: 'support'},
]

// Kategorie są wspólne dla obu języków (wartość po polsku), na stronie EN wyświetlane są tłumaczenia
export const ARTICLE_CATEGORIES = [
  'Wyróżnienia',
  'Rankingi',
  'Zespół',
  'Publikacje',
  'Media',
  'Partnerstwa',
  'Transakcje',
]
