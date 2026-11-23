function ListaStrings() {
  const tecnologias: string[] = ["React", "TypeScript", "Tailwind CSS", "Vite"];


  return (
    <div>
      <h2>Tecnologías</h2>
      <ul>
        {tecnologias.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


export default ListaStrings;