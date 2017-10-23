import axios from 'axios';


//ACTION TYPES
//singular?
const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

//ACTION CREATORS

export const getCampuses = (campuses) => {
    return {
        type: GET_CAMPUSES,
        campuses: campuses
    }
}

export const addCampus = (campus) => {
    return {
        type: ADD_CAMPUS,
        campus: campus
    }
}

export const editCampus = (campus) => {
    return {
        type: EDIT_CAMPUS,
        campus: campus
    }
}

export const deleteCampus = (campus) => {
    return {
        type: DELETE_CAMPUS,
        campus: campus
    }
}



//REDUCER


//revisit

const campusReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;
        case ADD_CAMPUS:
            return [...state, action.campus];
        case EDIT_CAMPUS:
            const newArray = state.filter(campus => action.campus.id !== campus.id);
            return [...newArray, action.campus]
        case DELETE_CAMPUS:
            const oldCampuses = state.filter(campus => campus.id !== action.campus.id);
            return oldCampuses
        default:
            return state;
    }
}


//THUNK CREATORS
export const getAllCampuses = () => {
    return (dispatch) => {
        axios.get('/api/campuses/')
            .then(res => res.data)
            .then(campuses => {
                dispatch(getCampuses(campuses));
            })
            .catch(console.log.bind(console))
    }
}

export const getOneCampus = (id) => {
    return (dispatch) => {
        axios.get(`/api/campuses/${id}`)
            .then(res => res.data)
            .then(campus => {
                dispatch(getCampuses(campus));
            })
            .catch(console.log.bind(console))
    }
}

export const createCampus = (campus) => {
    return (dispatch) => {
        axios.post('/api/campuses/', campus)
            .then(res => res.data)
            .then(newCampus => {
                dispatch(addCampus(newCampus));
                // history.pushState('/campuses');
                
            })
            .catch(console.log.bind(console))
    }
}

export const updateCampus = (campus, history) => {
    return (dispatch) => {
        axios.put(`/api/campuses/${campus.id}`, campus)
            .then(res => res.data)
            .then(campus => {
                dispatch(editCampus(campus));
                history.push(`/campuses/${campus.id}`);                               
            })
            .catch(console.log.bind(console))
    }
}

export const removeCampus = (campus, history) => {
    return (dispatch) => {
        axios.delete(`/api/campuses/${campus.id}`)
            .then(() => {
                dispatch(deleteCampus(campus));
                history.push('/campuses');               
            })
            .catch(console.log.bind(console))
    }
}

export default campusReducer;
