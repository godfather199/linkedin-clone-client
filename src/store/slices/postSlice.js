import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { add_Comment_Service, createPostService, delete_Post_Service, edit_Post_Service, featured_Post_Service, fetch_Post_By_Id_Service, fetch_Post_By_Username_Service, like_Unlike_Post_Service, new_User_Posts_Service, post_Of_Following_Service } from "../../services/postService"
import toast from "react-hot-toast"

const initialState = {
    isLoading: false,
    commentLoading: false,
    isSuccess: false,
    isError: false,
    posts: [],
    post: {}
}



// Create Post
export const thunkCreatePost = createAsyncThunk(
    'post/new', async (postData, thunkAPI) => {
        try {
            return await createPostService(postData)
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message)
        }
    }
)


// Posts of following
export const thunk_Posts_Of_Following = createAsyncThunk(
    'post/following', async (thunkAPI) => {
        try {
            return await post_Of_Following_Service()
        } catch (error) {
            return thunkAPI.error.response.data.message
        }
    }
)


export const thunk_New_Users_Posts = createAsyncThunk(
  'posts/new-user-posts', async (thunkAPI) => {
    try {
      return await new_User_Posts_Service()
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)


// Like unlike post
export const thunk_Like_Unlike_Post = createAsyncThunk(
    'post/like-unlike', async (postId, thunkAPI) => {
        try {
            return await like_Unlike_Post_Service(postId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)


export const thunk_Fetch_Post_By_Username = createAsyncThunk(
    'post/post-username', async (username, thunkAPI) => {
        try {
            return await fetch_Post_By_Username_Service(username)
        } catch (error) {
            return thunkAPI.error.response.data.message
        }
    }
)



export const thunk_Update_Post = createAsyncThunk(
    'post/update', async (postData, thunkAPI) => {
        try {
            // console.log('Slice Data: ', postData)
            // console.log('Slice Id: ', postId)
            return await edit_Post_Service(postData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const thunk_Delete_Post = createAsyncThunk(
    'post/delete', async (postId, thunkAPI) => {
        try {
            return await delete_Post_Service(postId)
        } catch (error) {
            return thunkAPI.error.response.data.message
        }
    }
)



export const thunk_Featured_Post = createAsyncThunk(
    'post/featured-post', async (postId, thunkAPI) => {
        try {
            return await featured_Post_Service(postId)
        } catch (error) {
            return thunkAPI.error.response.data.message
        }
    }
)



export const thunk_Add_Comment = createAsyncThunk(
  'post/comment', async (info, thunkAPI) => {
    try {
      return await add_Comment_Service(info)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)



export const thunk_Fetch_Post_By_Id = createAsyncThunk(
  'post/by-id', async (postId, thunkAPI) => {
    try {
      return await fetch_Post_By_Id_Service(postId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)




const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        post_initial_state: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        },
        post_Remaining_Initial_State: (state) => {
          state.posts = []
          state.post = {}
        },
        like_Post_Real_Time: (state, {payload}) => {
          // console.log('Payload: ', payload)
          state.posts = state.posts.map((post) => {
            if (post._id === payload.post_Id) {
              return {
                ...post,
                likes: payload.post_Status
                  ? post.likes.some((item) => item === payload.liked_By_User)
                    ? post.likes
                    : [...post.likes, payload.liked_By_User]
                  : post.likes.filter((item) => item !== payload.liked_By_User),
              };
            }
            return post;
          });
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(thunkCreatePost.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
          })
          .addCase(thunkCreatePost.fulfilled, (state, { payload }) => {
            const { msg, newPost } = payload;

            toast.success(msg, {
              duration: 1200,
              position: "bottom-center",
            });
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.post = newPost;
            state.posts.unshift(newPost);

            // console.log('Post msg: ', msg)
          })
          .addCase(thunk_Posts_Of_Following.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
          })
          .addCase(thunk_Posts_Of_Following.fulfilled, (state, { payload }) => {
            const { msg, posts } = payload;

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.posts = posts;
          })
          .addCase(thunk_New_Users_Posts.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_New_Users_Posts.fulfilled, (state, {payload}) => {
            const {msg, posts} = payload

            state.isLoading = false;
            state.isSuccess = true;
            state.posts = posts;
          })
          .addCase(thunk_Like_Unlike_Post.fulfilled, (state, { payload }) => {
            const { msg, post_To_Like } = payload;

            // console.log('Slice: ', post_To_Like)

            state.posts = state.posts.map((post) => {
              if (post._id === post_To_Like._id) {
                return {
                  ...post,
                  likes: post_To_Like.likes,
                };
              }

              return post;
            });

            toast.success(msg, {
              duration: 1200,
            });
          })
          .addCase(thunk_Fetch_Post_By_Username.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(
            thunk_Fetch_Post_By_Username.fulfilled,
            (state, { payload }) => {
              const { posts } = payload;

              state.isLoading = false;
              state.posts = posts;
            }
          )
          .addCase(thunk_Update_Post.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(thunk_Update_Post.fulfilled, (state, { payload }) => {
            const { msg, post } = payload;

            state.isLoading = false;

            state.posts = state.posts.map((item) => {
              if (item._id === post._id) {
                return post;
              }

              return item;
            });

            toast.success(msg, {
              duration: 1200,
            });
          })
          .addCase(thunk_Delete_Post.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(thunk_Delete_Post.fulfilled, (state, { payload }) => {
            const { msg, post: deletedPost } = payload;

            state.isLoading = false;

            state.posts = state.posts.filter(
              (item) => item._id !== deletedPost._id
            );

            toast.success(msg, {
              duration: 1200,
              position: "bottom-center",
            });
          })
          .addCase(thunk_Featured_Post.fulfilled, (state, { payload }) => {
            const { msg, post } = payload;

            state.posts = state.posts.map((item) => {
              if (item._id === post._id) {
                return post;
              }

              return item;
            });

            toast.success(msg, {
              duration: 1500,
              position: "bottom-center",
            });
          }) 
          .addCase(thunk_Add_Comment.pending, (state) => {
            state.commentLoading = true
          })
          .addCase(thunk_Add_Comment.fulfilled, (state, {payload}) => {
            const {msg, post} = payload

            state.commentLoading = false
            state.posts = state.posts.map((item) => {
              if(item._id === post._id) {
                return {
                  ...item,
                  comments: post.comments
                }
              }

              return item
            })

            toast.success(msg, {
              duration: 1500,
              position: 'bottom-center'
            })
          })
          .addCase(thunk_Fetch_Post_By_Id.pending, (state) => {
            state.isLoading = true
          })
          .addCase(thunk_Fetch_Post_By_Id.fulfilled, (state, {payload}) => {
            const {msg, post} = payload

            state.isLoading = false
            state.post = post
          })
          
    }

})



export const {post_initial_state, post_Remaining_Initial_State, like_Post_Real_Time} = postSlice.actions


export default postSlice.reducer