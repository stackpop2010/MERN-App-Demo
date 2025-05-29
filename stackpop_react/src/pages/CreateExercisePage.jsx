import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            '/exercises', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise), 
            }
        );
        if(response.status===201){
            alert("Successfully added the exercise");
        }else{
            alert("Failed to add exercise, status code = " + response.status)
        }
        navigate('/')
    };

    return (
        <div>
        <h2>Log New Exercise Below</h2>
        <p>Date should be in MM-DD-YY format</p>
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
                onChange={e=> setWeight(e.target.valueAsNumber)} />
                </td>
                <td>
             <select
                
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
                onClick={addExercise}
            >Add</button>
            </td>
            </tr>
            
            </tbody>
        </table>
        </div>

        
    );
}

export default AddExercisePage;