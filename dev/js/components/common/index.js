import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

const transformSize = (size) => {
    switch(typeof size){
        case 'string':
            return size;
        case 'number':
            return `${size}px`;
        default:
            return 0;
    }
}

const getMargin = (props) => {
    return `
        margin-top: ${transformSize(props.mt)} !important;
        margin-bottom: ${transformSize(props.mb)} !important;
        margin-left: ${transformSize(props.ml)} !important;
        margin-right: ${transformSize(props.mr)} !important;
    `;
}

export const Row = styled( ({className, children}) => {
    return (
        <div className={className}>{children}</div>
    )
})`
    display: flex;
    ${props => getMargin(props)}
`;

export const Column = styled( ({className, children}) => {
    return (
        <div className={className}>{children}</div>
    )
})`
    display: flex;
    flex-direction: column;
    ${props => getMargin(props)}
`;

export const PianoLike = ({className, children}) => {
    return (
        <div className={`piano-like ${className}`}>{children}</div>
    )
};

export const Button = styled(({className, children, id, onClick = () => {}, type = 'default', primary, success, danger, icon}) => {
    const map = {
        primary: 'button--primary',
        success: 'button--success',
        danger: 'button--danger'
    }
    const typeClass = map[type] || (primary ? map['primary'] : success ? map['success'] : danger ? map['danger'] : '');
    const iconSpan = icon ? <span className={`icon-${icon}`}/> : null;

    return (
        <button id={id} className={`button ${typeClass} ${className}`} onClick={onClick}>{iconSpan}{children}</button>
    )
})`
    ${props => getMargin(props)}
`;

const Settings = styled(({className, children, id, onClick = () => {}, type = 'default', primary, success, danger, step, totalSteps, showSettings}) => {
  const map = {
    primary: 'button--primary',
    success: 'button--success',
    danger: 'button--danger'
  }
  const typeClass = map[type] || (primary ? map['primary'] : success ? map['success'] : danger ? map['danger'] : '');
  const iconSpan = <span className={`icon-settings`} style={{marginLeft: 6}}/>;

  return (
    <button id={id} className={`button ${typeClass} ${className}`} onClick={showSettings}>{step} / {totalSteps} {iconSpan}</button>
  )
})`
    ${props => getMargin(props)}
`;

export const SettingsButton = connect(state => ({
    step: state.sound.step,
    totalSteps: state.sound.totalSteps
}), (dispatch) => ({
  showSettings: () => dispatch({
    type: 'MODE_SHOW_SETTINGS'
  })
}))(Settings);

const HideSettings = styled(({className, children, id, onClick = () => {}, type = 'default', primary, success, danger, hideSettings}) => {
  const map = {
    primary: 'button--primary',
    success: 'button--success',
    danger: 'button--danger'
  }
  const typeClass = map[type] || (primary ? map['primary'] : success ? map['success'] : danger ? map['danger'] : '');
  const iconSpan = <span className={`icon-cancel`} style={{marginLeft: 6}}/>;

  return (
    <button id={id} className={`button ${typeClass} ${className}`} onClick={hideSettings}>{iconSpan} Отменить</button>
  )
})`
    ${props => getMargin(props)}
`;

export const HideSettingsButton = connect(state => ({
  step: state.sound.step,
  totalSteps: state.sound.totalSteps
}), (dispatch) => ({
  hideSettings: () => {
      dispatch({
        type: 'MODE_HIDE_SETTINGS'
      });
      dispatch({
        type: 'MODE_SET_RESULT',
        payload: {
          result: null
        }
      })
    }
}))(HideSettings);