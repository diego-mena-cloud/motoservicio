function Loading() {
  return (
    <div className="flex justify-center items-center p-6" role="status">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

export default Loading;
