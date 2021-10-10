import firebase from "firebase";

export default function addEducation(education){
    return new Promise(async (resolve, reject) => {
        const validator = Object.entries(education).find(prop => !prop[1].length)
        if (validator){
            return reject({message:'Alle felter skal udfyldes!'})
        }
        try {
            let university = false;
            await firebase
                .database()
                .ref(`/Universities`)
                .child(education.universityId)
                .on('value', snapshot => {
                    university = snapshot.val()
                });
            if(!university){
                return reject('University does not exist')
            }

            await firebase
                .database()
                .ref('/Educations')
                .push(education);
            return resolve();
        } catch (error) {
            console.log(error);
            return reject(`Error: ${error}`);
        }
    })
}