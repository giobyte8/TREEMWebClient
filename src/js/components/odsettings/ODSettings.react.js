
var React = require('react')

var oDSettingsStore   = require('../../stores/ODSettingsStore')
var ODSettingsActions = require('../../actions/ODSettingsActions')
var ODSettingsPane = require('./ODSettingsPane')


function getState() {
  return {
    displaying: oDSettingsStore.getDisplayingPane(),
    oDAccounts: oDSettingsStore.getODAccounts(),
    oDAccountsFetchTries: oDSettingsStore.getODAccountsFetchTries(),

    currentFolder: oDSettingsStore.getCurrentFolder(),
    subFolders: oDSettingsStore.getSubFolders(),
    subFoldersFetchTries: oDSettingsStore.getSubFoldersFetchTries(),
    subFoldersOwner: oDSettingsStore.getSubFoldersOwner()
  }
}

var ODSettings = React.createClass({

  getInitialState() {
    return getState()
  },

  componentDidMount() {
    oDSettingsStore.addChangeListener(this._onChange)
    if (this.state.oDAccountsFetchTries == 0) {
      ODSettingsActions.apiFetchAccounts()
    }
  },

  componentWillUnmount() {
    oDSettingsStore.removeChangeListener(this._onChange)
  },

  render() {
    var settingsPane = this._constructSettingsPane()

    return (
      <div className="settings">
        <div className="col-xs-12 no-padding text-center">
          <h2>OneDrive Preferences</h2>
          <br/>
        </div>
        {settingsPane}
      </div>
    )
  },

  _fetchAccountFolders(oDEmail) {
    ODSettingsActions.apiFetchChildren(oDEmail, 'folder')
  },

  _fetchFolderChildren(folder) {
    console.log('Fetching for parent: ' + folder.id)
    ODSettingsActions.apiFetchChildren(this.state.subFoldersOwner, 'folder', folder)
  },

  _constructSettingsPane() {
    if (this.state.displaying === 'od-accounts') {
      return this._constructsODAccountsPane()
    }
    else if (this.state.displaying === 'od-folders') {
      return this._constructODFoldersPane()
    }
  },

  _constructODFoldersPane() {
    var settingsPaneBody

    if (this.state.subFoldersFetchTries == 0) {
      settingsPaneBody = (
        <div className="col-xs-12 text-center">
          <h2 className="fa fa-cog fa-spin fa-3x fa-fw"></h2>
          <h5>Loading OneDrive sub folders</h5>
        </div>
      )
    }
    else {
      var foldersListItems = []

      if (this.state.currentFolder && this.state.currentFolder.parentReference) {
        console.log(this.state.currentFolder)
        foldersListItems.push(
          <button
            className="list-group-item"
            key={i}
            onClick={this._fetchFolderChildren.bind(null, this.state.currentFolder.parentReference)}
            type="button"
          >
            <span className="fa fa-angle-left"></span>
            <span>&nbsp;&nbsp;Go back</span>
          </button>
        )
      }

      for (var i=0; i < this.state.subFolders.length; i++) {
        var subFolder = this.state.subFolders[i]

        foldersListItems.push(
          <button
              className="list-group-item"
              key={i}
              onClick={this._fetchFolderChildren.bind(null, subFolder)}
              type="button"
          >
            {subFolder.name}
          </button>
        )
      }

      settingsPaneBody = (
        <div className="list-group">
          {foldersListItems}
        </div>
      )
    }

    return (
      <ODSettingsPane
          paneBody={settingsPaneBody}
          title="Account folders"
          topBarButton=""
      />
    )
  },

  _constructsODAccountsPane() {
    var settingsPaneBody = ''
    if (this.state.oDAccountsFetchTries > 0 && this.state.oDAccounts.length == 0) {
      settingsPaneBody = (
        <div className="col-xs-12 text-center">
          <h2 className="fa fa-cog fa-spin fa-3x fa-fw"></h2>
          <h5>It seems that you don't have OneDrive accounts connected</h5>
          <button className="btn btn-default">
            <span className="fa fa-plus"></span>
            <span>&nbsp;&nbsp; Connect an account</span>
          </button>
        </div>
      )
    }
    else if (this.state.oDAccountsFetchTries == 0) {
      settingsPaneBody = (
        <div className="col-xs-12 text-center">
          <h2 className="fa fa-cog fa-spin fa-3x fa-fw"></h2>
          <h5>Loading OneDrive accounts</h5>
        </div>
      )
    }
    else {
      var accountsListItems = []
      for (var i=0; i< this.state.oDAccounts.length; i++) {
        accountsListItems.push(
          <button
              className="list-group-item"
              key={i}
              onClick={this._fetchAccountFolders.bind(null, this.state.oDAccounts[i])}
              type="button">
            {this.state.oDAccounts[i]}
          </button>
        )
      }

      settingsPaneBody = (
        <div className="list-group">
          {accountsListItems}
        </div>
      )
    }

    var topBarButton = (
      <button className="btn btn-primary btn-sm pull-right">
        <span className="fa fa-plus"></span>
      </button>
    )

    return (
      <ODSettingsPane
          paneBody={settingsPaneBody}
          title="Connected accounts"
          topBarButton={topBarButton}
      />
    )
  },

  _onChange() {
    this.setState(getState())
  }
})


module.exports = ODSettings