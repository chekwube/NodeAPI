import thumbnail from 'node-thumbnail';
import path from 'path';
let thumb = thumbnail.thumb
const dir = path.join(__dirname, '/../../thumbnails');

class Thumbnail{
    generateThumbnail(req, res, next){
        let filename = path.basename(req.query.image),
            ext = path.extname(req.query.image),
            options = {
            source: req.query.image,
            destination: 'thumbnails',
            suffix:Date.now(),
            width: 50,
            height: 50,
            concurrency: 4
          };

        filename = filename.substr(0, filename.lastIndexOf("."));

        thumb(options)
            .then(function() {
            res.sendFile(dir + `/${filename+options.suffix+ext}`);
            })
            .catch(function(e) {
            res.json('Invalid input, please try again');
            });
    }
}

module.exports = new Thumbnail();