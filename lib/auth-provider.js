import hoistNonReactStatics from 'hoist-non-react-statics'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const AUTHENTICATE = gql`
  mutation authenticate($facebookToken: String!) {
    authenticate(facebookToken: $facebookToken) {
      id
      firstName
      lastName
      email
    }
  }
`

const initialState = { isLoading: true, isAuth: false, rerequest: false }

const { Provider, Consumer } = React.createContext(initialState)

class AuthProvider extends React.Component {
  state = initialState

  constructor(props) {
    super(props)

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: process.env.FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: process.env.FACEBOOK_API_VERSION
      })

      FB.Event.subscribe('auth.statusChange', response =>
        this.handleStatusChange(response)
      )

      FB.getLoginStatus(response => this.handleStatusChange(response))
    }

    // Load Facebook JavaScript SDK
    const firstScript = document.getElementsByTagName('script')[0]
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = 'https://connect.facebook.net/en_US/sdk.js'
      firstScript.parentNode.insertBefore(script, firstScript)
    }
  }

  async handleStatusChange(response) {
    const { client } = this.props

    if (response.status === 'connected') {
      const mutation = await client.mutate({
        mutation: AUTHENTICATE,
        variables: { facebookToken: response.authResponse.accessToken }
      })

      if (mutation && mutation.data.authenticate) {
        this.setState({ isAuth: true })
      } else {
        this.setState({ rerequest: true })
      }
    } else {
      this.logout(false)
    }

    this.setState({ isLoading: false })
  }

  login() {
    const options = { scope: 'email' }
    if (this.state.rerequest) options.auth_type = 'rerequest'

    FB.login(null, options)
  }

  logout(callLogout = true) {
    const { client } = this.props

    if (callLogout) FB.logout()

    this.setState(initialState)
    client.resetStore()
  }

  render() {
    return (
      <Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout
        }}
      >
        {!this.state.isLoading && this.props.children}
      </Provider>
    )
  }
}

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

export const withAuth = WrappedComponent => {
  const withDisplayName = `withAuth(${getDisplayName(WrappedComponent)})`

  class WithAuth extends React.Component {
    static displayName = withDisplayName
    static WrappedComponent = WrappedComponent

    render() {
      return (
        <Consumer>
          {client => {
            const props = { ...this.props, ...client }
            return <WrappedComponent {...props} />
          }}
        </Consumer>
      )
    }
  }

  return hoistNonReactStatics(WithAuth, WrappedComponent)
}

export default withApollo(AuthProvider)
