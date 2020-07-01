import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import {Folder as FolderIcon, Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons';

import {Store} from '../redux/store';
import {VigaReducer} from '../redux/reducers/viga';

const ElementsList = () => {
  const disṕatch = useDispatch();
  const {elements} = useSelector<Store, VigaReducer>(state => state.viga);

  const handleDeleteElement = (id: string) => {
    const action = {
      type: 'DEL_ELEMENT',
      payload: {
        elementID: id,
      },
    };

    disṕatch(action);
  };

  return (
    <List>
      {elements.map(e => (
        <ListItem key={e.id}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>

          <ListItemText primary={`${e.customName || e.type} (${e.specificType})`} />

          <ListItemSecondaryAction>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => handleDeleteElement(e.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ElementsList;
