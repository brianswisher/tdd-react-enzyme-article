import { expect } from 'chai'

const ValueModule = ({data = null, user = null, date = null}) => {
  const C = { // C = cache
    data,
    date,
    user
  }
  const values = []

  return {
    getData() {
      return C.data
    },

    getDate() {
      return C.date
    },

    getUser() {
      return C.user
    },

    getUpdateTotal() {
      return values.length
    },

    setData({data = null, user = null, date = null}) {
      if (data !== C.data) {
        values.push(data)

        C.data = values[values.length - 1]
      }

      if (user !== C.user) {
        C.user = user
      }

      if (date !== C.date) {
        C.date = date
      }
    }
  }
}

let value

describe('ValueModule', () => {
  beforeEach(() => {
    value = new ValueModule({})
  })

  describe('by default', () => {
    it('should exist', () => {
      expect(value).to.exist
    })

    it('should return null data', () => {
      expect(value.getData()).to.equal(null)
    })

    it('should return null date', () => {
      expect(value.getDate()).to.equal(null)
    })

    it('should return null user', () => {
      expect(value.getUser()).to.equal(null)
    })
  })

  describe('with instantiated data', () => {
    it('should return data', () => {
      value = new ValueModule({data: 'Onions'})

      expect(value.getData()).to.equal('Onions')
    })

    it('should return date', () => {
      value = new ValueModule({date: '01/29/2018'})

      expect(value.getDate()).to.equal('01/29/2018')
    })

    it('should return user', () => {
      value = new ValueModule({user: 'Luke'})

      expect(value.getUser()).to.equal('Luke')
    })
  })

  describe('with `setData`', () => {
    it('should update to expected date', () => {
      value.setData({date: '01/29/2014'})

      expect(value.getDate()).to.equal('01/29/2014')
    })

    it('should update to expected data', () => {
      value.setData({data: 'Apples'})

      expect(value.getData()).to.equal('Apples')
    })

    it('should update to expected user', () => {
      value.setData({user: 'Fred'})

      expect(value.getUser()).to.equal('Fred')
    })

    describe('with `getUpdateTotal`', () => {
      it('should return zero with no updates yet', () => {
        expect(value.getUpdateTotal()).to.equal(0)
      })

      it('should return one with only a single update', () => {
        value.setData({data: 'Oranges'})

        expect(value.getUpdateTotal()).to.equal(1)
      })

      it('should not update if the value is the same', () => {
        value.setData({data: 'Oranges'})

        expect(value.getUpdateTotal()).to.equal(1)

        value.setData({data: 'Oranges'})

        expect(value.getUpdateTotal()).to.equal(1)
      })

      it('should return an incremented number with multiple updates', () => {
        value.setData({data: 'Oranges'})

        expect(value.getUpdateTotal()).to.equal(1)

        value.setData({data: 'Apples'})

        expect(value.getUpdateTotal()).to.equal(2)

        value.setData({data: 'Grapes'})

        expect(value.getUpdateTotal()).to.equal(3)
      })
    })
  })
})
