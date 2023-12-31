require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person;

Person = mongoose.model("Person", personSchema);
console.log("------1");
const createAndSavePerson = (done) => {
  console.log("------2");
  const burhaann = new Person({
    name: "burhaann",
    age: 27,
    favoriteFoods: ["rajma-dal", "pizza", "fish"],
  });
  burhaann.save(function (err, data) {
    console.log("------3");

    if (err) {
      console.log(err);
    }
    done(null, data);
  });
};

console.log("------4");

var arrayOfPeople = [
  { name: "Basit", age: 28, favoriteFoods: ["rajma-dal", "pizza", "fish"] },
  { name: "Moin Khan", age: 27, favoriteFoods: ["chicken", "pizza", "meat"] },
  { name: "Arhaann", age: 26, favoriteFoods: ["meat", "chicken"] },
];
const createManyPeople = (arrayOfPeople, done) => {
  console.log("------5");
  Person.create(arrayOfPeople, function (err, data) {
    console.log("------6");

    if (err) {
      console.log(err);
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) {
      console.log(err);
    }
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, data) {
    if (err) {
      console.log(err);
    }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function (err, person) {
    person.favoriteFoods.push(foodToAdd);
    if (err) {
      console.log(err);
    }
    person.save(function (err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { new: true },
    function (err, data) {
      if (err) return console.log(err);
      data.age = ageToSet;
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  var query = Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age");

  query.exec(function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
