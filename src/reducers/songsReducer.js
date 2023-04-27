export default function songsReducer(state, action) {
  switch (action.type) {
    case "GET_QUIZZES_REQ":
      return {
        ...state,
        quizzes: {
          data: state?.quizzes?.data,
          loading: true,
          error: ""
        }
      };
    case "GET_QUIZZES_SCS":
      return {
        ...state,
        quizzes: {
          data: action.payload.data,
          loading: false
        }
      };
    case "GET_QUIZZES_FLR":
      return {
        ...state,
        quizzes: {
          data: [],
          loading: false,
          error: action.payload.error
        }
      };

    case "ADD_SONG_TO_PLAYLIST_REQ":
      return {
        ...state,
        playlists: {
          ...state.playlists,
          loading: true,
          error: ""
        }
      };
    case "ADD_SONG_TO_PLAYLIST_SCS":
      return {
        ...state,
        playlists: {
          data: state?.playlists?.data?.map(item => {
            if (item.id === action.payload?.data?.id) {
              return {
                id: item.id,
                title: item.title,
                songs: [action.payload?.data?.data, ...item.songs]
              };
            }
            return item;
          }),
          loading: false
        }
      };
    case "ADD_SONG_TO_PLAYLIST_FLR":
      return {
        ...state,
        playlists: {
          ...state.playlists,
          loading: false,
          error: action.payload.error
        }
      };
    case "ADD_PLAYLIST_REQ":
      return {
        ...state,
        playlists: {
          ...state.playlists,
          loading: true,
          error: ""
        }
      };
    case "ADD_PLAYLIST_SCS":
      const newPlaylists = {
        id: Math.random(),
        title: action.payload?.data?.title,
        songs: action.payload?.data?.data ? [action.payload?.data?.data] : []
      };
      return {
        ...state,
        playlists: {
          data: [newPlaylists, ...state.playlists.data],
          loading: false
        }
      };
    case "ADD_PLAYLIST_FLR":
      return {
        ...state,
        playlists: {
          ...state.playlists,
          loading: false,
          error: action.payload.error
        }
      };
    case "ADD_REMOVE_FROM_FAVORITE_REQ":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          loading: true,
          error: ""
        }
      };
    case "ADD_REMOVE_FROM_FAVORITE_SCS":
      return {
        ...state,
        songs: {
          data: state?.songs?.data?.map(item => {
            if (item.id === action.payload?.id) {
              return {
                ...item,
                favorite: !item?.favorite
              };
            }
            return item;
          }),
          loading: false
        },
        playlists: {
          data: state.playlists.data.map(list => {
            return {
              ...list,
              songs: list?.songs?.map(song => {
                if (song?.id === action.payload?.id) {
                  return {
                    ...song,
                    favorite: !song?.favorite
                  };
                }
                return song;
              })
            };
          })
        },
        favorites: {
          data:
            state.favorites.data?.filter(e => e.id === action.payload?.id)
              .length > 0
              ? state.favorites.data?.filter(e => e.id !== action.payload?.id)
              : [action.payload?.item, ...state.favorites.data]
        }
      };
    case "ADD_REMOVE_FROM_FAVORITE_FLR":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          loading: false,
          error: action.payload.error
        }
      };
    case "GET_LIST_REQ":
      return {
        ...state,
        playlists: {
          data: [],
          loading: true,
          error: ""
        }
      };
    case "GET_LIST_SCS":
      return {
        ...state,
        playlists: {
          data: action.payload.data,
          loading: false
        }
      };
    case "GET_LIST_FLR":
      return {
        ...state,
        playlists: {
          data: [],
          loading: false,
          error: action.payload.error
        }
      };
    case "GET_FAVORITES_REQ":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          loading: true,
          error: ""
        }
      };
    case "GET_FAVORITES_SCS":
      return {
        ...state,
        favorites: {
          data: action.payload.data,
          loading: false
        }
      };
    case "GET_FAVORITES_FLR":
      return {
        ...state,
        favorites: {
          data: [],
          loading: false,
          error: action.payload.error
        }
      };
    default:
      return state;
  }
}
