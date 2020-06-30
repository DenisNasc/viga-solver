import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons';

interface IPanel {
  label: string;
  description: string;
  options: string[];
}

const Panel = ({label, description, options}: IPanel) => {
  const classes = useStyles();
  return (
    <ExpansionPanel classes={{root: classes.panel}}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>{label}</ExpansionPanelSummary>

      <ExpansionPanelActions>
        <ButtonGroup>
          {options.map(e => (
            <Button>{e}</Button>
          ))}
        </ButtonGroup>
      </ExpansionPanelActions>
    </ExpansionPanel>
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
