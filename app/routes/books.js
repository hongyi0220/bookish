module.exports = function(app, db) {
    const Books = db.collection('books');

    app.post('/approve-request', (req, res) => {
        Books.updateOne(
            { bookId: bookId },
            {
                $pull: { ownedby: username },
                $pop: { wishlist: -1 }
            }
        );
        Books.deleteMany(
            {
                ownedby: { $size: 0 },
                wishlist: { $size: 0 }
            }
        );
        res.end();
    });

    app.post('/remove-book', (req, res) => {
        // console.log('removing book @ server');
        const bookId = req.body.bookId;
        const username = req.body.username;

        Books.updateOne(
            { bookId: bookId },
            { $pull: { ownedby: username } }
        );
        Books.deleteMany({ ownedby: { $size: 0 } });
        res.redirect('/mybooks');
    });

    app.get('/get-books', (req, res) => {
        console.log('/get-books reached');

        Books.find({})
        .toArray((err, docs) => {
            if (err) console.error(err);
            res.send(docs);
        });
    });

    app.post('/request-book', (req, res) => {
        const bookId = req.body.bookId;
        const username = req.body.username;
        Books.updateOne(
            {bookId: bookId},
            {$push: {
                wishlist: username
            }}
        );
        res.end();
    });

    app.post('/add-book', (req, res) => {
        const book = req.body.book;
        // console.log('@/addbook; book:', book);
        const bookId = book.id;
        const username = req.body.username;

        Books.findOne({ bookId: bookId })
        .then(doc => {
            if (!doc) {
                Books.insertOne({
                    bookId: bookId,
                    book: book,
                    ownedby: [username],
                    wishlist: []
                });
                res.end();
            } else {
                Books.updateOne(
                    {bookId: bookId},
                    {$push: {
                        ownedby: username
                    }}
                );
                res.end();
            }
        })
        .catch(err => console.error(err));
    });
}
