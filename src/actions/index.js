import _ from 'lodash';

import jsonPlaceHolder from '../apis/jsonPlaceHolder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    
    // 'userId' will fetch userId from the state (which here is basically the posts)
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    
    userIds.forEach((id) => dispatch(fetchUser(id)));
}



export const fetchPosts = () => {

    return async (dispatch) => {

        const response = await jsonPlaceHolder.get('/posts');

        dispatch({ type: 'FETCH_POSTS', payload: response.data })
    }
};



export const fetchUser = (id) => {
    return async (dispatch) => {
        const response = await jsonPlaceHolder.get(`/users/${id}`);

        dispatch({ type: 'FETCH_USER', payload: response.data })
    }
};





// ************************************************************************
// export const fetchUser = (id) => {
//     return (dispatch) => {
//         _fetchUser(id, dispatch);
//     }
// };


// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data })
// });
// ************************************************************************





// OR

// export const fetchPosts = () => async (dispatch) => {
//     const response = await jsonPlaceHolder.get('/posts');

//     dispatch({ type: 'FETCH_POSTS', payload: response })
// }
