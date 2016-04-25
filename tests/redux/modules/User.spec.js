import reducer, { initialState } from 'redux/modules/User'

describe('(Redux) User', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
