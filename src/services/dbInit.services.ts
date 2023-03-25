import { userSchemaValidation } from "../models/user";
import { sellerSchemaValidation } from "../models/seller";
import { denizenDb } from "./database.services";

export const initDb = async () => {
    //User
    await denizenDb.db
        .createCollection(process.env.USER_COLLECTION_NAME)
        .then(async () => {
            await userSchemaValidation();
            console.log("Created collection < " + process.env.USER_COLLECTION_NAME + " >");
        })
        .catch((err) => {
            console.log(
                "Collection < " + process.env.USER_COLLECTION_NAME + " > already exist, skipping schema validation. ",
            );
        });
    
    //Seller
    await denizenDb.db
        .createCollection(process.env.SELLER_COLLECTION_NAME)
        .then(async () => {
            await sellerSchemaValidation();
            console.log("Created collection " + process.env.SELLER_COLLECTION_NAME);
        })
        .catch((err) => {
            console.log(
                "Collection < " + process.env.SELLER_COLLECTION_NAME + " > already exist, skipping schema validation. ",
            );
        });
};