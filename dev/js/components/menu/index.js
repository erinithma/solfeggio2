import React, {useState} from 'react';
import styled from 'styled-components';
import { smWidth, mdWidth, lgWidth, xlWidth } from '../../common';
import { connect } from 'react-redux';
import {Button, Column} from '../common';
import choose from './choose.svg';

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
                <div id="vk_groups" />
            </div>
        )
    }
}

function setMode(e, mode) {
    e.preventDefault();
    window.store.dispatch({
      type: 'SET_MODE',
      payload: {
        mode
      }
    })
}

const Menu = ({className, size, mode}) => {
  const [isShow, setShow] = useState(false);
  
  return (
    size === "xl+" || size === "xl" || size === "lg" ? 
        <div className={className}>
            <div className={`list`}>
                <a onClick={(e) => setMode(e, 'play')} className={`${mode === 'play' ? 'active' : ''}`} href="/тренажер/игра">Игра</a>
                <a onClick={(e) => setMode(e, 'mindur')} className={`${mode === 'mindur' ? 'active' : ''}`} href="/тренажер/мажор-минор">Мажор / минор</a>
                <a onClick={(e) => setMode(e, 'note')} className={`${mode === 'note' ? 'active' : ''}`} href="/тренажер/ноты">Ноты</a>
                <a onClick={(e) => setMode(e, 'play')} href="/тренажер/интервалы">Интервалы</a>
                <a onClick={(e) => setMode(e, 'play')} href="/тренажер/трезвучия">Трезвучия</a>
                <a onClick={(e) => setMode(e, 'play')} href="/тренажер/диктант">Диктант</a>
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
        <div className="piano-like">
          <div>
            <Button type="primary" onClick={() => setShow(!isShow)}>
              <img src={choose} width={18} height={18}/>
              Выбрать тренажер
            </Button>
            {
              isShow &&
              <Column mt={12}>
                <div className="grid">
                  <div className="item">
                    <a className="item__content row" href="/тренажер/игра">
                      <span className={'icon-mode-play'}/>
                        Игра
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content row" href="/тренажер/мажор-минор">
                      <span className={'icon-mode-mindur'}/>
                        Мажор / минор
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content row" href="/тренажер/ноты">
                      <span className={'icon-mode-note'}/>
                        Ноты
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content row" href="/тренажер/интервалы">
                      <span className={'icon-mode-interval'}/>
                        Интервалы
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content row" href="/тренажер/трезвучия">
                      <span className={'icon-mode-accord'}/>
                        Трезвучия
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content row" href="/тренажер/диктант">
                      <span className={'icon-mode-dictant'}/>
                        Диктант
                    </a>
                  </div>
                </div>
              </Column>
            }
          </div>
        </div>
  );
}



const ConnectedMenu = connect(
    (state) => (
    {
        size: state.sound.get("size"),
        mode: state.sound.get('mode'),
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