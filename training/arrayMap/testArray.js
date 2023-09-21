console.log("yes");

const MUSIC = [
  { id:"band-00", name:"Water of Love", artist:"Dire Straits", album:"Water of Love" },
  { id:"band-01", name:"Reconsider Baby", artist:"Eric Clapton", album:"From the Cradle" },
  { id:"band-02", name:"Standin' Round Crying", artist:"Eric Clapton", album:"From the Cradle" },
  { id:"band-03", name:"Sultans of Swing", artist:"Dire Straits", album:"Water of Love" },
  { id:"band-04", name:"Groaning The Blues", artist:"Eric Clapton", album:"From the Cradle" },
  { id:"band-05", name:"Sinner's Prayer", artist:"Eric Clapton", album:"From the Cradle" },
  { id:"band-06", name:"Wild West", artist:"Dire Straits", album:"Water of Love" },
  { id:"band-07", name:"Lions", artist:"Dire Straits", album:"Water of Love" },
]

//console.log(MUSIC);
console.log();
console.log(MUSIC[2].name);
console.log();
console.log(MUSIC[5].artist);
console.log();
console.log(MUSIC[7].album);

console.log("======================");

//MUSIC.forEach(name => console.log(MUSIC {name}));

const MAP = MUSIC.map(x => x.name);
console.log(MAP);