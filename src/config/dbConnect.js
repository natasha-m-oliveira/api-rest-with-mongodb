import mongoose from "mongoose";

mongoose.connect("mongodb+srv://natasha-m-oliveira:ClVolbdZP2amEl98@cluster0.o5fpxt7.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;