import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, SettingsButton, PlayButton, Column, InfoBox, Row} from './common';
import Settings from './settings';

function setNotes() {
  window.store.dispatch({
    type: 'SAVE_NOTES'
  })
}

function setIntervals() {
  window.store.dispatch({
    type: 'SAVE_NOTES'
  })
}

const INTERVALS = [
  "Малая секунда",
  "Большая секунда",
  "Малая терция",
  "Большая терция",
  "Кварта",
  "Тритон",
  "Квинта",
  "Малая секста",
  "Большая секста",
  "Малая септима",
  "Большая септима",
  "Октава"
];

const Intervals = connect(({sound: {intervals}}) => ({intervals}))(({showSettings, check, size, intervals}) => {
  const [first, setFirst] = useState(true);
  return (
    !showSettings ?
      <Column className="align-start">
        <Row>
          <PlayButton text="Играть интервал" repeatText="Повторить" onClick={() => setFirst(false)}/>
          <SettingsButton ml={12} />
        </Row>
        <InfoBox mt={20}/>
        <div className="list list--small" style={{marginTop: 12}}>
          {
            !first ? INTERVALS.map( (v, i) => (
              <a
                key={i}
                href={'#'}
                onClick={(e) => {e.preventDefault(); window.workPlace.check( i + 1 );}}
                className={`${intervals && intervals.find( v => v[0] === i + 1) ? (intervals.find( v => v[0] === i + 1)[1] ? 'success' : 'error') : ''}`}
              >
                {v} ({i + 1})
              </a>
            )) : null
          }
        </div>
      </Column>
      :
      <Settings onClick={setIntervals}>
        <InfoBox mb={12} text="Выберите интервалы, которые вы хотите угадывать" />
      </Settings>
  )
});

const ModeControls = ({mode, showSettings, check, size}) => {
    switch(mode) {
      case 'note':
        return (
          !showSettings ?
            <Column>
              <Row>
                <PlayButton text="Играть ноту" repeatText="Повторить"/>
                <SettingsButton ml={12} />
              </Row>
              <InfoBox mt={20}/>
            </Column>
          :
            <Settings onClick={setNotes}>
              <InfoBox mb={12} text="Выберите ноты на клавиатуре, которые вы хотите угадывать" />
            </Settings>

        );
      case 'mindur':
        return (
          !showSettings ?
            <Column>
              <Row className="wrap">
                <PlayButton mb={12} disabled={check} text="Играть трезвучие" repeatText="Повторить" order={0}/>
                <div className="button-group" style={{order: 2}}>
                  <Button mb={12} ml={12} disabled={!check} onClick={() => window.workPlace.check(1)}>Мажор</Button>
                  <Button mb={12} disabled={!check} onClick={() => window.workPlace.check(0)}>Минор</Button>
                </div>
                <SettingsButton mb={12} ml={12} order={size === "sm" ? 1 : 3}/>
              </Row>
              <InfoBox />
            </Column>
            :
            <Settings />
        );
      case 'interval':
        return <Intervals showSettings={showSettings} check={check} size={size} />
      default:
        return null;
    }
};

export default connect(({sound}) => ({
  mode: sound.mode,
  showSettings: sound.showSettings,
  repeat: sound.repeat,
  check: sound.check,
  size: sound.size,
}))(ModeControls);
