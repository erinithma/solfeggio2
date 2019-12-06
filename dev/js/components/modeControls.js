import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, SettingsButton, PlayButton, Column, InfoBox, Row} from './common';
import Settings from './settings';
import storage from "../common/storage";
import {fill} from "../common";

function setNotes() {
  window.store.dispatch({
    type: 'SAVE_NOTES'
  })
}

function setIntervals(intervals) {
  window.store.dispatch({
    type: 'SAVE_INTERVALS',
    payload: {intervals}
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

const Intervals = connect(({sound: {options: intervals, showOptions}}) => ({intervals, showOptions}))(({showSettings, check, size, intervals, showOptions}) => {
  const [selected, setSelected] = useState(storage.get("interval").intervals || fill(60, false));

  return (
    !showSettings ?
      <Column className="align-start">
        <Row>
          <PlayButton text="Играть интервал" repeatText="Повторить" />
          <SettingsButton ml={12} />
        </Row>
        <InfoBox mt={20}/>
        <div className="list list--small" style={{marginTop: 12}}>
          {
           showOptions ? INTERVALS.map( (v, i) => (
              <a
                key={i}
                href={'#'}
                onClick={(e) => {e.preventDefault(); window.workPlace.check( i );}}
                className={`${intervals && intervals.find( v => v[0] === i) ? (intervals.find( v => v[0] === i)[1] ? 'success' : 'error') : ''}`}
              >
                {v} ({i + 1})
              </a>
            )) : null
          }
        </div>
      </Column>
      :
      <Settings onClick={() => setIntervals(selected)} onCancel={() => setSelected(storage.get("interval").intervals || fill(60, false))}>
        <InfoBox text="Выберите интервалы, которые вы хотите угадывать (не менее двух)" />
        <Column mt={12} mb={12} className="align-start">
          <div className="list list--small">
            {
              INTERVALS.map( (v, i) => (
                <a
                  key={i}
                  href={'#'}
                  onClick={(e) => {e.preventDefault(); const s = selected.slice(); s[i] = !s[i]; setSelected(s);}}
                  className={`${selected[i] ? 'active' : ''}`}
                >
                  {v} ({i + 1})
                </a>
              ))
            }
          </div>
        </Column>
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
              <InfoBox mb={12} text="Выберите ноты на клавиатуре, которые вы хотите угадывать (не менее двух)" />
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
