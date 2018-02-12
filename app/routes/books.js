
module.exports = function(app, db) {
    const Books = db.collection('books');

    app.get('/all-books', (req, res) => {
        console.log('/books reached');

        Books.find({})
        .toArray((err, docs) => {
            if (err) console.error(err);
            res.send(docs);
        });
    });

    app.route('/book/:id/:username')
        .post((req, res) => {
            const book = req.body.book;
            console.log('adding book:', book);
            const bookId = book.id;
            const username = req.body.username;
            console.log(username);
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
        })
        .delete((req, res) => {
            console.log('removing book @ server');
            const bookId = req.params.id;
            console.log(bookId);
            const username = req.params.username;
            console.log(username);

            Books.updateOne(
                { bookId: bookId },
                { $pull: { ownedby: username } }
            );
            Books.deleteMany({ ownedby: { $size: 0 } });
            res.redirect('/mybooks');
        });

    app.route('/request/:id/:username')
        .post((req, res) => {
            console.log('requesting book');
            const bookId = req.body.bookId;
            const username = req.body.username;
            // const username = req.body.username;
            Books.updateOne(
                {bookId: bookId},
                {$push: {
                    wishlist: username
                }}
            );
            res.end();
        })
        .put((req, res) => {
            const bookId = req.params.id;
            const username = req.params.username;
            // const username = req.user.username;
            console.log('approving request');
            console.log(username);
            console.log(bookId);
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
        })
        .delete((req, res) => {
            const bookId = req.params.id;
            const username = req.params.username;
            // const username = req.user.username;
            console.log('cancel request');
            console.log(username);
            console.log(bookId);
            Books.updateOne(
                { bookId: bookId },
                {
                    $pull: { wishlist: username },
                }
            );
            res.end();
        });
}
