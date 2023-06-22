import { Effect, Reducer, Subscription, request } from 'umi';
import summonerJson from '../../mock/summoner.json';

export interface SummonerModelState {
  name: string;
  summoners: [
    {
      summoner_description: string;
      summoner_id: number;
      summoner_name: string;
      summoner_rank: string;
    },
  ];
}

export interface SummonerModelType {
  namespace: 'summoner';
  state: {
    name: string;
    summoners: SummonerModelState[];
  };
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<SummonerModelState>;
  };
  subscriptions: { setup: Subscription };
}

const SummonerModel: SummonerModelType = {
  namespace: 'summoner',

  state: {
    name: '',
    summoners: [],
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *fetch({ payload }, { call, put }) {
      // const data = yield request('/web201605/js/summoner.json');
      const data = summonerJson;
      yield put({
        type: 'save',
        payload: {
          summoners: data,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/summoner') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default SummonerModel;
