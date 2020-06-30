import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Konva from 'konva';
import {Stage, Layer, Rect, Text, Circle, Line} from 'react-konva';

const Viga = () => {
  const classes = useStyles();
  return (
    <Stage className={classes.display} width={1100} height={600}>
      <Layer className={classes.viga}>
        <Rect x={50} y={280} width={1000} height={20} fill="red" />

        <Line x={50} y={550} points={[0, 0, 1000, 0]} stroke="black" />

        <Line x={50} y={530} points={[0, 0, 0, 40]} stroke="black" />
        <Text x={45} y={580} text="0" fontSize={16} />

        <Line x={550} y={530} points={[0, 0, 0, 40]} stroke="black" />
        <Text x={540} y={580} text="500" fontSize={16} />

        <Line x={1050} y={530} points={[0, 0, 0, 40]} stroke="black" />
        <Text x={1030} y={580} text="1000" fontSize={16} />
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
