import firebase from 'firebase'

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

export function fetchProducts() {
  return async function(dispatch) {
    dispatch({type: "FETCH_PRODUCTS"});
    const db = firebase.firestore();
    let experiences=[];
    const Ref = db.collection('/experiences');
    const snapshot = await Ref.get();
    snapshot.forEach(doc => {
      let experience = doc.data();
      if(experience.approved){
        experience.id = doc.id
        experiences.push(experience)
      }
    });
  dispatch({type: "FETCH_PRODUCTS_FULFILLED", payload:experiences});
  }
}