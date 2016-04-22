import reducer, { initialState } from 'redux/modules/AdminForm'

describe('(Redux) AdminForm', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
