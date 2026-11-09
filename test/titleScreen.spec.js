
describe("Title Screen", function () {

  it("detects when the mouse is inside Start", function () {
    expect(isInsideStartButton(400, 450, 800, 600)).toBe(true);
  });

  it("detects when the mouse is outside Start", function () {
    expect(isInsideStartButton(0, 0, 800, 600)).toBe(false);
  });

  it("changes to mage selection when Start is clicked", function () {
    expect(getNextScreen("start", true)).toBe("mageSelect");
  });

  it("stays on Start when the button is not clicked", function () {
    expect(getNextScreen("start", false)).toBe("start");
  });

});
