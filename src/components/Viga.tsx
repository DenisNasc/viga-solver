import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {Stage, Layer, Rect, Text, Arrow, Line, Circle, Arc} from 'react-konva';

import {Store} from '../redux/store';
import {VigaReducer} from '../redux/reducers/viga';

import {element} from '../redux/reducers/viga';

const Viga = () => {
  const classes = useStyles();

  const {length: vigaLength, elements} = useSelector<Store, VigaReducer>(state => state.viga);

  const [scaleFactor, setScaleFactor] = useState(0);

  const [apoioElements1, setApoioElements1] = useState<element[]>([]);
  const [apoioElements2, setApoioElements2] = useState<element[]>([]);
  const [apoioElements3, setApoioElements3] = useState<element[]>([]);

  useEffect(() => {
    if (vigaLength > 0) {
      setScaleFactor(1000 / vigaLength);
    }
  }, [vigaLength]);

  useEffect(() => {
    setApoioElements1(elements.filter(e => e.specificType === '1° gênero'));
    setApoioElements2(elements.filter(e => e.specificType === '2° gênero'));
    setApoioElements3(elements.filter(e => e.specificType === '3° gênero'));
  }, [elements]);

  return (
    <Stage className={classes.display} width={vigaLength ? 1100 : 0} height={vigaLength ? 600 : 0}>
      <Layer className={classes.viga}>
        <Rect x={50} y={280} width={1000} height={20} fill="red" />
      </Layer>

      <Layer>
        <Line x={50} y={550} points={[0, 0, 1000, 0]} stroke="black" />

        <Line x={50} y={530} points={[0, 0, 0, 40]} stroke="black" />
        <Text x={45} y={580} text="0" fontSize={16} />

        <Line x={550} y={530} points={[0, 0, 0, 40]} stroke="black" />
        <Text x={540} y={580} text={(vigaLength / 2).toString()} fontSize={16} />

        <Line x={1050} y={530} points={[0, 0, 0, 40]} stroke="black" />
        <Text x={1030} y={580} text={vigaLength.toString()} fontSize={16} />
      </Layer>

      <Layer>
        {apoioElements1.map(e => (
          <React.Fragment key={e.id}>
            <Circle x={e.position * scaleFactor + 50} y={300} radius={5} fill="green" />
            <Arrow
              x={e.position * scaleFactor + 50}
              y={300}
              points={[0, 0, 0, -30]}
              stroke="black"
              fill="black"
            />
          </React.Fragment>
        ))}
      </Layer>

      <Layer>
        {apoioElements2.map(e => (
          <React.Fragment key={e.id}>
            <Circle x={e.position * scaleFactor + 50} y={300} radius={5} fill="red" />
            <Arrow
              x={e.position * scaleFactor + 50}
              y={300}
              points={[0, 0, 0, -30]}
              stroke="black"
              fill="black"
            />
            <Arrow
              x={e.position * scaleFactor + 50}
              y={300}
              points={[0, 0, 30, 0]}
              stroke="black"
              fill="black"
            />
          </React.Fragment>
        ))}
      </Layer>

      <Layer>
        {apoioElements3.map(e => (
          <React.Fragment key={e.id}>
            <Circle x={e.position * scaleFactor + 50} y={300} radius={5} fill="blue" />
            <Arrow
              x={e.position * scaleFactor + 50}
              y={300}
              points={[0, 0, 0, -30]}
              stroke="black"
              fill="black"
            />
            <Arrow
              x={e.position * scaleFactor + 50}
              y={300}
              points={[0, 0, 30, 0]}
              stroke="black"
              fill="black"
            />

            <Arc
              x={e.position * scaleFactor + 50}
              y={300}
              angle={270}
              innerRadius={30}
              outerRadius={30}
              stroke="black"
              strokeWidth={1}
            />
          </React.Fragment>
        ))}
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
