
module.exports = {

  apiUrls: {
    USER_OD_CODE_LOGIN: 'http://treem.appspot.com/api/od/codelogin',

    OD_ACCOUNTS: 'http://treem.appspot.com/api/od/accounts',
    OD_CHILDREN: 'http://treem.appspot.com/api/od/children',
    OD_LIBRARIES:'http://treem.appspot.com/api/od/libraries',
    OD_LIBRARY: 'http://treem.appspot.com/api/od/library'
  },

  actionTypes: {
    api: {
      OD_FETCH_ACCOUNTS: 'action-od-fetch-accounts',
      OD_FETCH_CHILDREN: 'action-od-fetch-children',
      OD_FETCH_LIBRARIES:'action-od-fetch-libraries',

      OD_CREATE_LIBRARY: 'action-od-create-library',

      OD_RECEIVE_ACCOUNTS: 'action-od-receive-accounts',
      OD_RECEIVE_CHILDREN: 'action-od-receive-children',
      OD_RECEIVE_LIBRARIES:'action-od-receive-libraries'
    },

    USER_LOGIN: 'action-user-login',
    USER_LOGOUT: 'action-user-logout',

    USER_OD_LOGIN: 'action-user-onedrive-login',
    USER_OD_CODE_LOGIN: 'action-user-onedrive-code-login',


    VIEW_GO_TO_VIEW: 'action-view-go-to-view'
  },

  //
  // TODO Move this data to userStore
  // In-memory user data
  user: {
    fullName: '',
    email: 'giovanni_fi05@live.com',

    oDAccounts: []
  }
}