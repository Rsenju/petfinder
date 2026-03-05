const OngCard = ({ ong }) => {
    return (
      <div className="border p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold">{ong?.name || "Nome da ONG"}</h3>
        <p>{ong?.city || "Cidade"}</p>
      </div>
    );
  };
  
  export default OngCard;