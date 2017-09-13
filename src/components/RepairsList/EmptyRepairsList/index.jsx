import React from 'react';
import g from 'glamorous';

function EmptyRepairsList() {
  return (<g.Div
    height="100%"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    fontSize="1.8em"
  >
    <div>No repairs</div>
    <g.Button
      fontSize="1.2em"
      marginTop=".5em"
      padding=".5em 1em"
      backgroundColor="#0077dd"
      border="none"
      cursor="pointer"
      color="#222"
    >+</g.Button>
  </g.Div>);
}

export default EmptyRepairsList;
