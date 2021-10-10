import firebase from "firebase";

export default function addPost(post){
    return new Promise(async (resolve, reject) => {
        const validator = Object.entries(post).find(prop => !prop[1].length)
        if (validator){
            return reject({message:'Alle felter skal udfyldes!'})
        }
        try {
            let education = false;
            await firebase
                .database()
                .ref(`/Educations/`)
                .child(post.educationId)
                .on('value', snapshot => {
                    education = snapshot.val()
                });
            if(!education){
                return reject('University does not exist')
            }

            await firebase
                .database()
                .ref('/Posts')
                .push(post);
            return resolve();
        } catch (error) {
            console.log(error);
            return reject(`Error: ${error}`);
        }
    })
}