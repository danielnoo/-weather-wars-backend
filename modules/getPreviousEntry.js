
const Entry = require("../models/entry");


// this module is run in getAndPostData.js and is meant to get the previous DB entry so that a score can be tallied in the object return of each individual api call


const getLastEntry = async () => {
  // const entries = await Entry.find({}).sort({ _id: -1 });

  

  const num = 4.9444444

  console.log(parseFloat(num.toFixed(1)));
  return {

  }
}

module.exports = getLastEntry;
