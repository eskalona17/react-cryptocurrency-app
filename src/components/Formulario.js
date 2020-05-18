import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Error from './Error'
import useMoneda from "../hooks/useMoneda";
import useCryptoMoneda from "../hooks/useCryptoMoneda";

import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda, guardarCriptoMoneda}) => {
  //state del listado de criptomonedas
  const [listadocripto, guardarCriptomonedas] = useState([]);

  //state de los errores
  const [error, guardarError] = useState(false);
  const MONEDAS = [
    {
      codigo: "USD",
      nombre: "Dolar de Estados Unidos",
    },
    {
      codigo: "MXN",
      nombre: "Peso Mexicano",
    },
    {
      codigo: "EUR",
      nombre: "Euro",
    },
    {
      codigo: "GBP",
      nombre: "Libra Esterlina",
    },
  ];

  //utilizamos useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

  //utilizamos useCryptoMoneda
  const [cryptomoneda, SelectCrypto] = useCryptoMoneda(
    "Elige tu CryptoMoneda",
    "",
    listadocripto
  );

  //ejecutar llamada a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const URL =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(URL);
      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  //cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    //validar si ambos campos estan llenos
    if (moneda === "" || cryptomoneda === "") {
      guardarError(true);
      return;
    }

    //pasar los datos al componente principal
    guardarError(false);
    guardarMoneda(moneda)
    guardarCriptoMoneda(cryptomoneda)
  };
  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios"></Error> : null}
      <SelectMonedas />
      <SelectCrypto />
      <Boton type="submit" value="Calcular"></Boton>
    </form>
  );
};

export default Formulario;
