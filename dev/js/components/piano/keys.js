import React from 'react';
import { connect } from 'react-redux';
import a from '../../const';
import {detectTouch} from '../../common';
import styled from 'styled-components';
import { ClipLoader as Loader } from 'react-spinners';

const Spinner = styled(({className}) => (
    <div className={className}>
        <Loader
            sizeUnit={"px"}
            size={12}
            color={'#ccc'}
            loading={true}
        />
    </div>
))`
    display: flex;
    bottom: 4px;
    overflow: hidden;
    position: absolute;
`;

const Key = ({className, children, index, loaded, down, up, color}) => {
    const spinner = loaded <= index ? <Spinner /> : null;

    const onDown = () => {
        down(index);
        if(detectTouch()) {
            setTimeout( () => {
                onUp(index);
            }, 300)
        }
    };

    const onUp = () => {
        up(index);
    };

    return detectTouch() ?
        <div className={`${className} note`} onTouchStart={onDown}>{children}{spinner}</div>
        : 
        <div className={`${className} note`} onMouseDown={onDown} onMouseUp={onUp}>{children}{spinner}</div>
};

function connectWith(component){
    return connect(
        (state, ownProps) => (
        {
            pressed: state.sound.get("pressedKeys")[ownProps.index],
            lastTouchIndex: state.sound.get("lastTouchIndex"),
            loaded: state.sound.get("loaded"),
            color: state.sound.get("result") ? state.sound.get("result")[ownProps.index] : null,
            isTouch: detectTouch(),
        }),
        (dispatch) => (
        { 
            down: (index) => dispatch({
                type: a.KEY_DOWN,
                payload: {index, fromMouse: !detectTouch()}
            }),
            up: (index) => dispatch({
                type: a.KEY_UP,
                payload: {index, fromMouse: !detectTouch()}
            })  
        })
    )(component);
}

const BlackKey = styled(Key)`

    cursor: pointer;
    border-radius: 0 0 2px 2px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    ${props => `background-color: ${props.theme.blacks[0]};`}

    border-bottom: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    position: absolute;
    left: 50%;
    width: 60%;
    margin-left: 20%;
    top: 0;
    z-index: 1;
    height: 65%;
  
    &:hover {
        ${props => !props.isTouch && `background-color: ${props.theme.blacks[1]};`}
    }
  
    ${props => 
        props.color === 'red' ? `background-color: ${props.theme.dangerDark} !important;` : 
        props.color === 'green' ? `background-color: ${props.theme.successDark} !important;` :
        props.color === 'yellow' ? `background-color: ${props.theme.yellowDark} !important;` : 
        props.color === 'blue' ? `background-color: ${props.theme.primaryDark} !important;` : ''
    }

    ${props => 
        props.pressed ? `
            height: 63%;
            background: linear-gradient(to bottom, ${props.theme.blacks[0]}, ${props.theme.blacks[2]}); 
        ` : ''
    }
`;

const WhiteKey = styled(Key)`

    cursor: pointer;
    border-radius: 0 0 2px 2px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    background-color: ${props => `${props.theme.whites[0]}`};
    border-bottom: 1px solid black;
    border-left: 1px solid #777;
    border-right: 1px solid black;
    background-size: 100%;
    height: 100%;
    width: 100%;

    &:hover {
        ${props => !props.isTouch && `background-color: ${props.theme.whites[1]};`}
    }

    ${props => 
        props.color === 'red' ? `background-color: ${props.theme.danger} !important;` : 
        props.color === 'green' ? `background-color: ${props.theme.success} !important;` :
        props.color === 'yellow' ? `background-color: ${props.theme.yellow} !important;` : 
        props.color === 'blue' ? `background-color: ${props.theme.primary} !important;` : ''          
    }

    ${props => 
        props.pressed ? `
            height: 98%;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);
            background: linear-gradient(to bottom, ${props.theme.whites[0]}, ${props.theme.whites[2]}); 
        ` : ''
    }
`;

export default {
    White: connectWith(WhiteKey),
    Black: connectWith(BlackKey)
}
