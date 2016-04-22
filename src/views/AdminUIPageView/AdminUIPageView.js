import React from 'react'
import AdminUIForm from 'forms/AdminUIForm'

type Props = {

};
export class AdminUIPageView extends React.Component {
  props: Props;

  render () {
    return (
      <div className="row">
        <div className="col-sm-10 col-md-offset-1">
          <h1>Send opportunity to users</h1>
        </div>
        <div className="col-sm-5 col-md-offset-1">
          <AdminUIForm />
        </div>
        <div className="col-sm-10 col-md-offset-1">
          <h1>Logged in users</h1>
        </div>
        <div className="col-sm-5 col-md-offset-1">
          {/* @TODO: add websocket display of logged in users */}
        </div>
      </div>
    )
  }
}

export default AdminUIPageView
