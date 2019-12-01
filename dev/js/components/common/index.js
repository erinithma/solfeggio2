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

export const Row = styled( ({className, children, ...rest}) => {
    return (
        <div className={className} {...rest}>{children}</div>
    )
})`
    display: flex;
    ${props => getMargin(props)}
`;

export const Column = styled( ({className, children, ...rest}) => {
    return (
        <div className={className} {...rest}>{children}</div>
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

export const Button = styled(({className, children, id, onClick = () => {}, type = 'default', style, order, primary, success, danger, icon, ...rest}) => {
    const map = {
        primary: 'button--primary',
        success: 'button--success',
        danger: 'button--danger'
    }
    const typeClass = map[type] || (primary ? map['primary'] : success ? map['success'] : danger ? map['danger'] : '');
    const iconSpan = icon ? <span className={`icon-${icon}`}/> : null;
    const cssStyle = typeof order === "number" ? {...(style || {}), order} : style;

    return (
        <button id={id} className={`button ${typeClass} ${className}`} onClick={onClick} {...rest} style={cssStyle}>{iconSpan}{children}</button>
    )
})`
    ${props => getMargin(props)}
`;

const Settings = styled(({className, children, id, onClick = () => {}, step, totalSteps, showSettings, ...rest}) => {
  const iconSpan = <span className={`icon-settings`} style={{marginLeft: 6}}/>;

  return (
    <Button id={id} className={`${className}`} onClick={showSettings} {...rest}>{step} / {totalSteps} {iconSpan}</Button>
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

const HideSettings = styled(({className, id, onClick = () => {}, type = 'default', primary, success, danger, hideSettings}) => {
  const map = {
    primary: 'button--primary',
    success: 'button--success',
    danger: 'button--danger'
  }
  const typeClass = map[type] || (primary ? map['primary'] : success ? map['success'] : danger ? map['danger'] : '');
  const iconSpan = <span className={`icon-cancel`} style={{marginLeft: 6}}/>;

  return (
    <button id={id} className={`button ${typeClass} ${className}`} onClick={() => {hideSettings(); onClick();}}>{iconSpan} Отменить</button>
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

const Play = ({className, id, onClick = () => {}, repeat, setRepeat, play, repeatText, text, disabled, ...rest}) => (
    <Button id={id} className={`play ${className}`} icon="play" disabled={disabled} onClick={() => {play(); setRepeat(); onClick();}} {...rest}>{repeat ? repeatText : text}</Button>
);

export const PlayButton = connect(({sound}) => ({
  repeat: sound.repeat,
  disabled: !!sound.total,
}), (dispatch) => ({
  play: () => {
      dispatch({
          type: 'MODE_PLAY',
      });
  },
  setRepeat: () => {
      dispatch({
          type: 'REPEAT',
          payload: {
            value: true,
          }
      });
  }
}))(Play);

const Info = styled( ({className, info, text, ...rest}) => {
  return (
    text || info ? <Column {...rest} className={className}>
      <div>{text || info}</div>
    </Column> : null
  )
})`
  div { 
    background-color: ${props => props.theme.yellow}; 
    padding: 6px;
    border-radius: 4px;
  }
  align-items: flex-start;
`;

export const InfoBox = connect(({sound}) => ({
  info: sound.info,
}))(Info);
