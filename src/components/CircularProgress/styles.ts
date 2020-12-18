import styled from 'styled-components/native';

export const Container = styled.View`
  width: 200;
  height: 200;
  border-width: 20;
  border-radius: 100;
  border-color: #3498db;
  justify-content: center;
  align-items: center;
`;

export const FirstProgressView = styled.View`
  width: 200;
  height: 200;
  border-width: 20;
  border-radius: 100;
  position: absolute;
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-right-color: #3498db;
  border-top-color: #3498db;
`;

export const SecondProgressView = styled.View`
  width: 200;
  height: 200;
  border-width: 20;
  border-radius: 100;
  position: absolute;
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-right-color: #3498db;
  border-top-color: #3498db;
`;

export const OffsetView = styled.View`
  width: 200;
  height: 200;
  border-width: 20;
  border-radius: 100;
  position: absolute;
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-right-color: grey;
  border-top-color: grey;
`;
