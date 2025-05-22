import { filterAccommodations } from '@/utils/filterAccommodations'

const accs = [
  { id:1, code:'SEN', name:'Sencilla' },
  { id:2, code:'DOB', name:'Doble' },
  { id:3, code:'TRI', name:'Triple' },
  { id:4, code:'CUA', name:'Cuádruple' },
]

describe('filterAccommodations', () => {
  it('filtra para EST', () => {
    expect(filterAccommodations(accs, 'EST').map(a => a.code)).toEqual(['SEN','DOB'])
  })
  it('filtra para JUN', () => {
    expect(filterAccommodations(accs, 'JUN').map(a => a.code)).toEqual(['TRI','CUA'])
  })
  it('filtra para SUI', () => {
    expect(filterAccommodations(accs, 'SUI').map(a => a.code)).toEqual(['SEN','DOB','TRI'])
  })
})
