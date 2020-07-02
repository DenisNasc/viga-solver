import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';

import {options} from '../states';

import Panel from './Panel';
import {Store} from '../redux/store';
import {VigaReducer} from '../redux/reducers/viga';

const Input = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {length: vigaLength} = useSelector<Store, VigaReducer>(state => state.viga);

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [textFieldValue, setTextFieldValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTextFieldValue(0);
  };

  const handleTextField = (length: string) => {
    let vigaLength = parseFloat(length);

    if (typeof vigaLength !== 'number') return;
    if (isNaN(vigaLength)) vigaLength = 0;

    setTextFieldValue(vigaLength);
  };

  const handleExcluirViga = () => {
    const action = {
      type: 'DEL_VIGA',
    };

    dispatch(action);
    setTextFieldValue(0);
  };

  const handleCreateViga = () => {
    if (textFieldValue > 0) {
      const action = {
        type: 'SET_LENGTH',
        payload: {
          length: textFieldValue,
        },
      };

      setOpen(false);
      dispatch(action);
      setErrorMessage('');
    } else {
      setErrorMessage('O comprimento da viga deve ser maior que 0');
    }
  };

  return (
    <Box className={classes.input}>
      {vigaLength ? (
        <Box className={classes.menu}>
          {options.map(e => (
            <Panel
              key={e.label}
              label={e.label}
              type={e.type}
              description={e.description}
              options={e.options}
            />
          ))}

          <Button onClick={handleExcluirViga}>Excluir viga</Button>
        </Box>
      ) : (
        <Button onClick={handleOpen}>Criar uma viga</Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Comprimento da viga</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insira um valor para o comprimento da viga em metros
          </DialogContentText>

          <DialogContentText>{errorMessage}</DialogContentText>
          <TextField
            autoFocus
            label="Comprimento da viga"
            type="text"
            value={textFieldValue}
            onChange={e => handleTextField(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateViga}>Criar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Input;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menu: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);
