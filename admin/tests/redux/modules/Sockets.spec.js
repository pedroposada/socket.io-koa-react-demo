import reducer, { initialState } from 'redux/modules/Sockets'

describe('(Redux) Sockets', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
