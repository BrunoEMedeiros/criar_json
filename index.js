const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs').promises;
const app = express();
var campos = {
    table: []
};

app.use(express.json());
app.use(bodyparser.json());

app.post('/posts', function(req, res)
{
   campos.table.push(req.body);
    const a =  async() => {await fs.writeFile ("input.json", JSON.stringify(campos.table), function(err) {
        if (err)
        {
        console.log(err);
        }
        else
        console.log('Teste');
            }
        );
    }
    return res.send(a());
})

app.listen(3000, function()
{
    console.log("Servidor rodando com express");
});