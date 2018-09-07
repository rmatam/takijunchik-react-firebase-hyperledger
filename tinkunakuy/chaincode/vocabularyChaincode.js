'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const winston = require('winston');
const IdCard = require('composer-common').IdCard;
const cardname = 'admin@tinkunakuy';
const networkNamespace = 'org.nemesis1346.tinkunakuy';
const LOG = winston.loggers.get('application');
const WordModel = require('../models/wordModel.js');
const ObjectModel =require('../models/objectModel.js');
class VocabularyChaincode {
    constructor() {
        try {
            //this.bizNetworkConnection = new BusinessNetworkConnection();
            //this.init();
        } catch (error) {
            console.log(error);
        }
    }

    /** 
     * @description Initalizes the Hyperstate Network by making a connection to the Composer runtime. Could be for ping?
     * @return {Promise} A promise whose fullfillment means the initialization has completed
     */
    async init() {
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardname);
        console.log(this.businessNetworkDefinition);
        LOG.info('tinkunakuy:<init>', 'businessNetworkDefinition obtained', this.businessNetworkDefinition.getIdentifier());
    }
    /**
     * @description It returns the list of all the words
     * @return {Promise} A promise that returns the list of all the words
     */
    async getAllWords() {
        try {
            let wordsList = [];
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname)
            let wordRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Word');
            let words = await wordRegistry.getAll();
            words.forEach(element => {
                let currentWord = new WordModel(
                    element.wordId,
                    element.spanish,
                    element.english,
                    element.kichwa,
                    element.descriptionSpanish,
                    element.descriptionEnglish,
                    element.descriptionKichwa
                );
                wordsList.push(currentWord);
            });
            return wordsList;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
     * @description It creates a new word
     * @return {Promise} A promise that creates a word
     */
    async saveWord(requestWord) {
        console.log('Request Word: ');
        console.log(requestWord);
        try {
            let wordModel = new WordModel(
                requestWord.wordId,
                requestWord.spanish,
                requestWord.english,
                requestWord.kichwa,
                requestWord.descriptionSpanish,
                requestWord.descriptionEnglish,
                requestWord.descriptionKichwa
            );

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Word');
            let factory = connection.getFactory();

            let word = factory.newResource(networkNamespace, "Word", wordModel.wordId);
            word.wordId = wordModel.wordId;
            word.spanish = wordModel.spanish;
            word.english = wordModel.english;
            word.kichwa = wordModel.kichwa;
            word.descriptionSpanish = wordModel.descriptionSpanish;
            word.descriptionEnglish = wordModel.descriptionEnglish;
            word.descriptionKichwa = wordModel.descriptionKichwa;
            await assetRegistry.add(word);
            await businessNetworkConnection.disconnect();
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
     /**
     * @description It creates a new object for storing linguistics project
     * @return {Promise} A promise that creates a object for storing linguistics project
     */
    async saveObject(requestObject) {
        console.log('Request Object: ');
        console.log(requestObject);
        try {
            let objectModel = new ObjectModel(
                requestObject.timeSlotId1,
                requestObject.timeSlotId2,
                requestObject.timeValue,
                requestObject.contentValue,
                requestObject.annotationId
            );

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Object');
            let factory = connection.getFactory();

            let object = factory.newResource(networkNamespace, "Object", objectModel.annotationId);
            object.timeSlotId1 = objectModel.timeSlotId1;
            object.timeSlotId2 = objectModel.timeSlotId2;
            object.timeValue = objectModel.timeValue;
            object.contentValue = objectModel.contentValue;
            object.annotationId = objectModel.annotationId;

            await assetRegistry.add(object);
            await businessNetworkConnection.disconnect();
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
module.exports = VocabularyChaincode;