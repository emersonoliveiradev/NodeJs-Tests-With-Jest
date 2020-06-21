function soma(a, b) {
  return a + b;
}

test('Se eu enviar 4 e 5, deve ser retornado 9', () => {
  const result = soma(4, 5);

  expect(result).toBe(9);
});
