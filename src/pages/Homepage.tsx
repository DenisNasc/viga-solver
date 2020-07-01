import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

import Viga from '../components/Viga';
import Input from '../components/Input';
import ElementsList from '../components/ElementsList';

const Homepage = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={2}
      className={classes.gridContainer}
    >
      <Grid
        container
        item
        xs={8}
        justify="center"
        alignItems="center"
        className={classes.gridDisplay}
      >
        <Viga />
      </Grid>

      <Grid
        container
        item
        direction="column"
        alignItems="center"
        xs={4}
        className={classes.gridInputElementsList}
      >
        <Grid
          xs={8}
          container
          item
          justify="center"
          alignItems="center"
          className={classes.gridInput}
        >
          <Input />
        </Grid>

        <Grid
          xs={4}
          container
          item
          justify="center"
          alignItems="center"
          className={classes.gridElementsList}
        >
          <ElementsList />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Homepage;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      width: '100vw',
      height: '100vh',
    },
    gridDisplay: {
      minWidth: '700px',
      minHeight: '400px',
      width: '100%',
      height: '100%',
      border: '1px solid black',
    },
    gridInputElementsList: {
      width: '100%',
      height: '100%',
      border: '1px solid black',
    },
    gridInput: {
      border: '1px solid black',

      maxWidth: '100%',
    },
    gridElementsList: {
      border: '1px solid black',
      maxWidth: '100%',
      overflowY: 'scroll',
    },
  })
);
