import React from 'react';
import styled from 'styled-components';
import { smWidth, mdWidth, lgWidth, xlWidth } from '../../common';
import { connect } from 'react-redux';

class Menu extends React.Component {
    render() {
        const {className, size} = this.props;

        return (
            size === "xl+" ? 
                <div className={`list ${className}`}>
                    <a onClick={(e) => e.preventDefault()} href="/тренажер/игра">Игра</a>
                    <a onClick={(e) => e.preventDefault()} href="/тренажер/мажор-минор">Мажор / минор</a>
                    <a onClick={(e) => e.preventDefault()} href="/тренажер/ноты">Ноты</a>
                    <a onClick={(e) => e.preventDefault()} href="/тренажер/интервалы">Интервалы</a>
                    <a onClick={(e) => e.preventDefault()} href="/тренажер/трезвучия">Трезвучия</a>
                    <a onClick={(e) => e.preventDefault()} href="/тренажер/диктант">Диктант</a>
                </div>
            :
                ''
        );
    }
} 

const ConnectedMenu = connect(
    (state) => (
    {
        size: state.sound.get("size")
    }),
    null
)(Menu);  

export default styled(ConnectedMenu)`
    position: absolute;

    @media (min-width: ${xlWidth}px){
        top: 20px;
        right: 0;
        width: 180px;
    }
    @media (max-width: ${xlWidth-1}px){
        top: 150px;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: ${mdWidth-1}px){
        top: 180px;
    }
    @media (max-width: ${smWidth-1}px){
        top: 220px;
        right: 20px;
    }
`;