describe("snapshots capturan el valor inicial", () => {
  const something = { key: "valu" };

  it("guardamos el valor", () => {
    expect(something).toMatchSnapshot();
    something.nuevaKey = "nuevoVal2or";
    expect(something).toMatchSnapshot();
  });

  // it("mutamos el valor", () => {
  //   expect(something).toMatchSnapshot();
  // });
});
