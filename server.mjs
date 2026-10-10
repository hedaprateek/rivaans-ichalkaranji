import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {startEditorServer} from './editor/server.mjs';
startEditorServer({root:dirname(fileURLToPath(import.meta.url)),port:Number(process.argv.slice(2).find(arg=>arg!=='--edit')||process.env.PORT||8793),variable:'RIVAANS',defaultPublishing:{owner:'hedaprateek',repository:'rivaans-ichalkaranji',branch:'main'},openEditor:false});
