function ListaStrings() {
  const tecnologias = ["Rect", "Typescript", "Node", "Java", ".NET"];
  return (
    <div>
      <h2>Tecnologias</h2>
      <ul>
        {tecnologias.map((item, index) => (
          <li key={item}>
            {item} en el indice {index}
          </li>
        ))
        }
      </ul>
    </div>
  );
}

export default ListaStrings;
