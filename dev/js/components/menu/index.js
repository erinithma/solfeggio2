import React from 'react';
import styled from 'styled-components';
import { smWidth, mdWidth, lgWidth, xlWidth } from '../../common';
import { connect } from 'react-redux';

class VkWidget extends React.Component {

    componentDidMount() {
        let s = document.createElement(`script`);
        s.id="vks";
        s.textContent = `VK.Widgets.Group("vk_groups", {mode: 1}, 171372561);`;
        document.body.appendChild(s);
    }

    componentWillUnmount() {
        $("#vks").remove();        
    }

    render() {
        return (
            <div id="vk">
                <div id="vk_groups"></div>
            </div>
        )
    }
}

function preventDefault(e) {
    e.preventDefault();
}

const Menu = ({className, size}) => (
    size === "xl+" || size === "xl" || size === "lg" ? 
        <div className={className}>
            <div className={`list`}>
                <a onClick={preventDefault} href="/тренажер/игра">Игра</a>
                <a onClick={preventDefault} href="/тренажер/мажор-минор">Мажор / минор</a>
                <a onClick={preventDefault} href="/тренажер/ноты">Ноты</a>
                <a onClick={preventDefault} href="/тренажер/интервалы">Интервалы</a>
                <a onClick={preventDefault} href="/тренажер/трезвучия">Трезвучия</a>
                <a onClick={preventDefault} href="/тренажер/диктант">Диктант</a>
            </div> 
            <br/>
            <br/>
            <div className={`list`}>
                <a href="/donation">Помощь сайту</a>
                <a href="/книги">Онлайн книги</a>
            </div> 
            <br/>
            <br/>
            <VkWidget/>
        </div>
    :
        ''
);


const ConnectedMenu = connect(
    (state) => (
    {
        size: state.sound.get("size")
    }),
    null
)(Menu);  

export default styled(ConnectedMenu)`
    position: absolute;
    z-index: 2;

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