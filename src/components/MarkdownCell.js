import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';

export default function MarkdownCell({ value, columnIndex }) {

  const adjustWidth     = useSelector(TableSelectors.getAdjustWidth());
  const isMultiMd       = useSelector(TableSelectors.isMultiMd())
  const maxColumnLength = useSelector(TableSelectors.getMaxColumnLength(columnIndex));
  const maxColumnLineLength = useSelector(TableSelectors.getMaxColumnLineLength(columnIndex))

  let extraSpaces = ' ';

  if (adjustWidth) {

    let length = (isMultiMd && maxColumnLineLength) || maxColumnLength

    length = Math.max(length, 3);

    const cellLength = (value && value.length) || 0;

    if (length - cellLength > 0) {
      extraSpaces += ' '.repeat(length - cellLength);
    }
  }

  return (
    <span>| {value}{extraSpaces}</span>
  );
}
