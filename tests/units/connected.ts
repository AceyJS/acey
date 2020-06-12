import { expect } from 'chai';
import 'mocha';

import { config } from '../../'

const main = async () => {
    config.setEnvAsNextJS()
    await config.done()
}

main()