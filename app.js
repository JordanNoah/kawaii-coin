const SHA256 = require('crypto-js/sha256')



class Block {

    constructor(index, timestamp, data, previousHash = '') {
 
        this.index = index;
 
        this.previousHash = previousHash;
 
        this.timestamp = timestamp;
 
        this.data = data;
 
        this.hash = this.computeHash();
 
        this.nonce = 0;
 
    }
 
    computeHash() {
 
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
 
    }
 
    mineBlock(complexity) {
 
        while (this.hash.substring(0, complexity) !== Array(complexity + 1).join('0')) {
 
            this.nonce++;
 
            this.hash = this.computeHash();
 
        }
 
        console.log('Mining is taking place: ' + this.hash);
 
    }
 
 }
 
 class Blockchain{
 
    constructor() {
 
        this.chain = [this.buildGenesisBlock()];
 
        this.complexity = 5;
 
    }
 
    buildGenesisBlock() {
 
        return new Block(0, '17/07/2018', 'genesis block', '0');
 
    }
 
    obtainLatestBlock() {
 
        return this.chain[this.chain.length -1];
 
    }
 
    addBlock(newBlock) {
 
        newBlock.previousHash = this.obtainLatestBlock().hash;
 
        newBlock.mineBlock(this.complexity);
 
        this.chain.push(newBlock);
 
    }
 
    confirmValidity() {
 
        for (let i = 1; i < this.chain.length; i++){
 
            const currentBlock = this.chain[i];
 
            const previousBlock = this.chain[i -1];
 
            if (currentBlock.hash !== currentBlock.computeHash()) {
 
                return false;
 
            }
 
            if (currentBlock.previousHash !== previousBlock.hash) {
 
                return false;
 
            }
 
        }
 
        return true;
 
    }
 
 }

let kawaii = new Blockchain()

console.log('<<Lets mine block 1>>');

kawaii.addBlock(new Block(1, '27/07/2018', { quantity: 10 }));

console.log('<<Lets mine block 2>>');

kawaii.addBlock(new Block(2, '27/07/2018', { quantity: 20 }));