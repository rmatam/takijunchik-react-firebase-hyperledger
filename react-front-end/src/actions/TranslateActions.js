import api from "../api/httpApi"; //Api is for axios http endpoints
import FirebaseApi from "../api/FirebaseApi";
import {
  TRANSLATE_SUCCESS,
  GET_OBJECT_DETAIL_SUCCESS
} from "../constants/types";
import { ERROR_MIDDLEWARE } from "../constants/types";

//This is just calling to other class of accesing to the rest services
export const translateBlockchainAction = input => {
  return {
    type: TRANSLATE_SUCCESS,
    object: api.vocabulary.getObject(input)
  };
};

/**
 * TODO: Is not yet being used
 * @param {*} input
 */
export const translateFirebaseAction = input => {
  console.log("Action Translate Firebase");
  console.log(input);

  return dispatch => {
    FirebaseApi.getValueByKey("/objectModel", input)
      .then(res => {
        dispatch(getObjectSuccess(res.data));
      })
      .catch(err => {
        dispatch(handleError(err.message));
      });
  };
};
export const setObjectDetail = object => {
  return {
    type: GET_OBJECT_DETAIL_SUCCESS,
    object: object
  };
};

const getObjectSuccess = object => {
  return {
    type: TRANSLATE_SUCCESS,
    object: object
  };
};
const handleError = message => {
  return {
    type: ERROR_MIDDLEWARE,
    message: message
  };
};
