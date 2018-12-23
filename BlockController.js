const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const BlockChain = require('./BlockChain.js')
const Joi = require('joi');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.blocks = new BlockChain.Blockchain();
        //this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.server.route({
            method: 'GET',
            path: '/api/block/{index}',
            
            options: {
                validate: {
                        params: {
                            index: Joi.number().integer().min(0).required()
                    }
                }
            },
            handler: async (request, h) => {
                const result = await this.blocks.getBlock(request.params.index);
                return JSON.stringify(result).toString();
            }
        })
    }
    

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.server.route({
            method: 'POST',
            path: '/api/block',
            options: {
                validate: {
                    payload: {
                        data: Joi.string().min(1).required() 
                    }
                }
            },
            handler: (request, h) => {
                let blockAux = new BlockClass.Block(request.payload.data);
                blockAux.height = this.blocks.length;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.addBlock(blockAux); 
                return `Successfully added ${JSON.stringify(blockAux).toString()} at ${blockAux.height}`;
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
            (function theLoop (i) {
                setTimeout(function () {
                    let blockTest = new Block.Block("Test Block - " + (i + 1));
                    // Be careful this only will work if your method 'addBlock' in the Blockchain.js file return a Promise
                    this.blocks.addBlock(blockTest).then((result) => {
                        console.log(result);
                        console.log(`added block ${i++}`);
                        if (i < 10) theLoop(i);
                    });
                }, 5000);
              })(0);
        }
    }


}

/**
 * Exporting the BlockController class
 * @param {*} server 
 */
module.exports = (server) => { return new BlockController(server);}