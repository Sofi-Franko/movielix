const Busboy = require("busboy");
const movieCreate = require("./movie.create")

module.exports = (req, res) => {
  const busboy = Busboy({headers: req.headers});
  busboy.on('file', (_, file) => {
    let data = '';
    file.on('data', chunk => data += chunk);
    file.on('end', async () => {
      const splitMoviesData = data.split('\n\n')

      let moviesToCreate = []
      for (let entry of splitMoviesData) {
        if (!entry) break;
        const lines = entry.trim().split('\n');

        const title = lines[0].replace('Title: ', ''),
          year = lines[1].replace('Release Year: ', ''),
          format = lines[2].replace('Format: ', ''),
          actors = lines[3].replace('Stars: ', '').split(', ');

        const promise = movieCreate({title, year: Number(year), format, actors}, false)
        moviesToCreate.push(promise)
      }

      const movies = await Promise.allSettled(moviesToCreate)

      const successful = [],
        failed = []
      movies.forEach(m => {
        if (m.status === "rejected") failed.push(m)
        else successful.push(m.value)
      })

      if (failed.length) console.log(`Failed: `, JSON.stringify(failed, null, 2))

      return res.status(200).send({
        status: 1,
        data: successful,
        meta: {
          imported: successful.length,
          total: moviesToCreate.length
        }
      });
    });
  });

  req.pipe(busboy);
}
