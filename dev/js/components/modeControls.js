import React from 'react';
import {connect} from 'react-redux';
import {Button, SettingsButton, HideSettingsButton, PlayButton, Column, InfoBox, Row} from './common';

function setNotes() {
  window.store.dispatch({
    type: 'SAVE_NOTES'
  })
}

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
              <InfoBox mt={12}/>
            </Column>
          :
            <Column>
              <InfoBox mb={12} text="Выберите ноты на клавиатуре, которые вы хотите угадывать" />
              <Row>
                <Button className="ok" icon="check" onClick={setNotes}>Применить</Button>
                <HideSettingsButton ml={12} />
              </Row>
            </Column>
        );
      case 'mindur':
        return (
            <Column>
              <Row className="wrap">
                <PlayButton mb={12} disabled={check} text="Играть трезвучие" repeatText="Повторить" order={0}/>
                <Button mb={12} ml={12} disabled={!check} onClick={() => window.workPlace.check(1)} order={2}>Мажор</Button>
                <Button mb={12} ml={12} disabled={!check} onClick={() => window.workPlace.check(0)} order={3}>Минор</Button>
                <SettingsButton mb={12} ml={12} order={size === "sm" ? 1 : 4}/>
              </Row>
              <InfoBox />
            </Column>
        );
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
