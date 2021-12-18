import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";

export const EditExercisePage = ({ exerciseToEdit }) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the exercise");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Edit Exercise</h2>
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
                                value={name}
                                onChange={e => setName(e.target.value)} />
                            </td>
                        <td>
                            <input
                                type="number"
                                value={reps}
                                onChange={e => setReps(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={weight}
                                onChange={e => setWeight(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={unit}
                                onChange={e => setUnit(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="date"
                                value={date.slice(0,10)}
                                onChange={e => setDate(e.target.value)} />
                        </td>
                        <td>
                            <button
                                onClick={editExercise}
                            >Save</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <Link to="/">Home Page</Link>
        </div>
    );
}

export default EditExercisePage;