import * as _ from 'underscore';
import { controller, httpGet } from 'inversify-express-utils';

@controller('/incidents')
export class IncidentController {

    @httpGet('/hello')
    public hello() {
        return 'hello world';
    }

}