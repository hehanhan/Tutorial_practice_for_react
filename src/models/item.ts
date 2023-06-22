import { Effect, Reducer, request, Subscription } from 'umi';
import itemjson from '../../mock/item.json';

export interface ItemModelState {
  name: string;
  items: [
    {
      des1: string;
      item_id: number;
      item_name: string;
      item_type: number;
      price: number;
      total_price: number;
    },
  ];
  filterKey: number;
}

export interface ItemModelType {
  namespace: 'item';
  state: {
    name: string;
    items: ItemModelState[];
    filterKey: number;
  };
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ItemModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ItemModel: ItemModelType = {
  namespace: 'item',

  state: {
    name: '',
    items: [],
    filterKey: 0,
  },

  effects: {
    *query({ payload }, { call, put }) {},

    *fetch({ payload }, { call, put }) {
      // const data = yield request('/web201605/js/item.json');
      const data = itemjson;
      yield put({
        type: 'save',
        payload: {
          items: data || [],
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
        if (pathname === '/item') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default ItemModel;
