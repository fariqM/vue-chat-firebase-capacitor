// Utilities
import { defineStore } from 'pinia'
import {
  getDatabase,
  ref as DbRef,
  query,
  orderByKey,
  orderByChild,
  equalTo,
  child,
  get,
} from "firebase/database";

function firebaseQuery(q) {
  return new Promise((resolve, reject) => {
    get(q)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let obj = snapshot.val()
          obj.error = false;
          resolve(obj);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject({ error: true, msg: error })
      });
  })
}

export const useStoreData = defineStore('app', {
  state: () => ({
    user: null
  }),
  actions: {
    async getOneUser(path, child, param) {
      const databaseRef = DbRef(getDatabase(), path);
      const q = query(
        databaseRef,
        ...[orderByChild(child), equalTo(param)]
      );
      let result = await firebaseQuery(q);
      if (result?.error) {
        console.log(result.error);
        return null
      } else {
        return result
      }
    },
    setCurrentUser(user) {
      this.user = user
    },
    getContact(){

    }
  },
  getters: {
    getCurrentUser(){
      return this.user
    }
  }
})
