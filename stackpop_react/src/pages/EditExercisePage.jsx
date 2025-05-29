import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export const EditExercisePage = () => {

    const {id} = useParams();
    const [name, setName] = useState('');
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');


    const navigate = useNavigate();


    useEffect(() => {
        const fetchExercise = async () => {
            const response = await fetch(`/exercises/${id}`);
            if (response.ok) {
                const exercise = await response.json();
                setName(exercise.name);
                setReps(exercise.reps);
                setWeight(exercise.weight);
                setUnit(exercise.unit);
                setDate(exercise.date);
            } else {
                console.error('Failed to fetch exercise');
            }
        };

        fetchExercise();
    }, [id]);

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            `/exercises/${id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(editedExercise),
            }
        );
        if(response.status===200){
            alert("Successfully edited the exercise");
        }else{
            alert("Failed to edit exercise, status code = " + response.status)
        }
        navigate('/')
    };

    return (
        <div>
            <h2>Edit Existing Exercise</h2>
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Unit</th>
                <th>Date</th>

            </tr>
        </thead>
        <tbody>

        <tr>
            <td>
        <input
            type="text"
            id="Exercise Name"
            value={name}
            onChange={e => setName(e.target.value)} />
            </td>
            <td>
        <input
            type="number"
            value={reps}
            onChange={e => setReps(e.target.valueAsNumber)} />
            </td>
            <td>
        <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.valueAsNumber)} />
            </td>
            <td>
         <select
            type="text"
            value={unit}
            onChange={e => setUnit(e.target.value)}
            >
            <option value = "kgs">kgs</option>
            <option value = "lbs">lbs</option>
            </select>
            </td>
            <td>
         <input
            type="text"
            value={date}
            onChange={e => setDate(e.target.value)} />
            </td>
            <td className="no-border-row">
        <button
            onClick={editExercise}
        >Edit</button>
        </td>
        </tr>

        </tbody>
        
    </table>
    </div>


);
}



export default EditExercisePage;
