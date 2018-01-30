import { expect } from 'chai'
import ValueModule from './ValueModule'

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

    it('should return output of `toString`', () => {
      const payload = {
        data: 'Darkside',
        date: '2018-01-30',
        user: 'Anakin',
      }
      const result = 'data: Darkside, updated: 2018-01-30, by: Anakin'

      value = new ValueModule(payload)


      expect(`${value}`).to.equal(result)
    })
  })

  describe('with `setData`', () => {
    it('should update to expected date', () => {
      value.setDate('2018-01-30')

      expect(value.getDate()).to.equal('2018-01-30')
    })

    it('should update to expected data', () => {
      value.setData('Plums')

      expect(value.getData()).to.equal('Plums')
    })

    it('should update to expected user', () => {
      value.setUser('Fred')

      expect(value.getUser()).to.equal('Fred')
    })

    describe('with `getUpdateTotal`', () => {
      it('should return zero with no updates yet', () => {
        expect(value.getUpdateTotal()).to.equal(0)
      })

      it('should return one with only a single update', () => {
        value.setData('Oranges')

        expect(value.getUpdateTotal()).to.equal(1)
      })

      it('should not update if the value is the same', () => {
        value.setData('Oranges')

        expect(value.getUpdateTotal()).to.equal(1)

        value.setData('Oranges')

        expect(value.getUpdateTotal()).to.equal(1)
      })

      it('should return an incremented number with multiple updates', () => {
        expect(value.getUpdateTotal()).to.equal(0)

        value.setData('Oranges')

        expect(value.getUpdateTotal()).to.equal(1)

        value.setData('Apples')

        expect(value.getUpdateTotal()).to.equal(2)

        value.setData('Grapes')

        expect(value.getUpdateTotal()).to.equal(3)
      })
    })
  })
})
