describe("getMageImageFile", function () {
  it("returns the fire image for fire", function () {
    expect(getMageImageFile("fire")).toBe("mage-fire-sheet.png");
  });

  it("returns the ice image for ice", function () {
    expect(getMageImageFile("ice")).toBe("mage-ice-sheet.png");
  });

  it("returns the mind image for mind", function () {
    expect(getMageImageFile("mind")).toBe("mage-mind-sheet.png");
  });

  it("falls back to fire for an unknown type", function () {
    expect(getMageImageFile("water")).toBe("mage-fire-sheet.png");
  });

  it("falls back to fire when no type is given", function () {
    expect(getMageImageFile()).toBe("mage-fire-sheet.png");
  });
});
