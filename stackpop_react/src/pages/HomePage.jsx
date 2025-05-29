import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';


function HomePage({setExerciseToEdit}){
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate()

    /*Per MDN, default fetch() request is GET, adding redundant '{method: 'GET'}'
    for illustrative purposes*/ 
    const loadExercises = async () => {
        const response = await fetch('/exercises', {method: 'GET'})
        const data = await response.json();
        setExercises(data)
    }

    useEffect( () => {
            loadExercises();
        }, []);

    const onDelete = async (_id) =>{
        const response = await fetch(
            `/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if(response.status ===204){
            setExercises(exercises.filter( e => e._id !== _id))
            alert(`Successfully deleted the exercise with _id = ${_id}`)
        }else{
            alert(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
        
        }
          

    const onEdit = async (exercise) =>{
        //console.log('onEdit called with ' + exercise.title)
        setExerciseToEdit(exercise)
        const exerciseId = exercise._id
        navigate(`/edit-exercise/${exerciseId}`)
    }
    return (
        <>
            <h2>Completed Exercises</h2>
            <p>Click "create" to log a new exercise</p>
            <p>Click delete or edit icons to delete or edit your exercise</p>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
            
        </>
    );
}


export default HomePage;