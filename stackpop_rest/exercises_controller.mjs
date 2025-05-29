import 'dotenv/config';
import express from 'express';
import asyncHandler from "express-async-handler"
import * as exercisesModel from './exercises_model.mjs';
import cors from 'cors';

const app = express();
app.use(express.json())
const PORT = process.env.PORT;

app.use(cors({
    origin: 'https://mern-demo-front.onrender.com', // Replace with your deployed frontend domain
    credentials: true // if you need cookies/auth
  }));


function isDateValid(date) {
    // validates using regular expressions
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

// CRUD Operation - create, using POST/exercises
// calls createExercise in exercises_model.mjs file
app.post('/exercises', asyncHandler(async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;
    
    if (!name || !reps ||!weight|| !unit|| !date||
        !isDateValid(date)|| 
        typeof name !== "string"|| !Number.isInteger(weight)|| !Number.isInteger(reps) ||
        typeof unit !== "string" || typeof date !== "string"||
        name.length < 1 || reps <0 || weight <0|| (unit !== "kgs" && unit !== "lbs")
    ) {
        return res.status(400).json({ "Error": "Invalid request" }); 
    }
 
    const postExercise = await exercisesModel.createExercise(name, reps, weight, unit, date);
    res.status(201).json(postExercise);
    
}));

// Crud Operation - get, using GET/exercises
//Retrieve all exercises. 
app.get('/exercises', asyncHandler(async (req, res) => {
    const exercises = await exercisesModel.findExercises();
    res.status(200).json(exercises);
}));

//Crud Operation - get, using GET/exercises/:_id
//Retrieve the exercise corresponding to the ID provided in the URL.
app.get('/exercises/:exercise_id', asyncHandler(async (req, res) => {
    const { exercise_id} = req.params;
    const getByID = await exercisesModel.findExerciseById(exercise_id);
    if (getByID) {
        res.status(200).json(getByID);
    } else {
        res.status(404).json({"Error": "Not found"}); 
    }   
}));

// CRUD Operation - updates using PUT 
// path is PUT /exercises/:id
// calls updateUser in exercises_model.mjs
app.put('/exercises/:exercise_id', asyncHandler(async (req, res) => {
    const { exercise_id } = req.params;
    const { name, reps, weight, unit, date } = req.body;
    if (!name || !reps ||!weight|| !unit|| !date||
        !isDateValid(date)|| 
        typeof name !== "string"|| !Number.isInteger(weight)|| !Number.isInteger(reps) ||
        typeof unit !== "string" || typeof date !== "string"||
        name.length < 1 || reps <0 || weight <0|| (unit !== "kgs" && unit !== "lbs")
    ) {
        return res.status(400).json({ "Error": "Invalid request" }); 
    }
 
    const putByID = await exercisesModel.replaceExercise(exercise_id , name, reps, weight, unit, date );    
    if (putByID) {
        res.status(200).json(putByID);
    } else{
        res.status(404).json({ "Error": "Not found"}); 
    }    
})); 

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:exercise_id', asyncHandler(async (req, res) => {
    const { exercise_id } = req.params;
    const deleteByID = await exercisesModel.deleteById(exercise_id );
    
    // if no matching user ID is found, deleteByID returns null
    // if null is returned, 404 response is sent
    if(deleteByID > 0){
        return res.status(204).send()//json(deleteByID)
    }else{
        return res.status(404).json({"Error": "Not found"})
    }
}));


app.listen(PORT, asyncHandler(async () => {
    await exercisesModel.connect(false)
    console.log(`Server listening on port ${PORT}...`);
}));

