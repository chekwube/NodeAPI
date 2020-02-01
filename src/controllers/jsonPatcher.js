import jsonpatch from 'jsonpatch';

class JsonPatch{
    patchData(req, res, next){
        let thePatch = typeof(req.body.patch)=="string" ? JSON.parse(req.body.patch) : req.body.patch,
            myDocument = typeof(req.body.document)=="string" ? JSON.parse(req.body.document) : req.body.document,
            patchedDocument = jsonpatch.apply_patch(myDocument, thePatch);

        res.json({
            "success": true, 
            "data": patchedDocument
        });
    }
}

module.exports = new JsonPatch();