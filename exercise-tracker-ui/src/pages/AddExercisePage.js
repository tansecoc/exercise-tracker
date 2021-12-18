import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the exercise");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Create Exercise</h2>
            <table id="exercises" class='exercise-table'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                placeholder="Enter name here"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder="Enter reps here"
                                value={reps}
                                onChange={e => setReps(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder="Enter weight here"
                                value={weight}
                                onChange={e => setWeight(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Enter unit here"
                                value={unit}
                                onChange={e => setUnit(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="date"
                                placeholder="Enter date here"
                                value={date}
                                onChange={e => setDate(e.target.value)} />
                        </td>
                        <td>
                            <button
                                onClick={addExercise}
                            >Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <Link to="/">Home Page</Link>
        </div>
    );
}

export default AddExercisePage;