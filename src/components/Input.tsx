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

import Panel from './Panel';
import {Store} from '../redux/store';
import {VigaReducer} from '../redux/reducers/viga';

const Input = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {length: vigaLength} = useSelector<Store, VigaReducer>(state => state.viga);

  const [open, setOpen] = useState(false);
  const [possibleVigaLength, setPossibleVigaLength] = useState('');

  const handleTextField = (length: string) => {
    setPossibleVigaLength(length);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleExcluirViga = () => {
    const action = {
      type: 'SET_LENGTH',
      payload: {
        length: 0,
      },
    };

    dispatch(action);
  };

  const handleCriarViga = () => {
    const vigaLength = parseFloat(possibleVigaLength);

    const action = {
      type: 'SET_LENGTH',
      payload: {
        length: Math.abs(vigaLength),
      },
    };

    dispatch(action);
    setOpen(false);
  };

  return (
    <Box className={classes.input}>
      {vigaLength ? (
        <Box className={classes.menu}>
          {[
            {
              label: 'Apoios',
              description: 'Apoios são ...',
              options: ['1° Gênero', '2° Gênero', '3° Gênero'],
            },
            {
              label: 'Cargas Distribuídas',
              description: 'Cargas distribuídas são ...',
              options: ['Constante', 'Linear'],
            },
            {
              label: 'Cargas Concentradas',
              description: 'Cargas concentradas são ...',
              options: ['Momento', 'Força'],
            },
          ].map(e => (
            <Panel label={e.label} description={e.description} options={e.options} />
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
          <TextField
            autoFocus
            label="Comprimento da viga"
            type="number"
            value={possibleVigaLength}
            onChange={e => handleTextField(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCriarViga}>Criar</Button>
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
