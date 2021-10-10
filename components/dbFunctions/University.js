import firebase from "firebase";

export default function addUniversity(university){
    return new Promise(async (resolve, reject) => {

        const validator = Object.entries(university).find(prop => !prop[1].length)
        if (validator){
            return reject({message:'Alle felter skal udfyldes!'})
        }
        try {
            await firebase
                .database()
                .ref(`/Universities/`)
                .push({...university});
            return resolve();
        } catch (error) {
            console.log(error);
            return reject(`Error: ${error.message}`);
        }
    })
}