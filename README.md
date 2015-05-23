##Instructor Code Challenge (extended)

---

**Back-end Instructions**

- Now that you've solved all the problems, let's enhance the app.
- Replace the file based persistence with MongoDB, using mongoose.js.
- Starting with:
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
