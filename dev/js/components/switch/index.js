import React from 'react';
import styled from 'styled-components';
import { smWidth, mdWidth, lgWidth, xlWidth } from '../../common';
import { connect } from 'react-redux';

class Menu extends React.Component {

    componentDidMount() {
        let s = document.createElement("script");
        s.textContent = `VK.Widgets.Group("vk_groups", {mode: 3}, 171372561);`;
        document.body.appendChild(s);
    }

    render() {
        const {className, size} = this.props;

        return (
            size === "xl+" || size === "xl" || size === "lg" ? 
                <div className={className}>
                    <div className={`list`}>
                        <a onClick={(e) => e.preventDefault()} href="/тренажер/игра">Игра</a>
                        <a onClick={(e) => e.preventDefault()} href="/тренажер/мажор-минор">Мажор / минор</a>
                        <a onClick={(e) => e.preventDefault()} href="/тренажер/ноты">Ноты</a>
                        <a onClick={(e) => e.preventDefault()} href="/тренажер/интервалы">Интервалы</a>
                        <a onClick={(e) => e.preventDefault()} href="/тренажер/трезвучия">Трезвучия</a>
                        <a onClick={(e) => e.preventDefault()} href="/тренажер/диктант">Диктант</a>
                    </div> 
                    <br/>
                    <br/>
                    <div className={`list`}>
                        <a href="/donation">Помощь сайту</a>
                        <a href="/книги">Онлайн книги</a>
                    </div> 
                    <br/>
                    <br/>
                    <div id="vk">
                        <div id="vk_groups"></div>
                    </div>
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
        top: 100px;
        right: 0;
        width: 180px;
    }
    @media (max-width: ${mdWidth-1}px){
        top: 180px;
        right: 0;
    }

    .list {
        width: 100%;
    }
`;