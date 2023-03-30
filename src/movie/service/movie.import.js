const Busboy = require("busboy");
const movieCreate = require("./movie.create")

const dataExample = `
Title: Movie
Release Year: 2023
Format: DVD
Stars: Actor1, Actor2
`
module.exports = (req, res) => {
  const busboy = Busboy({headers: req.headers});
  busboy.on('file', (_, file, {filename}) => {
    const filetype = filename.split('.').pop()
    if (filetype !== 'txt') {
      return res.status(400).send({status: 0, error: { filetype, code: "INVALID_FILETYPE", message: "Format of the file should be .txt only"}})
    }

    let data = '';
    file.on('data', chunk => data += chunk);
    file.on('end', async () => {
      const splitMoviesData = data.split('\n\n')

      let moviesToCreate = []
      for (let entry of splitMoviesData) {
        if (!entry) break;

        const lines = entry.trim().split('\n');
        if (lines.length < 4) {
          console.log(`Error during parsing data from provided file. It has to be defined like this: ${JSON.stringify(dataExample)}`)
          break;
        }

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
