##Instructor Code Challenge (extended)

---

**Back-end Instructions**

- Now that you've solved all the problems, let's enhance the app.
- Replace the file based persistence with MongoDB, using mongoose.js.
- Continuing on from the solution to last night's homework. Remember:

```
cd path/to/last_nights_homework
git checkout starter_with_mongoose
git checkout -b solution_with_mongoose_YOUR_NAME # i.e. solution_with_mongoose_matt_s

-
```
npm install --save mongoose
```

## A Working Solution will be able to:

- `post /favorites`
  - required parameters:
    -`oid`
    -`name`
- `get /favorites`
  - list all favorites created from the above route.

Just like before -- only now it's persisted to MongoDB.

## Bonus:

- /favorites returns the same json as before (no `_id`).
- Use promises
