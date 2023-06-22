import { Effect, Reducer, Subscription, request } from 'umi';
import herolistjson from '../../mock/herolist.json';

export interface HeroProps {
  ename: number;
  cname: string;
  title: string;
  new_type: number;
  hero_type: number;
  skin_name: string;
}
export interface HeroModelState {
  name: string;
  heros: HeroProps[];
  filterKey: number;
  freeheros: [];
  itemHover: number;
}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<HeroModelState>;
  };
  subscriptions: { setup: Subscription };
}

const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    name: '',
    heros: [],
    filterKey: 0,
    freeheros: [],
    itemHover: 0,
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *fetch({ type, payload }, { put, call, select }) {
      const herolist = herolistjson;
      function getRandomArrayElements(arr: any, count: any) {
        var shuffled = arr.slice(0),
          i = arr.length,
          min = i - count,
          temp,
          index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      }
      const freeheros = getRandomArrayElements(herolistjson, 13);

      yield put({
        type: 'save',
        payload: {
          heros: herolist,
          freeheros: freeheros,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default HeroModel;
