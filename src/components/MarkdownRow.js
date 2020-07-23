import React from 'react';
import { useSelector } from 'react-redux';
import * as TableSelectors from '../redux/selectors/TableSelectors';
import MarkdownCell from './MarkdownCell';

export default function MarkdownRow({ rowIndex }) {

  const isMultiMd = useSelector(TableSelectors.isMultiMd())

  const columnCount = useSelector(TableSelectors.getColumnCount());

  const rowValues = useSelector(TableSelectors.getRowValues(rowIndex, { removeLastBR: true }))

  const grid = Array(columnCount).fill().map((_, i) => {
    const value = rowValues.get(i)
    if (isMultiMd) {
      const vals = (value || "").split("<br>")
      return vals.map((_, j) => {
        const lineValue = vals[j]
        return (
          <MarkdownCell key={i} value={lineValue} columnIndex={i} />
        )
      })
    } else {
      return [
        <MarkdownCell key={i} value={value} columnIndex={i} />
      ]
    }
  });

  const maxRows = Math.max(...grid.map(values => values.length))

  return Array(maxRows).fill().map((_, i) => (
    <div>
      { Array(columnCount).fill().map((_, j) => {
        return (
          grid[j][i] || <MarkdownCell key={"" + i + j} value={""} columnIndex={j} />
        )
      })}
      {' '}|
      {i < maxRows - 1 && " \\"}
    </div>
  ))
};
