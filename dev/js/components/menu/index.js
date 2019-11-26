import React, {useState} from 'react';
import styled from 'styled-components';
import { smWidth, mdWidth, lgWidth, xlWidth } from '../../common';
import { connect } from 'react-redux';
import {Button} from '../common';
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
                <div id="vk_groups"></div>
            </div>
        )
    }
}

function preventDefault(e) {
    e.preventDefault();
}

const Menu = ({className, size}) => {
  const [isShow, setShow] = useState(false);
  
  return (
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
        <div className="piano-like">
          <div>
            <Button type="primary" onClick={() => setShow(!isShow)}>
              <img src={choose} width={16} height={16}/>
              Выбрать тренажер
            </Button>
            {
              isShow &&
              <div style={{marginTop: 12}}>
                <div className="grid">
                  <div className="item">
                    <a className="item__content" href="/тренажер/игра">
                      <img src="/assets/img/play.svg" alt="Игра" width="45" height="45" />
                        Игра
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content" href="/тренажер/мажор-минор">
                      <img src="/assets/img/mindur.svg" alt="Мажор / минор" width="45" height="45" />
                        Мажор / минор
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content" href="/тренажер/ноты">
                      <img src="/assets/img/note.svg" alt="Ноты" width="45" height="45" />
                        Ноты
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content" href="/тренажер/интервалы">
                      <img src="/assets/img/interval.svg" alt="Интервалы" width="45" height="45" />
                        Интервалы
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content" href="/тренажер/трезвучия">
                      <img src="/assets/img/accord.svg" alt="Трезвучия" width="45" height="45" />
                        Трезвучия
                    </a>
                  </div>
                  <div className="item">
                    <a className="item__content" href="/тренажер/диктант">
                      <img src="/assets/img/dictant.svg" alt="Диктант" width="45" height="45" />
                        Диктант
                    </a>
                  </div>
                </div>
              </div>  
            }
          </div>
        </div>
  );
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
    z-index: 2;

    @media (min-width: ${xlWidth}px){
        top: 20px;
        right: 0;
        width: 180px;
    }
    @media (max-width: ${xlWidth-1}px){
        top: 45px;
        right: 0;
        width: 180px;
    }
    @media (max-width: ${mdWidth-1}px){
        top: 180px;
        right: 0;
    }

    .list {
        width: 45%;
    }
`;