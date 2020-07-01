import React from 'react';
import {useSelector} from 'react-redux';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {Stage, Layer, Rect, Text, Arrow, Line} from 'react-konva';

import {Store} from '../redux/store';
import {VigaReducer} from '../redux/reducers/viga';

const Viga = () => {
  const classes = useStyles();

  const {length: vigaLength} = useSelector<Store, VigaReducer>(state => state.viga);

  return (
    <Stage className={classes.display} width={vigaLength ? 1100 : 0} height={vigaLength ? 600 : 0}>
      <Layer className={classes.viga}>
        <Rect x={50} y={280} width={1000} height={20} fill="red" />

        <Line x={50} y={550} points={[0, 0, 1000, 0]} stroke="black" />

        <Line x={50} y={530} points={[0, 0, 0, 40]} stroke="black" />
        <Text x={45} y={580} text="0" fontSize={16} />

        <Line x={550} y={530} points={[0, 0, 0, 40]} stroke="black" />
        <Text x={540} y={580} text={(vigaLength / 2).toString()} fontSize={16} />

        <Line x={1050} y={530} points={[0, 0, 0, 40]} stroke="black" />
        <Text x={1030} y={580} text={vigaLength.toString()} fontSize={16} />
      </Layer>
    </Stage>
  );
};

export default Viga;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    display: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      width: '100%',
      height: '100%',
      border: '1px solid black',
      background: 'pink',
    },
    viga: {},
  })
);
