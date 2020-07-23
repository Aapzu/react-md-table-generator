import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function DelimiterCell({ columnIndex }) {

  const isMultiMd           = useSelector(TableSelectors.isMultiMd())
  const maxColumnLength     = useSelector(TableSelectors.getMaxColumnLength(columnIndex));
  const maxColumnLineLength = useSelector(TableSelectors.getMaxColumnLineLength(columnIndex));
  const columnAlignment     = useSelector(TableSelectors.getColumnAlignment(columnIndex));
  const adjustWidth         = useSelector(TableSelectors.getAdjustWidth());

  let delimiters = '---';

  const maxLength = (isMultiMd && maxColumnLineLength) || maxColumnLength

  if (adjustWidth && maxLength > 3) {
    delimiters = Array(maxLength).fill('-').join('');
  }

  const leftAlign = (columnAlignment === 'left' || columnAlignment === 'center')? ':' : ' ';
  const rightAlign = (columnAlignment === 'right' || columnAlignment === 'center')? ':' : ' ';

  return (
    <span>|{leftAlign}{delimiters}{rightAlign}</span>
  );

}