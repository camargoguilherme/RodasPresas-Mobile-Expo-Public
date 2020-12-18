import React from 'react';
import {
  Container,
  FirstProgressView,
  SecondProgressView,
  OffsetView,
} from './styles';

/**
 * Override styles that get passed from props
 * */
function propStyle(percent, base_degrees) {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{rotateZ: `${rotateBy}deg`}],
  };
}

function renderThirdLayer(percent) {
  if (percent > 50) {
    /**
     * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
     * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
     * before passing to the propStyle function
     * */
    return (
      <SecondProgressView
        style={[{transform: [{rotateZ: '45deg'}]}, propStyle(percent - 50, 45)]}
      />
    );
  }
  return <OffsetView style={{transform: [{rotateZ: '-135deg'}]}} />;
}

function CircularProgress({percent}) {
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <Container>
      <FirstProgressView
        style={[{transform: [{rotateZ: '-135deg'}]}, firstProgressLayerStyle]}
      />
      {renderThirdLayer(percent)}
    </Container>
  );
}

export default CircularProgress;
