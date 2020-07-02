import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';
import {Folder as FolderIcon, Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons';

import {Store} from '../redux/store';
import {VigaReducer} from '../redux/reducers/viga';

const ElementsList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const {length: vigaLength, elements} = useSelector<Store, VigaReducer>(state => state.viga);

  const [errorMessage, setErrorMessage] = useState('');
  const [customName, setCustomName] = useState('');
  const [position, setPosition] = useState(0);
  const [selfIndex, setSelfIndex] = useState<null | number>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof selfIndex !== 'number') return;
    const element = elements[selfIndex];

    setCustomName(element.customName);
    setPosition(element.position);
  }, [selfIndex]);

  const handleOpen = (i: number) => {
    setSelfIndex(i);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeCustomName = (name: string) => {
    setCustomName(name);
  };

  const handleChangePosition = (position: string) => {
    let positionNumeric = parseFloat(position);

    if (typeof positionNumeric !== 'number') return;
    if (isNaN(positionNumeric)) positionNumeric = 0;

    setPosition(positionNumeric);
  };

  const handleEditElement = () => {
    if (typeof selfIndex !== 'number') return;

    const element = elements[selfIndex];

    const action = {
      type: 'EDIT_ELEMENT',
      payload: {
        element: {
          ...element,
          customName,
          position,
        },
        selfIndex,
      },
    };

    const isPositionAvailable = !elements
      .filter(e => e.id !== element.id)
      .some(e => e.position === position);

    if (!isPositionAvailable) {
      setErrorMessage('Dois apoios não podem ocupar a mesma posição');

      return;
    }

    if (position <= vigaLength && position >= 0) {
      dispatch(action);
      setOpen(false);
      setErrorMessage('');

      return;
    } else {
      setErrorMessage('A posição do elemento não deve ser maior que o comprimento da viga');

      return;
    }
  };

  const handleDeleteElement = (id: string) => {
    const action = {
      type: 'DEL_ELEMENT',
      payload: {
        elementID: id,
      },
    };

    dispatch(action);
  };

  return (
    <>
      <Box className={classes.container}>
        <Typography className={classes.title}>Lista de elementos da viga</Typography>

        <List className={classes.listContainer}>
          {elements.map((e, i) => (
            <ListItem key={e.id}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={`${e.customName || e.type} (${e.specificType})`} />

              <ListItemSecondaryAction>
                <IconButton onClick={() => handleOpen(i)} aria-label="edit">
                  <EditIcon />
                </IconButton>

                <IconButton onClick={() => handleDeleteElement(e.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar o elemento</DialogTitle>

        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>

        <DialogContent>
          <TextField
            autoFocus
            label="Nome do elemento"
            type="text"
            value={customName}
            onChange={e => handleChangeCustomName(e.target.value)}
          />
        </DialogContent>

        <DialogContent>
          <TextField
            label="Posição do elemento"
            type="text"
            value={position}
            onChange={e => handleChangePosition(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditElement}>Salvar alterações</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ElementsList;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    listContainer: {
      width: '500px',
    },
    title: {
      margin: '10px 0px',
      fontSize: '14pt',
    },
  })
);
