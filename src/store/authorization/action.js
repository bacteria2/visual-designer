import { normalize, schema } from 'normalizr'
import { getAuthorityList } from '../../service/authrization'
import Immutable from 'immutable'

function normalized (authList) {
  const property = new schema.Entity('module', {}, {
    idAttribute: value => value.module,
  });
  return normalize(authList, [property])
}

export const saveAuthList = 'AUTH_SAVE_LIST';

export async function fetchAuth () {
  const {success, data} = await getAuthorityList(),action={type: saveAuthList,payload:Immutable.Map({entities:{module:{}},result:[]})};
  if (success)
    action.payload=Immutable.fromJS(normalized(data));
  return action
}