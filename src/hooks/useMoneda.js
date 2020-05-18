import React, {useState} from 'react';

const useMoneda = (label, stateInicial, opciones) => {

    //state de nuestro custom hook
    const [state, actualizarState] = useState(stateInicial)
    const Seleccionar = () => (
        <>
            <label htmlFor="">{label}</label>
            <select name="" id="">
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </select>
        </>
    )

    //retornar state, interfaz y fn que modifica el state
    return [state, Seleccionar, actualizarState]
}

export default useMoneda;
