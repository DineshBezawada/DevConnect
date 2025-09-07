🧠 Logical Query Operators in Mongoose
Operator	Description	Example
$and	Matches documents that satisfy all conditions	{ $and: [{ age: { $gt: 18 } }, { status: 'active' }] }
$or	Matches documents that satisfy any condition	{ $or: [{ age: { $lt: 18 } }, { status: 'inactive' }] }
$nor	Matches documents that fail all conditions	{ $nor: [{ age: { $gt: 18 } }, { status: 'active' }] }
$not	Inverts the effect of a query expression	{ age: { $not: { $gt: 18 } } }
These operators allow you to nest and combine conditions for advanced filtering2.

🧬 Complex Mongoose Schema Example
Let’s define a schema for a fictional job application system:

js
const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  skills: [String],
  experience: Number, // in years
  status: { type: String, enum: ['applied', 'interviewed', 'hired', 'rejected'] },
  references: [{
    name: String,
    contact: String,
    verified: Boolean
  }],
  createdAt: { type: Date, default: Date.now }
});

const Applicant = mongoose.model('Applicant', applicantSchema);
🔍 Logical Queries Using Operators
1. Find applicants who are either hired or have more than 5 years of experience:
js
Applicant.find({
  $or: [
    { status: 'hired' },
    { experience: { $gt: 5 } }
  ]
});
2. Find applicants who are older than 25, have “Node.js” as a skill, and have verified references:
js
Applicant.find({
  $and: [
    { age: { $gt: 25 } },
    { skills: 'Node.js' },
    { 'references.verified': true }
  ]
});
3. Find applicants who are not rejected and do not have “PHP” as a skill:
js
Applicant.find({
  $and: [
    { status: { $not: { $eq: 'rejected' } } },
    { skills: { $not: { $in: ['PHP'] } } }
  ]
});
4. Find applicants who are neither hired nor interviewed:
js
Applicant.find({
  $nor: [
    { status: 'hired' },
    { status: 'interviewed' }
  ]
});