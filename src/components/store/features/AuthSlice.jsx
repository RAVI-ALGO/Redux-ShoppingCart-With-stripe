import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
const initialState = {
    token: localStorage.getItem('token'),
    name: '',
    email: '',
    password: '',
    _id: '',
    registerStatus: '',
    registerError: '',
    loginError:'',
    loginStatus: '',
    userLoaded: false
}

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (values, { rejectWithValue }) => {
        try {
            const result = await axios.post("http://localhost:5000/api/auth/userSignup", { name: values.name, email: values.email, password: values.password })

            return result?.data?.data
        }
        catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data)
        }
    }
)
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (values, { rejectWithValue }) => {
        console.log('login user');
        try {
            const result = await axios.post("http://localhost:5000/api/auth/userlogin", { email: values.email, password: values.password })
            console.log('result', result);
            return result?.data?.data
        }
        catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data)
        }
    }
)
const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token
            if (token) {
                const user = jwtDecode(token)

                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    loginStatus: '1',
                    userLoaded: true,
                }
            }
        }
        ,
        logoutUser(state, action) {
            localStorage.removeItem("token")
            localStorage.removeItem("login")
            return {
                ...state,
                token: "",
                name: '',
                email: '',
                password: '',
                _id: '',
                registerStatus: '',
                registerError: '',
                loginError: '',
                loginStatus: '',
                userLoaded: false
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: 'pending', registerError: action.payload?.data, loginStatus: '0' }
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                localStorage.setItem("token", action.payload.remember_token)
                localStorage.setItem("login", 1)

                return {
                    ...state,
                    email: action.payload.email,
                    name: action.payload.name,
                    password: action.payload.password,
                    _id: action.payload._id,
                    loaded: true,
                    token: action.payload.remember_token,
                    registerStatus: 'success', loginStatus: 1
                }
            }

            else {
                return { ...state, registerStatus: 'failed' }
            }

        });
        builder.addCase(registerUser.rejected, (state, action) => {
            return { ...state, registerStatus: 'failed', registerError: action.payload }

        });

        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: 'pending', loginError: action.payload?.data }
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                localStorage.setItem("token", action.payload.remember_token)
                localStorage.setItem("login", 1)
                console.log('login user');

                const user = jwtDecode(action.payload.remember_token)
                return {
                    ...state,
                    email: action.payload.email,
                    name: user.name,
                    password: action.payload.password,
                    _id: action.payload._id,
                    loaded: true,
                    token: action.payload.remember_token,
                    loginStatus: 'success'
                }
            }

            else {
                return { ...state, loginStatus: 'failed' }
            }

        });
        builder.addCase(loginUser.rejected, (state, action) => {
            return { ...state, loginStatus: 'failed', loginError: action.payload }

        });
    }

})

export { AuthSlice }