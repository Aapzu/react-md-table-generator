import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as TableActions from '../../redux/actions/TableActions';
import * as TableSelectors from '../../redux/selectors/TableSelectors';

import Button from '../layout/Button';
import { FaTable } from 'react-icons/fa';

export default function ToggleMultiMdButton({ ...props }) {

  const dispatch = useDispatch();
  const toggleMultiMd = () => dispatch(TableActions.toggleMultiMd());

  const isMultiMd = useSelector(TableSelectors.isMultiMd());

  const Icon = <FaTable />;

  return (
    <Button icon={Icon} selected={isMultiMd} onClick={toggleMultiMd} {...props}>
      Use multi-md
    </Button>
  )
}
