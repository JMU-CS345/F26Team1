//Mage types and which picture goes with each one.
//No p5 in this file so it can be tested with Jasmine.

let MAGE_TYPES = {
  fire: "mage-fire.png",
  ice: "mage-ice.png",
  mind: "mage-mind.png",
};

let DEFAULT_MAGE_TYPE = "fire";

//Returns the image file name for a mage type.
//If the type is unknown or missing it falls back to the fire mage.
function getMageImageFile(mageType) {
  if (MAGE_TYPES[mageType]) {
    return MAGE_TYPES[mageType];
  }
  return MAGE_TYPES[DEFAULT_MAGE_TYPE];
}
