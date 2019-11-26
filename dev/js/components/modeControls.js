import React from 'react';
import {connect} from 'react-redux';
import {Button, SettingsButton, HideSettingsButton, Column} from './common';

function setNotes() {
  window.store.dispatch({
    type: 'SAVE_NOTES'
  })
}

const ModeControls = ({mode, showSettings}) => {
    switch(mode) {
      case 'note':
        return (
          !showSettings ?
            <div className="row">
              <Button className="play" icon="play"> Играть ноту</Button>
              <SettingsButton ml={12} />
            </div>
          :
            <Column>
              <p>Выберите ноты на клавиатуре, которые вы хотите угадывать</p>
              <div className="row">
                <Button className="ok" icon="check" onClick={setNotes}>Применить</Button>
                <HideSettingsButton ml={12} />
              </div>
            </Column>
        );
      default:
        return null;
    }
};

export default connect((state) => ({
  mode: state.sound.mode,
  showSettings: state.sound.showSettings,
}))(ModeControls);
