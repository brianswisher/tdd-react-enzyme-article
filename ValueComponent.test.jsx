import React from 'react'
import { expect } from 'chai'
import ValueModule from './ValueModule'
import { shallow } from 'enzyme'
import ValueComponent from './ValueComponent'

let wrapper

describe('<ValueComponent>', () => {
  beforeEach(() => {
    wrapper = shallow(<ValueComponent data='Reign' date='2018-01-30' user='Fred' />)
  })

  describe('by default', () => {
    it('should exist', () => {
      expect(wrapper).to.exist
    })
  })

  it('Correctly displays the value input, date, & age in paragraphs wrapped under a parent div', () => {
    expect(wrapper.type()).to.equal('div')
    expect(wrapper.hasClass('value')).to.equal(true)

    let dataInp = wrapper.childAt(0)
    expect(dataInp.type()).to.equal('input')
    expect(dataInp.hasClass('value__data')).to.equal(true)
    expect(dataInp.props().value).to.equal('Reign')

    let dateSpa = wrapper.childAt(1)
    expect(dateSpa.type()).to.equal('span')
    expect(dateSpa.hasClass('value__date')).to.equal(true)
    expect(dateSpa.text()).to.equal('Date: 2018-01-30')

    let userSpa = wrapper.childAt(2)
    expect(userSpa.type()).to.equal('span')
    expect(userSpa.hasClass('value__user')).to.equal(true)
    expect(userSpa.text()).to.equal('User: Fred')
  })
})
