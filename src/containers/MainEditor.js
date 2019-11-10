import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../redux/actions/TableActions';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import { TABLE_SAMPLE } from '../constants/TableConstants';

import Table from "../components/Table";
import MarkdownTable from "../components/MarkdownTable";

import '../styles/MainEditor.scss';
import CellValueInput from '../components/CellValueInput';


export default function MainEditor() {

  const editorPaneRef = useRef();
  const markdownPaneRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => { dispatch(TableActions.importMarkdownTable(TABLE_SAMPLE)) }, [dispatch]);

  const activeColumn = useSelector(TableSelectors.getActiveColumn());
  
  const clearActiveCell = e => {
    
    if (e.target === editorPaneRef.current || e.target === markdownPaneRef.current) {
      dispatch(TableActions.clearActiveCell());
    }
  }

  const AddCode = e => {
    console.log(window.getSelection());

    const selection = window.getSelection();

    console.log(selection.anchorNode.parentNode.className);
    
    if (selection.anchorNode.parentNode.className === 'cell-value') {
      console.log('CELL!');

      dispatch(TableActions.formatActiveCell(selection.anchorOffset, selection.focusOffset, 'code'));
    }
  }

  const setColumnAlignment = alignment => dispatch(TableActions.setColumnAlignment(activeColumn, alignment));
  const alignLeft = () => setColumnAlignment('left');
  const alignCenter = () => setColumnAlignment('center');
  const alignRight = () => setColumnAlignment('right');

  return (
    <div className='main-editor'>
      <CellValueInput />
      <button onClick={AddCode}>Code</button>

      <button onClick={alignLeft}>Left</button>
      <button onClick={alignCenter}>Center</button>
      <button onClick={alignRight}>Right</button>

      <div className='pane-view'>
        <div className='editor-pane' ref={editorPaneRef} onMouseDown={clearActiveCell}><Table /></div>
        <div className='markdown-pane' ref={markdownPaneRef} onMouseDown={clearActiveCell}><MarkdownTable /></div>
      </div>
    </div>
  );
}