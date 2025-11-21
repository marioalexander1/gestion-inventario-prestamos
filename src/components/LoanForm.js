import React, { useState } from 'react';

function LoanForm() {
  const [loan, setLoan] = useState({ itemId: '', user: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para registrar el préstamo (ej: enviar a API o estado global)
    console.log('Préstamo registrado:', loan);
    setLoan({ itemId: '', user: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Préstamo</h2>
      <input
        type="text"
        placeholder="ID del Ítem"
        value={loan.itemId}
        onChange={(e) => setLoan({ ...loan, itemId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Usuario"
        value={loan.user}
        onChange={(e) => setLoan({ ...loan, user: e.target.value })}
      />
      <input
        type="date"
        value={loan.date}
        onChange={(e) => setLoan({ ...loan, date: e.target.value })}
      />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default LoanForm;