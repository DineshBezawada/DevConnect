Perfect — implementing pagination in Node.js using Express and Mongoose is a common and important feature, especially when dealing with large datasets.

✅ Goal:
Create an API that:

Returns 20 records at a time

Accepts page number from the client

Sends back total record count (so frontend can show page numbers, etc.)

🧩 Example Use Case:
Let's say you have a User model, and you want to paginate through users.

📦 Step-by-Step Implementation
✅ 1. Setup your route
js
Copy
Edit
// routes/user.js or in your main router file

router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = 20; // 20 records per page
    const skip = (page - 1) * limit;

    // Get paginated data
    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .exec();

    // Get total count for pagination
    const total = await User.countDocuments();

    res.status(200).json({
      total,
      page,
      pageSize: users.length,
      totalPages: Math.ceil(total / limit),
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});
✅ 2. How the client should call it:
http
Copy
Edit
GET /users?page=1
GET /users?page=2
📤 Example Response
json
Copy
Edit
{
  "total": 100,
  "page": 1,
  "pageSize": 20,
  "totalPages": 5,
  "data": [
    { "_id": "...", "name": "John" },
    ...
  ]
}
🧠 Notes:
You can make limit customizable by accepting a limit query param.

You can also add sorting, filtering, or search later.

📁 Example with search and sort (optional upgrade)
js
Copy
Edit
const search = req.query.search || '';
const sortBy = req.query.sort || 'createdAt';

const users = await User.find({ name: new RegExp(search, 'i') })
  .sort({ [sortBy]: -1 })
  .skip(skip)
  .limit(limit);