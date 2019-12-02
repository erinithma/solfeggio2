import React, {useState} from 'react';
import {Button, HideSettingsButton, Column, Row} from './common';
import storage from '../common/storage';
import {connect} from 'react-redux';

export default connect(null, dispatch => ({
  setTotal: (value) => dispatch({
    type: 'SET_TOTAL',
    payload: {
      value
    }
})}))(({onClick, children, setTotal}) => {
  const [limit, setLimit] = useState(storage.get().total);

  const handleClick = () => {
    storage.set({total: limit});
    setTotal(limit);
    onClick();
  }

  return (
    <Column>
      {children}
      <Row style={{alignItems: 'center'}} mb={12}>
        Количество шагов:&nbsp;
        <select className={'button'} value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </Row>
      <Row>
        <Button className="ok" icon="check" onClick={handleClick}>Применить</Button>
        <HideSettingsButton ml={12} />
      </Row>
    </Column>
  )
})