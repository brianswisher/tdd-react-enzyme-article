import React from 'react'
import nock from 'nock'
import sinon from 'sinon'
import request from 'superagent'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'

function fetchGithubUsers() {
  return new Promise((resolve, reject) => {
    request
      .get('https://api.github.com/users')
      .end((err, res) => {
        if (err) {
          reject(err)

          return
        }

        resolve(res)
      })
  })
}

const UserComponent = (props) => {
  return (
    <div className="user">
      <p className="user__name">Name: { props.name }</p>
      <p className="user__age">Age: { props.age }</p>
    </div>
  )
}

class UsersListComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      usersList: []
    }
  }

  componentDidMount() {
    this.setState({
      fetch: this._fetchGithubUsers()
    })
  }

  render() {
    if (!this.state.usersList.length) {
      return null
    }

    return (
      <div className="users-list">
        { this._constructUsersList() }
      </div>
    )
  }

  _constructUsersList() {
    return this.state.usersList.map((user, index) => {
      return (
        <UserComponent
              key={ index }
              name={ user.name }
              age={ user.age } />
      )
    })
  }

  _fetchGithubUsers() {
    return fetchGithubUsers()
      .then((res) => {
        this.setState({
          usersList: res.body.slice(0)
        })
      })
  }
}

let wrapper

describe('Test suite for User component', () => {
  beforeEach(() => {
    // Prevent duplication
    wrapper = shallow(<UserComponent
                            name={ 'Reign' }
                            age={ 26 } />)
  })

  it('UserComponent should exist', () => {
    expect(wrapper).to.exist
  })

  it('Correctly displays the user name and age in paragraphs wrapped under a parent div', () => {
    expect(wrapper.type()).to.equal('div')
    expect(wrapper.hasClass('user')).to.equal(true)

    let namePar = wrapper.childAt(0)
    expect(namePar.type()).to.equal('p')
    expect(namePar.hasClass('user__name')).to.equal(true)
    expect(namePar.text()).to.equal('Name: Reign')

    let agePar = wrapper.childAt(1)
    expect(agePar.type()).to.equal('p')
    expect(agePar.hasClass('user__age')).to.equal(true)
    expect(agePar.text()).to.equal('Age: 26')
  })
})

describe('Test suite for UsersListComponent', () => {
  beforeEach(() => {
    // Note the `beforeEach` from the start
    wrapper = mount(<UsersListComponent />)
  })

  it('Renders null based on the initial state (empty `usersList` array)', () => {
    expect(wrapper.state().usersList).to.be.instanceof(Array)
    expect(wrapper.state().usersList.length).to.equal(0)
    expect(wrapper.html()).to.equal(null)
  })

  it('Renders the root `div` with the right class and renders correct children of type `User`', () => {
    wrapper.setState({
      usersList: [
        {
          name: 'Reign',
          age: 26
        }
      ]
    })

    expect(wrapper.state().usersList).to.be.instanceof(Array)
    expect(wrapper.state().usersList.length).to.equal(1)
    expect(wrapper.find('.users-list')).to.have.length(1)

    let child = wrapper.childAt(0)
    let childProps = child.props()

    expect(child.type()).to.equal(UserComponent)
    expect(childProps.name).to.equal('Reign')
    expect(childProps.age).to.equal(26)
  })

  it('Renders the root `div` with the right class and calls `_constructUsersList` to create the users list', () => {
    sinon.spy(UsersListComponent.prototype, '_constructUsersList')

    wrapper.setState({
      usersList: [
        {
          name: 'Reign',
          age: 26
        }
      ]
    })

    expect(wrapper.find('.users-list')).to.have.length(1);
    expect(UsersListComponent.prototype._constructUsersList.calledOnce).to.equal(true);
  })

  it('The `_constructUsersList` behaves correctly', () => {
    wrapper.setState({
      usersList: [
        {
          name: 'Reign',
          age: 26
        },
        {
          name: 'Vlad',
          age: 30
        }
      ]
    })

    const res = wrapper.instance()._constructUsersList()

    expect(res).to.be.instanceof(Array)
    expect(res.length).to.equal(2)
    expect(mount(res[0]).type()).to.equal(UserComponent)
    expect(res[0].props.name).to.equal('Reign')
    expect(res[0].props.age).to.equal(26)
    expect(mount(res[1]).type()).to.equal(UserComponent)
    expect(res[1].props.name).to.equal('Vlad')
    expect(res[1].props.age).to.equal(30)
  })

  it('Correctly updates the state after AJAX call in `componentDidMount` was made', (done) => {
    const componentDidMount = UsersListComponent.prototype.componentDidMount

    sinon.spy(UsersListComponent.prototype, 'componentDidMount')

    nock('https://api.github.com')
      .get('/users')
      .reply(200, [
        { 'name': 'Reign', 'age': 26 }
      ])

    // Overwrite, so we can correctly reason about the count number
    // Don't want shared state
    wrapper = mount(<UsersListComponent />)

    expect(UsersListComponent.prototype.componentDidMount.calledOnce).to.equal(true)

    UsersListComponent.prototype.componentDidMount = componentDidMount

    wrapper.state().fetch
      .then(() => {
        expect(wrapper.state().usersList).to.be.instanceof(Array)
        expect(wrapper.state().usersList.length).to.equal(1)
        expect(wrapper.state().usersList[0].name).to.equal('Reign')
        expect(wrapper.state().usersList[0].age).to.equal(26)
        nock.cleanAll()
        done()
      })
  })
})
