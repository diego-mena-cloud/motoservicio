function ListaObjetos() {
  const tecnologias = [
    { nombre: "Rect", categoria: "Frontend", nivel: "Avanzado", activo: false },
    {
      nombre: "Typescript",
      categoria: "Lenguaje",
      nivel: "Avanzado",
      activo: true,
    },
    { nombre: "Node", categoria: "Backend", nivel: "Intermedio", activo: true },
    {
      nombre: "Java",
      categoria: "Lenguaje",
      nivel: "Intermedio",
      activo: false,
    },
    { nombre: ".NET", categoria: "Backend", nivel: "Avanzado", activo: true },
    {
      nombre: "Python",
      categoria: "Lenguaje",
      nivel: "Avanzado",
      activo: true,
    },
    {
      nombre: "Angular",
      categoria: "Frontend",
      nivel: "Intermedio",
      activo: false,
    },
    { nombre: "Vue", categoria: "Frontend", nivel: "Intermedio", activo: true },
    { nombre: "Docker", categoria: "DevOps", nivel: "Avanzado", activo: true },
    {
      nombre: "Git",
      categoria: "Herramienta",
      nivel: "Avanzado",
      activo: false,
    },
  ];
  return (
    <div>
      <h2>Tecnologias</h2>
      <ul>
        {tecnologias.map((item) => (
          <li key={item.nombre}>
            {item.nombre}
            {
                item.activo ? (
                <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
                    Activo
                </span>
                ) : (
                <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                    Inactivo
                </span>
                )
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaObjetos;
