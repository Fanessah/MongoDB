import { MongoClient, ObjectId } from "mongodb";

import { uri } from './credentials.js'

const client = new MongoClient(uri)

const db = client.db('sample_mflix')

const moviesCollection = db.collection('movies')


// console.log( await moviesCollection.findOne({}) )

let query = { title: { $regex: /star wars/i } } // search for "terminator" anywhere in the title and ignore case
let movieArray = await moviesCollection
    .find(query)
    // .limit(3)
    .toArray()

for (let i = 0; i < movieArray.length; i++) {
    console.log(movieArray[i].title)
}

// Add new movie
const newMovie = {
    title: "The Boca Code Story",
    Rating: "R",
    Genre: ["Comedy"],
    releaseDate: "2022/12/16"
}

// const results = await moviesCollection.insertOne(newMovie)
// console.log ("Results of insert",results)

const updateQuery = { _id: new ObjectId("6345ca63eb324c177eb4f8ad") };
const update = { $set: { title: "the New Boca Code story"}}
const results = await moviesCollection.findOneAndUpdate(updateQuery,update);
console.log(results)


// let firstMovie = movieArray[0]
// console.log(firstMovie.title)
// console.log(`there are ${movieArray.length} of movies`)

