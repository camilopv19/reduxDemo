import { INCREMENT, DECREMENT } from './actions';
import { tassign } from 'tassign';
import { Map } from 'immutable';

export interface IAppState {
    counter: number;
    messaging?: {
        newMessages: number
    };
}

export const INITIAL_STATE: IAppState = {
    counter: 0,
    messaging: {
        newMessages: 3
    }
};

// export function rootReducer(state: IAppState, action): IAppState {  // tassign approach
export function rootReducer(state: Map<string, any>, action): Map<string, any> {
    switch (action.type) {
        case INCREMENT:
            // Combines the Target object "{}" with the Source "state", according the specified props "{ counter: ...}"
            // with the danger of breaking the rule of adding new properties to the original object
            // as "isOnline" doesn't exist in the store
            // return Object.assign( {}, state, { counter: state.counter + 1, isOnline: true });

            // Combines safely (thanks to the npm-pkg tassign) the Target object "state" with the
            // specified props, respecting the target model --> doesn't allow to add new props
            // return tassign(state, { counter: state.counter + 1 }); // tassign approach
            return state.set('counter', state.get('counter') + 1); // Immutable approach
        case DECREMENT:
            // return tassign(state, { counter: state.counter - 1 }); // tassign approach
            return state.set('counter', state.get('counter') - 1); // Immutable approach
    }
    return state;
}