import React from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

function App() {
  return (
    <Contenedor>
      <div><Imagen srce={imagen} /></div>
      <div></div>
    </Contenedor>
  );
}

export default App;
