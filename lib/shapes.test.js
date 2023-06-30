const { Triangle, Square, Circle } = require("../lib/shapes");

// Test if the triangle renders properly
test('Triangle renders properly', () => {
  const shape = new Triangle();
  shape.setColor('blue');
  expect(shape.render()).toEqual(
    '<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="blue"/>'
  );
});

// Test if the square renders properly
test('Square renders properly', () => {
  const shape = new Square();
  shape.setColor('blue');
  expect(shape.render()).toEqual(
    '<rect x="50" height="200" width="200" fill="blue"/>'
  );
});

// Test if the circle renders properly
test('Circle renders properly', () => {
  const shape = new Circle();
  shape.setColor('blue');
  expect(shape.render()).toEqual(
    '<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="blue"/>'
  );
});
