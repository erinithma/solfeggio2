import React from 'react';
import {connect} from 'react-redux';
import {Button, SettingsButton, HideSettingsButton, PlayButton, Column, InfoBox, Row} from './common';

function setNotes() {
  window.store.dispatch({
    type: 'SAVE_NOTES'
  })
}

const ModeControls = ({mode, showSettings, repeat}) => {
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
      default:
        return null;
    }
};

export default connect(({sound}) => ({
  mode: sound.mode,
  showSettings: sound.showSettings,
  repeat: sound.repeat,
}))(ModeControls);
