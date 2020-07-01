import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import uid from 'uid';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons';
import {Store} from '../redux/store';
import {VigaReducer} from '../redux/reducers/viga';

interface IPanel {
  label: string;
  type: string;
  description: string;
  options: string[];
}

const Panel = ({label, type, description, options}: IPanel) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {length: vigaLength} = useSelector<Store, VigaReducer>(state => state.viga);

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [position, setPosition] = useState(0);
  const [specificType, setSpecificType] = useState('');

  const handleOpen = (e: string) => {
    setSpecificType(e.toLowerCase());
    setOpen(true);
  };

  const handleClose = () => {
    setSpecificType('');
    setOpen(false);
  };

  const handleCreateElement = () => {
    const action = {
      type: 'ADD_ELEMENT',
      payload: {
        element: {
          id: `${type}-${uid()}`,
          type,
          specificType,
          customName: '',
          position,
          isActive: true,
        },
      },
    };

    if (position <= vigaLength && position >= 0) {
      dispatch(action);
      setOpen(false);
      setPosition(0);
      setSpecificType('');
      setErrorMessage('');
    } else {
      setErrorMessage('A posição do elemento não deve ser maior que o comprimento da viga');
    }
  };

  const handleChangePosition = (position: string) => {
    const positionNumeric = parseFloat(position);

    if (typeof positionNumeric === 'number') {
      setPosition(positionNumeric);
    } else {
      setErrorMessage('A posição do elemento deve ser um número');
    }
  };

  return (
    <>
      <ExpansionPanel classes={{root: classes.panel}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>{label}</ExpansionPanelSummary>

        <ExpansionPanelActions>
          <ButtonGroup>
            {options.map(e => (
              <Button key={e} onClick={() => handleOpen(e)}>
                {e}
              </Button>
            ))}
          </ButtonGroup>
        </ExpansionPanelActions>
      </ExpansionPanel>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Posição do elemento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Insira a posição do elemento (0 < x < ${vigaLength})`}
          </DialogContentText>

          <DialogContentText>{errorMessage}</DialogContentText>

          <TextField
            autoFocus
            label="Posição do elemento"
            type="number"
            value={position}
            onChange={e => handleChangePosition(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCreateElement}>Criar elemento</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Panel;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panel: {
      width: '400px',
      maxHeight: '130px',
    },
  })
);
