import React from 'react';
import {connect} from 'react-redux';
import {Button, SettingsButton, HideSettingsButton, PlayButton, Column, InfoBox, Row} from './common';

const TotalResults = ({total, hideTotal}) => {
  return (
    total ? 
    <Column mt={12}>
    {total.map( ([a, b], i) => (
      <Row key={i}>
        <b>{a}</b>: {b}
      </Row>) 
    )}
      <div>
        <Button mt={6} type={"primary"} onClick={hideTotal}>Ok</Button>
      </div>
    </Column> : null
  )
};

export default connect(({sound}) => ({
  total: sound.total,
}), (dispatch) => (
  {
    hideTotal: () => {
      dispatch({type: 'MODE_HIDE_TOTAL'});
    }
  }
))(TotalResults);
