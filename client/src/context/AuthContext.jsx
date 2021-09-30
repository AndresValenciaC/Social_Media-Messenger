import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

/** Use this dummy data so dont have to log in more than once 

const INITIAL_STATE = {
  user: {
    _id: "60f4888aab5f247354e847a7",
    username: "maria",
    email: "maria@hotmail.com",
    profilePicture: "/assets/person/1.jpeg",
    coverPic: "/assets/cover/img4.jpg",
    isAdmin: false,
    followers: ["60ddd764f11dad3e4aa55529"],
    followings: ["60ddd764f11dad3e4aa55529", "60df8c9892192e4cc3459b1b"],
  },
  isFetching: false,
  error: false,
};
*/
export const AuthContext = createContext(INITIAL_STATE);

/** Import function so AuthContext will apply to the app */
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
