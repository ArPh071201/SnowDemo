const http=require('http');
const organization = 'OperateSync';
const project = 'Operate Demo Project Scrum and Kanban';
const personalAccessToken = 'ypi5zpi3xrzhtdx4hr55qntaexc6dw64pamsnlarocdlqpxzvumq';
const defurl= `https://dev.azure.com/${organization}/${project}/_apis/wit/workitems/`;
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(async (req, res) => {
    let pl,wit;
    if (req.url === '/webhook') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const payload = JSON.parse(body);
        // Payload processing logic goes here
        pl = JSON.stringify(payload.resource);
        wit = payload.resource.fields["System.WorkItemType"];
        console.log("EPIC payload: "+(pl));
        
        
        
      });
       
      
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        //await mainCode(pl);
        res.end('Webhook called for CR creation successfully ');
      } catch (error) { 
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Error calling webhook: ${error}`);
      }
    }
});

server.listen(port, hostname, ()=>{
    console.log(`Serving running at http://${hostname}:${port}/`)
})

