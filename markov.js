/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    // TODO
    let chain = new Map();
    for (let i = 0; i < words.length; i++){
      if(chain.has(words[i]) === true){
        chain.get(words[i]).push(words[i+1])  ;
      } else {
        chain.set(words[i], [words[i+1]]);
      }
    }
    this.chain = chain;
  }

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    // pick a random key to begin
    let keys = Array.from(this.chain.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chain.get(key));
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine
};
