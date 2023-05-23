export const queryBuilder = (queries: string[]) => {
  /*
   * Recibe un array de queries y las concatena en una sola
   * separadas por un ampersand (&)
   * Ejemplo:
   * ['populate=users', 'filter[user]=1234']
   * retorna: populate=users&filter[user]=1234
   * */
  return `?${queries.join('&')}`;
};
