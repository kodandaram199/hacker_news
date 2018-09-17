import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, FieldArray, formValueSelector } from 'redux-form'

import OrdersFundGroup from '../OrdersFundGroup'

@reduxForm({
  form: 'MMFOrderEntryForm',
})
class MMFOrderEntryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  render() {
    const { handleSubmit, selected } = this.props;
    return (
      <form onSubmit={handleSubmit} suppressHydrationWarning>
        <FieldArray name="selected" component={OrdersFundGroup} />
      </form>
    )
  }
}

const selector = formValueSelector('MMFOrderEntryForm');

const MMFOrderEntryFormSelector = connect(
  state => {
    const selected = selector(state, 'selected');
    return {
      selected
    }
  }
)(MMFOrderEntryForm);

export default MMFOrderEntryFormSelector;



