import mongoose from 'mongoose';
import 'dotenv/config';
//import exercises from './data/exercises.mjs';
//import Exercise from './exercise.mjs';


const EXERCISE_DB_NAME = 'exercise_db';
const EXERCISE_COLLECTION = 'exercises';
const EXERCISE_CLASS = "Exercise";

let connection = undefined;
let Exercise = undefined;


//connect to MongoDB
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Exercise= createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

//create using POST/orders 
function createModel(){
//define schema
    const exerciseSchema = mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit:{type: String, required: true},
        date: {type: String, required: true}
    
    });
    return mongoose.model(EXERCISE_CLASS, exerciseSchema)
}

//Call constructor of exercise class
async function createExercise(name, reps, weight, unit, date){
    //console.log('Creating exercise with data:', { name, reps, weight, unit, date });
    const exercise = new Exercise({name: name, reps:reps, weight:weight, unit:unit, date:date});
    //console.log('Exercise saved successfully:', exercise);
    return exercise.save();
}



//Retrieve all exercises
const findExercises = async(filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

//Retrieve by ID
async function findExerciseById(_id) {
    const exercise = await Exercise.findById(_id);
    return exercise;
}


/**
     * Replace name, reps, weight, unit, and date
     * @param {string} name
     * @param {Number} reps
     * @param {Number} weight
     * @param {String} unit
     * @param {String} date
     */
async function replaceExercise (_id, name, reps, weight, unit, date) {
    const updateOption = {};
    updateOption.name = name;
    updateOption.reps = reps;
    updateOption.weight = weight;
    updateOption.unit = unit;
    updateOption.date = date;
    await Exercise.updateOne({_id: _id}, updateOption);
    return Exercise.findById(_id).exec(); 
    
}


/**
 * Delete the exercise with provided id value
 * @param {String} _id 
 * @returns Count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    /*for(let i = 0; i < exercises.length; i++){
        if(exercises[i]._id === _id){
            exercises.splice(i, 1)
            return 1;
        }
    }*/
    return result.deletedCount;
}

export { connect, createExercise, findExercises, findExerciseById, replaceExercise, deleteById };
