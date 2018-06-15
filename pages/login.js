import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { withAuth } from '../lib/auth-provider'

const ME = gql`
  {
    me {
      firstName
      lastName
    }
  }
`

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { isAuth, login, logout } = this.props

    isAuth ? logout() : login()
  }

  render() {
    return (
      <>
        {this.props.isAuth && (
          <Query query={ME}>
            {({ loading, data }) => {
              if (loading) return <p />

              return (
                <p>
                  Welcome, {data.me.firstName} {data.me.lastName}
                </p>
              )
            }}
          </Query>
        )}
        <button onClick={this.handleClick}>
          {this.props.isAuth ? 'Logout' : 'Login'}
        </button>
      </>
    )
  }
}

export default withAuth(Login)
