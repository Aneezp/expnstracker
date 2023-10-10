import AsyncStorage from "@react-native-async-storage/async-storage"
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}




function LoginReducer(state = { value: false }, action) {
  switch (action.type) {
    case 'logins':
      {
        let data = action?.payload ?? ''
        const value = {
          username: data.username ?? '',
          password: data.password ?? '',
          'logged': true
        };
        AsyncStorage.setItem('user', JSON.stringify(value))

        // AsyncStorage.setItem('password',data.password)
        return { value: true }
      }
    case 'loggedout':
      const value = {
        'logged': false
      };
      AsyncStorage.setItem('user', JSON.stringify(value))
      return { value: false }
    default:
      return state
  }
}

const persistedReducer = persistReducer(persistConfig, LoginReducer)
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
//   export const LoginReducer = LoginSlice.reducer;
// export let store = createStore(LoginReducer)
