import axios from 'axios';

//ACTION TYPES

//singular get student? 
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

//ACTION CREATORS

export const getStudents = (students) => {
    return {
      type: GET_STUDENTS,
      students: students
    }
  }

export const addStudent = (student) => {
  return {
    type: ADD_STUDENT,
    student: student
  }
}

export const editStudent = (student) => {
    return {
      type: EDIT_STUDENT,
      student: student
    }
  }

export const deleteStudent = (student) => {
  return {
    type: DELETE_STUDENT,
    student: student
  }
}

//REDUCER
const studentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS:
        return action.students;
    case ADD_STUDENT:
      return [...state, action.student];
    case EDIT_STUDENT:
      const newArray = state.filter(student => action.student.id !== student.id);
      return [...newArray, action.student]
    case DELETE_STUDENT:
      const oldStudents = state.filter(student => student.id !== action.student.id);
      return oldStudents
    default:
      return state;
  }
}

//THUNK CREATORS

export const getAllStudents = () => {
    return (dispatch) => {
      axios.get('/api/students/')
        .then(res => res.data)
        .then(students => {
          dispatch(getStudents(students));
        })
        .catch(console.log.bind(console))
    }
  }

  export const getOneStudent = (id) => {
    return (dispatch) => {
      axios.get(`/api/students/${id}`)
        .then(res => res.data)
        .then(students => {
          dispatch(getStudents(students));
        })
        .catch(console.log.bind(console))
    }
  }


export const createStudent = (student, history) => {
  return (dispatch) => {
    axios.post('/api/students/', student)
      .then(res => res.data)
      .then(newStudent => {
        dispatch(addStudent(newStudent));
        history.push('/students');        
      })
      .catch(console.log.bind(console))
  }
}

export const updateStudent = (student) => {
    return (dispatch) => {
      axios.put(`/api/students/${student.id}`, student)
        .then(res => res.data)
        .then(newStudent => {
          dispatch(editStudent(newStudent));
          // history.pushState('/students');                  
        })
        .catch(console.log.bind(console))
    }
  }

export const removeStudent = (student, history) => {
  return (dispatch) => {
    axios.delete(`/api/students/${student.id}`)
      .then(() => {
        dispatch(deleteStudent(student));
        history.push('/students');
      })
      .catch(console.log.bind(console))
  }
}
export default studentReducer;
