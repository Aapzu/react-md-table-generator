import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import * as TableActions from '../redux/actions/TableActions';
import { TABLE_SAMPLE } from '../constants/TableConstants';
import * as SettingsSelectors from '../redux/selectors/SettingsSelectors';

import Table from "../components/Table";
import MarkdownTable from "../components/MarkdownTable";

import '../styles/MainEditor.scss';
import AlignButton from '../components/toolbar/AlignButton';
import AdjustWidthButton from '../components/toolbar/AdjustWidthButton';
import ToggleFullscreenButton from '../components/toolbar/ToggleFullscreenButton';
import ImportMarkdownModal from './ImportMarkdownModal';
import ToggleMultiMdButton from "../components/toolbar/ToggleMultiMdButton"

export default function MainEditor() {

  const editorPaneRef = useRef();
  const markdownPaneRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => { dispatch(TableActions.importMarkdownTable(TABLE_SAMPLE)) }, [dispatch]);
  
  const clearActiveCell = e => {
    
    if (e.target === editorPaneRef.current || e.target === markdownPaneRef.current) {
      dispatch(TableActions.clearActiveCell());
    }
  }

  const isFullscreen = useSelector(SettingsSelectors.isFullscreen());

  return (
    <div className={classnames('main-editor', {'main-editor-windowed': !isFullscreen})}>

      <div className='toolbar'>
        
        <div className='main-buttons'>
          <AlignButton alignment='left' />
          <AlignButton alignment='center' />
          <AlignButton alignment='right' />

          <ToggleMultiMdButton />

          <AdjustWidthButton />
        </div>

        <ToggleFullscreenButton type='flat' />
        
      </div>

      <div className='pane-view'>
        <div className='editor-pane' ref={editorPaneRef} onMouseDown={clearActiveCell}><Table /></div>
        <div className='markdown-pane' ref={markdownPaneRef} onMouseDown={clearActiveCell}><MarkdownTable /></div>
      </div>
      
      <ImportMarkdownModal />
    </div>
  );
}